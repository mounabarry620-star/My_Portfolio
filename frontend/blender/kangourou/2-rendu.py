import bpy, sys, math, os
from mathutils import Vector
args = sys.argv[sys.argv.index('--')+1:]
fichier, sortie = args[0], args[1]
taille = int(args[2]) if len(args) > 2 else 700
echant = int(args[3]) if len(args) > 3 else 96
bpy.ops.wm.open_mainfile(filepath=fichier)
sc = bpy.context.scene
k = bpy.data.objects['Kangourou']
for o in list(bpy.data.objects):
    if o.type in ('CAMERA', 'LIGHT'): bpy.data.objects.remove(o, do_unlink=True)
# léger trois-quarts : il nous regarde un peu de côté
k.rotation_mode = "XYZ"
k.rotation_euler = (0, 0, math.radians(float(args[4]) if len(args) > 4 else -14))
bpy.context.view_layer.update()
# Cadrage fixe (le même pour toutes les images de l'animation) : calculé une fois, puis relu.
import json
cadre_f = os.path.join(os.path.dirname(sortie), 'cadre.json')
if os.path.exists(cadre_f):
    d_ = json.load(open(cadre_f)); mn = Vector(d_['mn']); mx = Vector(d_['mx'])
else:
    pts = [k.matrix_world @ Vector(c) for c in k.bound_box]
    mn = Vector([min(p[i] for p in pts) for i in range(3)]); mx = Vector([max(p[i] for p in pts) for i in range(3)])
    json.dump({'mn': list(mn), 'mx': list(mx)}, open(cadre_f, 'w'))
c = (mn + mx) / 2
def lampe(nom, lieu, p, t, col):
    l = bpy.data.lights.new(nom, 'AREA'); l.energy, l.size, l.color = p, t, col
    o = bpy.data.objects.new(nom, l); sc.collection.objects.link(o); o.location = lieu
    o.rotation_euler = (c - Vector(lieu)).to_track_quat('-Z', 'Y').to_euler()
lampe('Principale', (-2.2, -3.2, 2.4), 650, 2.4, (1.0, 0.95, 0.88))
lampe('Douce', (3.0, -2.6, 0.4), 220, 3.0, (0.86, 0.92, 1.0))
lampe('ContreJour', (0.6, 3.0, 2.4), 520, 1.6, (1.0, 1.0, 1.0))
sc.world = bpy.data.worlds.new('Monde'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0.4
cam = bpy.data.objects.new('Camera', bpy.data.cameras.new('Camera')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.lens = 70
h = (mx - mn).z
dist = (h * 1.08) / 2 / math.tan(math.atan(36 / 2 / 70))
cam.location = (c.x, c.y - dist, c.z + 0.05)
cam.rotation_euler = (math.radians(90), 0, 0)
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = echant; sc.cycles.use_denoising = True
sc.render.film_transparent = True
sc.render.resolution_x = sc.render.resolution_y = taille
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
sc.view_settings.view_transform = 'AgX'
sc.render.filepath = sortie
bpy.ops.render.render(write_still=True)
print('RENDU', sortie)
