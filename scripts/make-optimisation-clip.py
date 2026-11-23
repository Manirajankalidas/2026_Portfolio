"""Render the "Model Optimisation & Deployment" loop (public/cv/optimisation.mp4 + .webp).

Needs Pillow, ffmpeg and Roboto in ~/.fonts. Steps:
  python3 scripts/make-optimisation-clip.py /tmp/optim-frames
  ffmpeg -framerate 30 -i /tmp/optim-frames/f%04d.png -vf scale=960:540:flags=lanczos \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an public/cv/optimisation.mp4
  ffmpeg -i /tmp/optim-frames/f0130.png -vf scale=960:540 -c:v libwebp -quality 82 public/cv/optimisation.webp
Scene A: PyTorch .pt -> ONNX -> TensorRT .engine, with the export commands typed out.
Scene B: FP32 / FP16 / INT8 bars sized by bits per weight, then GPU / Jetson deploy targets.
No speed or accuracy numbers are shown (only factual bit widths).
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

FPS = 30
W, H = 1920, 1080  # rendered at 2x, downscaled to 960x540 by ffmpeg
TOTAL = int(9.0 * FPS)

FONT_DIR = os.path.expanduser("~/.fonts")
MED = os.path.join(FONT_DIR, "Roboto-Medium.ttf")
REG = os.path.join(FONT_DIR, "Roboto-Regular.ttf")
MONO = "/usr/share/fonts/truetype/noto/NotoSansMono-Regular.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


F_EYEBROW = font(MED, 34)
F_NODE = font(MED, 70)
F_EXT = font(MONO, 42)
F_CMD = font(MONO, 38)
F_BAR = font(MED, 56)
F_BARSUB = font(REG, 38)
F_PILL = font(MED, 50)

# Site palette (dark mode variant of the Apple-style tokens)
BG = (29, 29, 31)  # #1d1d1f
CARD = (44, 44, 46)  # #2c2c2e
CARD_ON = (10, 52, 102)
LINE = (72, 72, 74)
FG = (245, 245, 247)
MUTED = (161, 161, 166)  # #a1a1a6
ACCENT = (41, 151, 255)  # #2997ff, the accent on dark
ACCENT_DEEP = (0, 113, 227)  # #0071e3


def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def ease(t):
    t = clamp(t)
    return t * t * (3 - 2 * t)


def mix(c1, c2, t):
    t = clamp(t)
    return tuple(round(a + (b - a) * t) for a, b in zip(c1, c2))


def seg(frame, start_s, dur_s):
    return ease((frame / FPS - start_s) / dur_s)


def text_center(d, cx, y, s, f, fill):
    w = d.textlength(s, font=f)
    d.text((cx - w / 2, y), s, font=f, fill=fill)


# ---------- Scene A: conversion pipeline ----------
NODES = [("PyTorch", ".pt"), ("ONNX", ".onnx"), ("TensorRT", ".engine")]
NODE_W, NODE_H, GAP = 470, 250, 150
ROW_X = (W - (3 * NODE_W + 2 * GAP)) // 2
ROW_Y = 260
CMDS = [
    "$ yolo export model=yolo11n.pt format=onnx",
    "$ trtexec --onnx=yolo11n.onnx --saveEngine=yolo11n.engine --fp16",
]


def scene_a(d, f):
    text_center(d, W / 2, 150, "EXPORT  ·  CONVERT  ·  BUILD ENGINE", F_EYEBROW, ACCENT)
    # node activation times (s): pt on at start, onnx after cmd1, engine after cmd2
    on = [seg(f, 0.2, 0.4), seg(f, 1.9, 0.4), seg(f, 3.7, 0.4)]
    for i, (name, ext) in enumerate(NODES):
        x = ROW_X + i * (NODE_W + GAP)
        t = on[i]
        d.rounded_rectangle(
            (x, ROW_Y, x + NODE_W, ROW_Y + NODE_H),
            radius=48,
            fill=mix(CARD, CARD_ON, t),
            outline=mix(LINE, ACCENT, t),
            width=5,
        )
        text_center(d, x + NODE_W / 2, ROW_Y + 58, name, F_NODE, mix(MUTED, FG, t))
        text_center(d, x + NODE_W / 2, ROW_Y + 160, ext, F_EXT, mix(LINE, ACCENT, t))
        if i < 2:
            ax0, ax1 = x + NODE_W + 22, x + NODE_W + GAP - 22
            ay = ROW_Y + NODE_H // 2
            d.line((ax0, ay, ax1, ay), fill=LINE, width=6)
            # travelling pulse while the command for this hop runs
            p = seg(f, 0.6 + i * 1.8, 1.3)
            if 0 < p < 1:
                px = ax0 + (ax1 - ax0) * p
                d.line((ax0, ay, px, ay), fill=ACCENT, width=6)
                d.ellipse((px - 13, ay - 13, px + 13, ay + 13), fill=ACCENT)
            elif p >= 1:
                d.line((ax0, ay, ax1, ay), fill=ACCENT, width=6)
            d.polygon(
                [(ax1, ay - 16), (ax1 + 22, ay), (ax1, ay + 16)],
                fill=ACCENT if p >= 1 else LINE,
            )

    # terminal box with typed commands
    bx0, by0, bx1, by1 = 170, 640, W - 170, 900
    d.rounded_rectangle((bx0, by0, bx1, by1), radius=36, fill=(18, 18, 20), outline=LINE, width=3)
    for k, cy in enumerate((by0 + 30, by0 + 30)):
        d.ellipse((bx0 + 36 + k * 40, cy, bx0 + 58 + k * 40, cy + 22), fill=LINE)
    d.ellipse((bx0 + 116, by0 + 30, bx0 + 138, by0 + 52), fill=LINE)
    for i, cmd in enumerate(CMDS):
        t = clamp((f / FPS - (0.4 + i * 1.8)) / 1.3)
        n = int(len(cmd) * t)
        if n == 0:
            continue
        y = by0 + 95 + i * 68
        shown = cmd[:n]
        d.text((bx0 + 48, y), shown[:1], font=F_CMD, fill=ACCENT)
        d.text((bx0 + 48 + d.textlength("$", font=F_CMD), y), shown[1:], font=F_CMD, fill=FG)
        if n < len(cmd) and (f // 8) % 2 == 0:
            cx = bx0 + 48 + d.textlength(shown, font=F_CMD) + 4
            d.rectangle((cx, y + 6, cx + 20, y + 46), fill=FG)


# ---------- Scene B: precision + deployment ----------
BARS = [("FP32", "32-bit weights", 1.0), ("FP16", "16-bit weights", 0.5), ("INT8", "8-bit weights", 0.25)]


def scene_b(d, f, t0):
    tt = f / FPS - t0
    text_center(d, W / 2, 150, "PRECISION  ·  DEPLOYMENT", F_EYEBROW, ACCENT)
    lx, bar_x, bar_max = 200, 500, 1000
    for i, (name, sub, frac) in enumerate(BARS):
        y = 270 + i * 150
        p = ease((tt - 0.2 - i * 0.35) / 0.7)
        d.text((lx, y + 2), name, font=F_BAR, fill=mix(MUTED, FG, p))
        d.rounded_rectangle((bar_x, y + 8, bar_x + bar_max, y + 72), radius=32, fill=CARD)
        w = max(64, bar_max * frac * p)
        if p > 0:
            d.rounded_rectangle((bar_x, y + 8, bar_x + w, y + 72), radius=32, fill=mix(ACCENT_DEEP, ACCENT, i / 2))
        d.text((bar_x + bar_max + 40, y + 18), sub, font=F_BARSUB, fill=mix(BG, MUTED, p))

    # deploy targets
    py = 780
    pills = ["NVIDIA GPU", "NVIDIA Jetson"]
    widths = [d.textlength(s, font=F_PILL) + 140 for s in pills]
    total = sum(widths) + 60
    x = (W - total) / 2
    for i, s in enumerate(pills):
        p = ease((tt - 1.9 - i * 0.35) / 0.5)
        x1 = x + widths[i]
        d.rounded_rectangle((x, py, x1, py + 110), radius=55, fill=mix(CARD, ACCENT_DEEP, p), outline=mix(LINE, ACCENT, p), width=4)
        # check mark
        cx, cy = x + 58, py + 55
        d.line((cx - 18, cy, cx - 4, cy + 15, cx + 20, cy - 16), fill=mix(LINE, FG, p), width=8, joint="curve")
        d.text((x + 100, py + 24), s, font=F_PILL, fill=mix(MUTED, FG, p))
        x = x1 + 60


# timeline: A 0-4.6s, crossfade to B 4.6-5.0s, B to 8.6s, fade to A 8.6-9.0s (loops cleanly)
A_END, B_START, B_END = 4.6, 5.0, 8.6

for f in range(TOTAL):
    s = f / FPS
    img_a = Image.new("RGB", (W, H), BG)
    scene_a(ImageDraw.Draw(img_a), f)
    if s < A_END:
        frame = img_a
    else:
        img_b = Image.new("RGB", (W, H), BG)
        scene_b(ImageDraw.Draw(img_b), f, B_START - 0.1)
        if s < B_START:
            frame = Image.blend(img_a, img_b, ease((s - A_END) / (B_START - A_END)))
        elif s < B_END:
            frame = img_b
        else:
            start = Image.new("RGB", (W, H), BG)
            scene_a(ImageDraw.Draw(start), 0)
            frame = Image.blend(img_b, start, ease((s - B_END) / (9.0 - B_END)))
    frame.save(os.path.join(OUT, f"f{f:04d}.png"))

print("frames:", TOTAL)
