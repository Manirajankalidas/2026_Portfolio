"""Render the Edge AI & Embedded Systems slideshow clip (public/cv/edge-ai.mp4 + .webp).

Cycles through the eight topic images in public/edge-ai/ with a short crossfade and a
"01 · NVIDIA Jetson Platforms" style label. Needs Pillow, numpy is not required, ffmpeg,
and Roboto in ~/.fonts. Steps:
  python3 scripts/make-edge-ai-clip.py /tmp/edge-frames
  ffmpeg -framerate 30 -i /tmp/edge-frames/f%04d.png -c:v libx264 -preset slow -crf 24 \\
    -pix_fmt yuv420p -movflags +faststart -an public/cv/edge-ai.mp4
  ffmpeg -i /tmp/edge-frames/f0030.png -c:v libwebp -quality 82 public/cv/edge-ai.webp
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "edge-ai")

SLIDES = [
    ("NVIDIA Jetson Platforms", "jetson-orin-nano"),
    ("Raspberry Pi", "raspberry-pi"),
    ("Microcontrollers", "esp32"),
    ("Camera Technologies", "camera"),
    ("Networking & Connectivity", "switch"),
    ("Sensors & Data Acquisition", "sensor"),
    ("Communication Protocols", "uart"),
    ("Test & Measurement", "moku-go"),
]
FRAMED = {"moku-go"}  # screenshots keep a rounded frame; cutouts sit on the background

W, H, FPS = 960, 540, 30
HOLD, FADE = 2.0, 0.5  # seconds per slide, crossfade length
BG = (245, 245, 247)  # #f5f5f7, the site's light section colour
FG = (29, 29, 31)
ACCENT = (0, 113, 227)

fonts = os.path.expanduser("~/.fonts")
F_NUM = ImageFont.truetype(os.path.join(fonts, "Roboto-Medium.ttf"), 22)
F_NAME = ImageFont.truetype(os.path.join(fonts, "Roboto-Medium.ttf"), 30)


def slide(i, name, file):
    canvas = Image.new("RGB", (W, H), BG)
    im = Image.open(os.path.join(ROOT, file + ".webp")).convert("RGBA")
    box_w, box_h = int(W * 0.86), int(H * 0.74)
    scale = min(box_w / im.width, box_h / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    x, y = (W - im.width) // 2, 28 + (box_h - im.height) // 2
    if file in FRAMED:
        mask = Image.new("L", im.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.width - 1, im.height - 1), 18, fill=255)
        canvas.paste(im.convert("RGB"), (x, y), mask)
    else:
        canvas.paste(im, (x, y), im)
    d = ImageDraw.Draw(canvas)
    num = f"{i + 1:02d}"
    ty = H - 62
    d.text((40, ty + 6), num, font=F_NUM, fill=ACCENT)
    d.text((40 + d.textlength(num, font=F_NUM) + 14, ty), name, font=F_NAME, fill=FG)
    return canvas


slides = [slide(i, n, f) for i, (n, f) in enumerate(SLIDES)]
per = int((HOLD + FADE) * FPS)
fade = int(FADE * FPS)
n = 0
for i, cur in enumerate(slides):
    nxt = slides[(i + 1) % len(slides)]
    for k in range(per):
        t = (k - (per - fade)) / fade if k >= per - fade else 0.0
        t = t * t * (3 - 2 * t)  # ease
        frame = Image.blend(cur, nxt, t) if t > 0 else cur
        frame.save(os.path.join(OUT, f"f{n:04d}.png"))
        n += 1
print("frames:", n, "seconds:", n / FPS)
