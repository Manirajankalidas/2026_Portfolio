"""Cut a product photo out of its plain light background (transparent WebP, 16:9 canvas).

Usage: python3 scripts/cutout.py <in> <out.webp> [--tol 16] [--trim 0] [--holes] [--shadow]

  --tol     how far (0-255) a pixel may differ from the background model and still count
            as background. Raise it for photos with shadows or noisy backgrounds.
  --trim    pixels to cut off each edge first (removes thin border lines in some photos).
  --flat    treat the background as one flat colour (best for plain white backgrounds,
            and when the product touches the image edges).
  --holes   also clear enclosed background areas (e.g. the inside of a cable loop);
            --hole-tol sets how close to the background colour those must be.
  --shadow  keep soft shadows as semi-transparent black instead of removing them.

The background is modelled as a smooth gradient fitted to the border pixels, then
removed by flood-filling inward from the edges, so light parts of the product that
are not connected to the border stay opaque. Needs Pillow and numpy.
"""

import argparse

import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("out")
ap.add_argument("--tol", type=float, default=16)
ap.add_argument("--trim", type=int, default=0)
ap.add_argument("--flat", action="store_true")
ap.add_argument("--holes", action="store_true")
ap.add_argument("--hole-tol", type=float, default=4)
ap.add_argument("--shadow", action="store_true")
args = ap.parse_args()

src = Image.open(args.src)
if src.mode in ("RGBA", "LA", "P"):
    src = src.convert("RGBA")
    flat = Image.new("RGB", src.size, "white")
    flat.paste(src, mask=src.split()[3])
    src = flat
src = src.convert("RGB")
if args.trim:
    t = args.trim
    src = src.crop((t, t, src.width - t, src.height - t))
if src.width > 1600:
    src = src.resize((1600, round(src.height * 1600 / src.width)), Image.LANCZOS)
img = np.asarray(src).astype(np.float32)
H, W, _ = img.shape

# 1) Background model: quadratic surface per channel fitted to a 3%-wide border.
b = max(4, int(min(H, W) * 0.03))
yy, xx = np.mgrid[0:H, 0:W]
border = np.zeros((H, W), bool)
border[:b], border[-b:], border[:, :b], border[:, -b:] = True, True, True, True
x, y = xx / W, yy / H
basis = np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], -1)
bg = np.empty_like(img)
if args.flat:
    edge = img[border]
    bright = edge[edge.mean(-1) >= np.percentile(edge.mean(-1), 60)]
    bg[:] = np.median(bright, 0)
else:
    A = basis[border]
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, img[..., c][border], rcond=None)
        bg[..., c] = basis @ coef
dist = np.abs(img - bg).max(-1)

# 2) Flood fill from the edges through background-like pixels.
cand = dist < args.tol
reach = cand & border
if args.holes:
    reach |= dist < args.hole_tol
while True:
    grown = reach.copy()
    grown[1:] |= reach[:-1]
    grown[:-1] |= reach[1:]
    grown[:, 1:] |= reach[:, :-1]
    grown[:, :-1] |= reach[:, 1:]
    grown &= cand
    if (grown == reach).all():
        break
    reach = grown

# 3) Alpha: product opaque, background clear, soft ramp near the tolerance.
soft = np.clip((dist - args.tol * 0.5) / (args.tol * 0.5), 0, 1)
alpha = np.where(reach, soft * 0.0, 1.0)
a_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
a_img = a_img.filter(ImageFilter.GaussianBlur(1.0))
alpha = np.asarray(a_img).astype(np.float32) / 255

rgb = img.copy()
if args.shadow:
    # Darker-than-background, low-saturation pixels in the cleared area become a soft shadow.
    lum, bgl = img.mean(-1), bg.mean(-1)
    sat = img.max(-1) - img.min(-1)
    shade = np.clip((bgl - lum) / bgl * 2.2, 0, 0.55) * (sat < 24)
    use = shade > alpha
    rgb[use] = 0
    alpha = np.maximum(alpha, shade)

# Faint edge pixels lighter than the background read as a white haze on coloured
# sections: make them fully transparent.
haze = (img.mean(-1) > bg.mean(-1) - 6) & (alpha < 0.6)
alpha[haze] = 0

out = Image.fromarray(np.dstack([rgb, alpha * 255]).clip(0, 255).astype(np.uint8), "RGBA")

# 4) Trim to the visible product and centre it on a 16:9 transparent canvas.
# Ignore faint shadow haze and isolated specks (dust, noise) when finding the product.
box = out.split()[3].filter(ImageFilter.MinFilter(7)).point(lambda v: 255 if v > 40 else 0).getbbox()
out = out.crop(box)
CW, CH = 1000, 563
scale = min(CW * 0.92 / out.width, CH * 0.9 / out.height)
out = out.resize((round(out.width * scale), round(out.height * scale)), Image.LANCZOS)
canvas = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
canvas.paste(out, ((CW - out.width) // 2, (CH - out.height) // 2), out)
canvas.save(args.out, "WEBP", quality=86, method=6)
print(args.out, canvas.size, "product", out.size)
