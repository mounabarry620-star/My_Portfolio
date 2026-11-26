"""
Le train du parcours : rendu en 3 couches de la voiture de tête du modèle
« Tangara Sydney Trains T set » (TheOminousDuck, CC BY 4.0, Sketchfab 07d7a69ffb544ec48442ae3448ee6f1f).

    blender -b --factory-startup -P blender/train/rendu-train.py -- modele.glb dossier_sortie [taille] [echantillons]

Produit dans dossier_sortie :
  base.png     carrosserie (livrée en noir), ombre au sol, phares éteints
  blanc.png    la même avec la livrée en blanc      → donne le masque de la livrée
  allume.png   la même que base.png, lumières allumées → donne la couche de lumière
La livrée = les parties orange d'origine (repérées par leur teinte dans les textures) ;
sur le site elle prend la couleur du thème. Les logos restent en gris.
"""
import bpy, sys, math, os
from mathutils import Vector

args = sys.argv[sys.argv.index('--') + 1:]
modele, sortie = args[0], args[1]
H = int(args[2]) if len(args) > 2 else 1400
ECH = int(args[3]) if len(args) > 3 else 96
os.makedirs(sortie, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=modele)
sc = bpy.context.scene

# Seulement la voiture de tête (y > -6.2) ; pas de voie (elle est dessinée par le site).
for o in list(bpy.data.objects):
    if o.type != 'MESH':
        continue
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]
    mats = [m.name for m in o.data.materials]
    if 'tracks' in mats or min(v.y for v in bb) < -6.3:
        bpy.data.objects.remove(o, do_unlink=True)

# ---- Matières : carrosserie en gris métal, livrée (orange d'origine) remplacée par une couleur réglable
LIVREE = []   # nœuds RGB à passer en noir / blanc
def regler(m):
    nt = m.node_tree; N = nt.nodes; L = nt.links
    bsdf = N.get('Principled BSDF')
    tex = next((n for n in N if n.type == 'TEX_IMAGE'), None)
    if not bsdf or not tex: return
    gris = N.new('ShaderNodeRGBToBW'); L.new(tex.outputs['Color'], gris.inputs['Color'])
    clair = N.new('ShaderNodeMath'); clair.operation = 'MULTIPLY'; clair.inputs[1].default_value = 1.15
    L.new(gris.outputs['Val'], clair.inputs[0])
    hsv = N.new('ShaderNodeSeparateColor'); hsv.mode = 'HSV'; L.new(tex.outputs['Color'], hsv.inputs['Color'])
    # masque = saturé ET teinte orange-jaune (0,03 à 0,16)
    sat = N.new('ShaderNodeMapRange'); sat.inputs['From Min'].default_value = 0.35; sat.inputs['From Max'].default_value = 0.55
    L.new(hsv.outputs['Green'], sat.inputs['Value'])
    t1 = N.new('ShaderNodeMath'); t1.operation = 'GREATER_THAN'; t1.inputs[1].default_value = 0.03; L.new(hsv.outputs['Red'], t1.inputs[0])
    t2 = N.new('ShaderNodeMath'); t2.operation = 'LESS_THAN'; t2.inputs[1].default_value = 0.16; L.new(hsv.outputs['Red'], t2.inputs[0])
    a = N.new('ShaderNodeMath'); a.operation = 'MULTIPLY'; L.new(t1.outputs[0], a.inputs[0]); L.new(t2.outputs[0], a.inputs[1])
    masque = N.new('ShaderNodeMath'); masque.operation = 'MULTIPLY'; L.new(a.outputs[0], masque.inputs[0]); L.new(sat.outputs['Result'], masque.inputs[1])
    couleur = N.new('ShaderNodeRGB'); couleur.outputs[0].default_value = (0, 0, 0, 1); LIVREE.append(couleur)
    mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'
    L.new(clair.outputs[0], mix.inputs[6])
    if m.name == 'TrainTopSide':
        # le toit (ce qu'on voit le plus vu de dessus) prend la couleur du thème ; reliefs gardés
        mix.inputs['Factor'].default_value = 1.0
        teinte = N.new('ShaderNodeMix'); teinte.data_type = 'RGBA'; teinte.blend_type = 'MULTIPLY'; teinte.inputs['Factor'].default_value = 1.0
        L.new(couleur.outputs[0], teinte.inputs[6]); L.new(clair.outputs[0], teinte.inputs[7]); L.new(teinte.outputs[2], mix.inputs[7])
    else:
        L.new(masque.outputs[0], mix.inputs['Factor'])
        L.new(couleur.outputs[0], mix.inputs[7])
    L.new(mix.outputs[2], bsdf.inputs['Base Color'])
    bsdf.inputs['Metallic'].default_value = 0.35
    bsdf.inputs['Roughness'].default_value = 0.4
    bsdf.inputs['Emission Strength'].default_value = 0.0

FENETRES = []
for m in bpy.data.materials:
    if not m.use_nodes: continue
    if m.name == 'Windows':
        b = m.node_tree.nodes['Principled BSDF']; FENETRES.append(b)
        b.inputs['Emission Color'].default_value = (1.0, 0.72, 0.38, 1)
        b.inputs['Emission Strength'].default_value = 0.0
        b.inputs['Roughness'].default_value = 0.08
    else:
        regler(m)

# ---- Phares (2 disques à l'avant) et faisceau sur la voie
def phare(x):
    bpy.ops.mesh.primitive_circle_add(vertices=24, radius=0.11, fill_type='NGON', location=(x, 5.79, -0.55), rotation=(math.radians(90), 0, 0))
    o = bpy.context.active_object
    m = bpy.data.materials.new('Phare'); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (0.9, 0.9, 0.85, 1)
    b.inputs['Emission Color'].default_value = (1, 0.97, 0.9, 1); b.inputs['Emission Strength'].default_value = 0.0
    o.data.materials.append(m); return b
PHARES = [phare(-0.58), phare(0.58)]
spots = []
for x in (-0.58, 0.58):
    l = bpy.data.lights.new('faisceau', 'SPOT'); l.energy = 0; l.spot_size = math.radians(48); l.spot_blend = 0.8; l.color = (1, 0.96, 0.88)
    o = bpy.data.objects.new('faisceau', l); sc.collection.objects.link(o)
    o.location = (x, 5.9, -0.5); o.rotation_euler = (math.radians(-80), 0, 0)  # vers l'avant et un peu vers le sol
    o.rotation_euler = (Vector((x * 1.4, 10.5, -1.32)) - o.location).to_track_quat('-Z', 'Y').to_euler()
    spots.append(l)

# ---- Sol « attrape-ombre » (seules l'ombre et la lumière des phares restent visibles)
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, -1.33))
sol = bpy.context.active_object; sol.is_shadow_catcher = True

# ---- Lumière de studio douce
def lampe(nom, lieu, p, t):
    l = bpy.data.lights.new(nom, 'AREA'); l.energy, l.size = p, t
    o = bpy.data.objects.new(nom, l); sc.collection.objects.link(o); o.location = lieu
    o.rotation_euler = (Vector((0, 0, 0)) - Vector(lieu)).to_track_quat('-Z', 'Y').to_euler()
lampe('Principale', (-1.5, 3.0, 22), 3600, 14)   # presque au-dessus : ombre douce, juste sous le train
lampe('Douce', (9, 6, 8), 700, 10)
sc.world = bpy.data.worlds.new('Monde'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0.45

# ---- Caméra : au-dessus, un peu devant et de côté ; le train descend vers le bas de l'image
cam = bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.type = 'ORTHO'
cam.location = Vector((2.2, 15.0, 19.0))
cible = Vector((0, 0.5, -0.4))
# Orientation construite à la main : l'arrière du train (-Y) vers le haut de l'image,
# donc le train est vertical et descend vers le bas de l'écran.
from mathutils import Matrix
avant = (cible - cam.location).normalized()
haut = Vector((0, -1, 0)); haut = (haut - avant * haut.dot(avant)).normalized()
droite = avant.cross(haut).normalized()
cam.matrix_world = Matrix((
    (droite.x, haut.x, -avant.x, cam.location.x),
    (droite.y, haut.y, -avant.y, cam.location.y),
    (droite.z, haut.z, -avant.z, cam.location.z),
    (0, 0, 0, 1)))
bpy.context.view_layer.update()
from bpy_extras.object_utils import world_to_camera_view
a_ = world_to_camera_view(sc, cam, Vector((0, 5.7, 0))); b_ = world_to_camera_view(sc, cam, Vector((0, -6.0, 0)))
print('avant à l\'image', round(a_.x, 3), round(a_.y, 3), '| arrière', round(b_.x, 3), round(b_.y, 3))
cam.data.ortho_scale = 19.0
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = ECH; sc.cycles.use_denoising = True
sc.render.film_transparent = True
sc.render.resolution_y = H; sc.render.resolution_x = int(H * 0.40)
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
sc.view_settings.view_transform = 'Standard'

def rendre(nom, livree, lumieres):
    for c in LIVREE: c.outputs[0].default_value = (livree, livree, livree, 1)
    for b in FENETRES: b.inputs['Emission Strength'].default_value = 1.6 if lumieres else 0.0
    for b in PHARES: b.inputs['Emission Strength'].default_value = 30.0 if lumieres else 0.0
    for l in spots: l.energy = 2500 if lumieres else 0
    sc.render.filepath = os.path.join(sortie, nom)
    bpy.ops.render.render(write_still=True)
    print('RENDU', nom)

rendre('base.png', 0.0, False)
rendre('blanc.png', 1.0, False)
rendre('allume.png', 0.0, True)
