import bpy, bmesh, sys, math
import numpy as np
from mathutils import Matrix, Vector
args = sys.argv[sys.argv.index('--')+1:]
angle = float(args[2])
bpy.ops.wm.open_mainfile(filepath=args[0])
k = bpy.data.objects['Kangourou']
bpy.context.view_layer.objects.active = k
k.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
me = k.data
n = len(me.vertices)
co = np.empty(n * 3); me.vertices.foreach_get('co', co); co = co.reshape(-1, 3)
A = np.array([0.15, -0.445, -0.05]); B = np.array([0.065, -0.450, -0.46])
L = np.linalg.norm(B - A); u = (B - A) / L
d0 = co - A
t = (d0 @ u) / L
r = np.linalg.norm(d0 - np.outer(d0 @ u, u), axis=1)
rmax = float(args[3])
# le bras + son côté extérieur (un peu plus loin de l'axe), mais seulement devant le ventre
dans = ((r < rmax) | ((r < rmax + 0.035) & (co[:, 1] < -0.40) & (co[:, 0] > 0.12))) & (t > float(args[4])) & (t < 1.45) & (co[:, 0] > 0.02)
print('sommets du bras', int(dans.sum()))

bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(me)
bm.verts.ensure_lookup_table()
for f in bm.faces:
    f.select = all(dans[v.index] for v in f.verts)
bmesh.update_edit_mesh(me)
bpy.ops.mesh.separate(type='SELECTED')        # le bras devient un objet à part
bpy.ops.object.mode_set(mode='OBJECT')
bras = [o for o in bpy.context.selected_objects if o != k][0]
bras.name = 'Bras'

# On répare le trou laissé sur le corps : surface fine, plaquée contre la poitrine, pelage recopié à côté.
import bmesh
from mathutils import kdtree
bpy.ops.object.select_all(action='DESELECT')
bpy.context.view_layer.objects.active = k; k.select_set(True)
bm = bmesh.new(); bm.from_mesh(k.data)
uv = bm.loops.layers.uv.active
bord = [e for e in bm.edges if e.is_boundary]
vus = set(); boucles = []
for e in bord:
    if e in vus: continue
    pile = [e]; comp = []
    while pile:
        x_ = pile.pop()
        if x_ in vus: continue
        vus.add(x_); comp.append(x_)
        for v in x_.verts:
            for e2 in v.link_edges:
                if e2.is_boundary and e2 not in vus: pile.append(e2)
    boucles.append(comp)
boucle = max(boucles, key=len)                       # le grand trou du bras
bverts = list({v for e in boucle for v in e.verts})
bco = np.array([v.co[:] for v in bverts])
# profondeur de la poitrine à chaque hauteur : le fond du trou (côté corps)
def y_poitrine(z):
    m = np.abs(bco[:, 2] - z) < 0.03
    return np.percentile(bco[m, 1], 80) if m.any() else bco[:, 1].max()
# UV de chaque sommet (pour recopier le pelage)
uv_sommet = {}
for f in bm.faces:
    for lp in f.loops:
        uv_sommet.setdefault(lp.vert.index, lp[uv].uv.copy())
bm.verts.ensure_lookup_table()
arbre = kdtree.KDTree(len(bm.verts))
for v in bm.verts:
    if v.co.x < -0.02: arbre.insert(v.co, v.index)   # seulement l'autre côté
arbre.balance()
ret = bmesh.ops.holes_fill(bm, edges=boucle, sides=0)
nouvelles = ret['faces']
bmesh.ops.triangulate(bm, faces=nouvelles)
nouvelles = [f for f in bm.faces if f.is_valid and all(v in set(bverts) for v in f.verts)]
aretes = list({e for f in nouvelles for e in f.edges if not e.is_boundary})
sub = bmesh.ops.subdivide_edges(bm, edges=aretes, cuts=6, use_grid_fill=True)
interieurs = [v for v in sub['geom_inner'] + sub['geom_split'] if isinstance(v, bmesh.types.BMVert)]
bord_set = set(bverts)
patch_verts = [v for v in set(interieurs) if v not in bord_set]
# Surface « tendue » entre les bords du trou : lisse, sans bosse (bord fixe, intérieur détendu).
for _ in range(400):
    for v in patch_verts:
        voisins = [e.other_vert(v).co for e in v.link_edges]
        if voisins:
            v.co = sum(voisins, v.co * 0) / len(voisins)
faces_patch = {f for v in patch_verts for f in v.link_faces}
bmesh.ops.recalc_face_normals(bm, faces=list(faces_patch))
bm.verts.index_update()
# Couleur : la moyenne du pelage tout autour du trou, avec un léger grain (matière à part).
img = [n for n in k.data.materials[0].node_tree.nodes if n.type == 'TEX_IMAGE'][0].image
W, H = img.size
px = np.empty(W * H * 4, dtype=np.float32); img.pixels.foreach_get(px); px = px.reshape(H, W, 4)
echant = []
centre_trou = Vector(np.array([v.co[:] for v in patch_verts]).mean(0))
for f in bm.faces:
    if f in faces_patch: continue
    c_ = f.calc_center_median()
    if (c_ - centre_trou).length < 0.11 and c_.y < -0.36:
        for lp in f.loops:
            u_, v_ = lp[uv].uv
            echant.append(px[int((v_ % 1) * (H - 1)), int((u_ % 1) * (W - 1)), :3])
moy = np.median(np.array(echant), axis=0) ** 2.2   # sRGB → linéaire (ce qu'attend Blender)
print('couleur moyenne', moy.round(3), len(echant))
mat = bpy.data.materials.new('PelageRepare'); mat.use_nodes = True
nt = mat.node_tree; bsdf = nt.nodes['Principled BSDF']
bruit = nt.nodes.new('ShaderNodeTexNoise'); bruit.inputs['Scale'].default_value = 260; bruit.inputs['Detail'].default_value = 6
rampe = nt.nodes.new('ShaderNodeValToRGB')
rampe.color_ramp.elements[0].color = (*(moy * 0.45), 1); rampe.color_ramp.elements[1].color = (*(moy * 0.9), 1)   # un peu d'ombre sous le bras
nt.links.new(bruit.outputs['Fac'], rampe.inputs['Fac']); nt.links.new(rampe.outputs['Color'], bsdf.inputs['Base Color'])
relief = nt.nodes.new('ShaderNodeBump'); relief.inputs['Strength'].default_value = 0.35
nt.links.new(bruit.outputs['Fac'], relief.inputs['Height']); nt.links.new(relief.outputs['Normal'], bsdf.inputs['Normal'])
bsdf.inputs['Roughness'].default_value = 0.85
k.data.materials.append(mat)
idx_mat = len(k.data.materials) - 1
for f in faces_patch: f.material_index = idx_mat
bm.to_mesh(k.data); bm.free()
print('trou réparé :', len(patch_verts), 'sommets ajoutés')

# Le bras pivote d'un bloc autour du coude, dans le plan de face (axe Y).
R = Matrix.Translation(Vector(A)) @ Matrix.Rotation(math.radians(angle), 4, 'Y') @ Matrix.Translation(-Vector(A))
bras.matrix_world = R @ bras.matrix_world
# Les deux morceaux ensemble pour le rendu (même tourne-plateau).
bpy.ops.object.select_all(action='DESELECT')
bras.select_set(True); k.select_set(True); bpy.context.view_layer.objects.active = k
bpy.ops.object.join()
bpy.ops.wm.save_as_mainfile(filepath=args[1])
print('ok')
