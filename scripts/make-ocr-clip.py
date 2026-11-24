"""Render the "Optical Character Recognition (OCR)" loop (public/cv/ocr.mp4 + .webp).

Every box, string and confidence in the clip is the output of a real OCR run (RapidOCR, an ONNX
build of PaddleOCR's detector and recogniser) on images drawn by this script:
  scene A  find the text regions on a sample delivery note
  scene B  read each region, then turn the lines into structured fields
  scene C  run OCR on every frame of a moving "conveyor" video and parse lot and expiry
The sample documents are drawn here with made-up values, so they contain no real data.

Needs: rapidocr-onnxruntime, opencv-python, numpy, Pillow, ffmpeg, Roboto TTFs.
  python3 scripts/make-ocr-clip.py <fonts-dir> /tmp/ocr-frames
  ffmpeg -framerate 30 -i /tmp/ocr-frames/f%04d.png -vf scale=960:540:flags=lanczos \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an public/cv/ocr.mp4
  ffmpeg -i /tmp/ocr-frames/f0150.png -vf scale=960:540 -c:v libwebp -quality 82 public/cv/ocr.webp
"""
import os
import re
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from rapidocr_onnxruntime import RapidOCR

FONTS, OUT = sys.argv[1:3]
os.makedirs(OUT, exist_ok=True)

FPS = 30
W, H = 1920, 1080
TOTAL = int(9.0 * FPS)

MED = os.path.join(FONTS, "Roboto-Medium.ttf")
REG = os.path.join(FONTS, "Roboto-Regular.ttf")
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


F_PILL = font(MED, 40)
F_HEAD = font(MED, 34)
F_ROW = font(REG, 40)
F_ROWB = font(MED, 40)
F_SMALL = font(REG, 32)
F_MONO = font(MONO, 36)
F_TAG = font(MED, 28)

BG = (29, 29, 31)
CARD = (44, 44, 46)
CARD_ON = (10, 52, 102)
LINE = (72, 72, 74)
FG = (245, 245, 247)
MUTED = (161, 161, 166)
ACCENT = (41, 151, 255)
GREEN = (48, 209, 88)
AMBER = (255, 214, 10)

PILLS = ["Detect", "Recognise", "Extract", "Real time"]


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


ocr = RapidOCR()


def run_ocr(pil):
    res, _ = ocr(cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR))
    return [(np.array(b), t, float(c)) for b, t, c in (res or [])]


# ---------- sample documents (made-up values) ----------
def make_doc():
    im = Image.new("RGB", (1000, 720), (250, 250, 248))
    d = ImageDraw.Draw(im)
    d.text((50, 40), "DELIVERY NOTE", font=font(MED, 52), fill=(20, 20, 20))
    rows = [
        ("Batch No:", "B-20431"),
        ("Date:", "12/11/2026"),
        ("Item:", "Hydraulic valve 3/4 inch"),
        ("Quantity:", "480 units"),
        ("Weight:", "12.75 kg"),
        ("Serial:", "SN 7A4F-9921"),
    ]
    for i, (k, v) in enumerate(rows):
        y = 150 + i * 85
        d.text((50, y), k, font=font(MED, 34), fill=(60, 60, 60))
        d.text((330, y), v, font=font(REG, 34), fill=(10, 10, 10))
    return im


DOC = make_doc()
DOC_DET = run_ocr(DOC)


def group_lines(dets):
    """Join the label and the value that sit on the same row, top to bottom."""
    items = sorted(dets, key=lambda r: r[0][:, 1].mean())
    rows = []
    for box, txt, conf in items:
        cy = box[:, 1].mean()
        if rows and abs(rows[-1]["cy"] - cy) < 25:
            rows[-1]["parts"].append((box[:, 0].min(), txt, conf))
        else:
            rows.append({"cy": cy, "parts": [(box[:, 0].min(), txt, conf)]})
    out = []
    for r in rows:
        parts = sorted(r["parts"])  # left to right
        out.append((" ".join(t for _, t, _ in parts), min(c for _, _, c in parts)))
    return out


DOC_LINES = group_lines(DOC_DET)
FIELDS = {}
for line, _ in DOC_LINES:
    m = re.match(r"(Batch No|Date|Item|Quantity|Weight|Serial):?\s*(.+)", line)
    if m:
        FIELDS[m.group(1).lower().replace("batch no", "batch")] = m.group(2)
print("lines:", DOC_LINES)
print("fields:", FIELDS)


# ---------- conveyor video frames (made-up lot numbers) ----------
BELT_W, BELT_H = 1100, 620
LABELS = [("LOT 4821", "EXP 08/27", "QTY 24"), ("LOT 4822", "EXP 08/27", "QTY 24")]
LABEL_W, LABEL_H = 560, 330


def make_label(lines):
    lab = Image.new("RGB", (LABEL_W, LABEL_H), (246, 246, 244))
    d = ImageDraw.Draw(lab)
    d.rounded_rectangle((0, 0, LABEL_W - 1, LABEL_H - 1), radius=26, outline=(200, 200, 198), width=4)
    for i, ln in enumerate(lines):
        d.text((46, 34 + i * 96), ln, font=font(MED, 62), fill=(15, 15, 15))
    return lab


LABEL_IMGS = [make_label(ls) for ls in LABELS]


def belt_frame(frame_idx):
    t = frame_idx / FPS - 6.2  # seconds into the stream scene
    im = Image.new("RGB", (BELT_W, BELT_H), (74, 76, 82))
    d = ImageDraw.Draw(im)
    for x in range(-60, BELT_W + 60, 60):  # belt slats scrolling with the labels
        xx = (x + t * 220) % (BELT_W + 120) - 60
        d.line((xx, 0, xx, BELT_H), fill=(66, 68, 74), width=4)
    d.rectangle((0, 0, BELT_W, 40), fill=(52, 54, 58))
    d.rectangle((0, BELT_H - 40, BELT_W, BELT_H), fill=(52, 54, 58))
    for i, lab in enumerate(LABEL_IMGS):
        x = int(-LABEL_W - 40 + t * 330 - i * (LABEL_W + 140))
        if -LABEL_W < x < BELT_W:
            im.paste(lab, (x, (BELT_H - LABEL_H) // 2))
    # mild blur and noise so it is not a perfectly clean render
    im = im.filter(ImageFilter.GaussianBlur(0.8))
    arr = np.array(im).astype(np.int16)
    rng = np.random.default_rng(frame_idx)
    arr += rng.integers(-5, 6, arr.shape, dtype=np.int16)
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


STREAM = {}
for f in range(int(6.2 * FPS), TOTAL):
    belt = belt_frame(f)
    # Skip text cut off by the frame edge: half a word is not a reading.
    keep = [r for r in run_ocr(belt) if r[2] > 0.6 and r[0][:, 0].min() > 6 and r[0][:, 0].max() < BELT_W - 6]
    STREAM[f] = (belt, keep)
print("stream frames OCRed:", len(STREAM))


def parse_stream(dets):
    """Pick the label nearest the middle of the frame and read lot and expiry from it."""
    best = None
    for box, txt, conf in dets:
        cx = box[:, 0].mean()
        if best is None or abs(cx - BELT_W / 2) < abs(best[0] - BELT_W / 2):
            best = (cx, box)
    if best is None:
        return {}
    cx = best[0]
    near = [r for r in dets if abs(r[0][:, 0].mean() - cx) < LABEL_W / 2]
    text = " ".join(r[1] for r in near)
    out = {}
    m = re.search(r"LOT\s*(\d+)", text)
    if m:
        out["lot"] = m.group(1)
    m = re.search(r"EXP\s*(\d\d/\d\d)", text)
    if m:
        out["exp"] = m.group(1)
    m = re.search(r"QTY\s*(\d+)", text)
    if m:
        out["qty"] = int(m.group(1))
    return out


# ---------- drawing helpers ----------
def rounded_paste(img, im, xy, radius):
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.size[0], im.size[1]), radius=radius, fill=255)
    img.paste(im, xy, mask)


def pills(d, active):
    gap = 36
    widths = [d.textlength(p, font=F_PILL) + 90 for p in PILLS]
    x = (W - (sum(widths) + gap * (len(PILLS) - 1))) / 2
    for i, p in enumerate(PILLS):
        on = i == active
        d.rounded_rectangle((x, 46, x + widths[i], 126), radius=40, fill=CARD_ON if on else CARD, outline=ACCENT if on else LINE, width=4)
        text_center = x + widths[i] / 2 - d.textlength(p, font=F_PILL) / 2
        d.text((text_center, 62), p, font=F_PILL, fill=FG if on else MUTED)
        x += widths[i] + gap


def card(d, x0, y0, x1, y1, title):
    d.rounded_rectangle((x0, y0, x1, y1), radius=40, fill=CARD, outline=LINE, width=3)
    d.text((x0 + 48, y0 + 40), title, font=F_HEAD, fill=ACCENT)


def draw_boxes(d, dets, ox, oy, scale, shown, color=GREEN, width=4):
    for i, (box, txt, conf) in enumerate(dets[:shown]):
        pts = [(ox + float(x) * scale, oy + float(y) * scale) for x, y in box]
        d.line(pts + [pts[0]], fill=color, width=width)


# ---------- scenes ----------
DOC_SCALE = 0.98
DOC_XY = (120, 220)


def doc_layer(img, dim=0.0):
    doc = DOC.resize((round(1000 * DOC_SCALE), round(720 * DOC_SCALE)), Image.LANCZOS)
    if dim:
        doc = Image.blend(doc, Image.new("RGB", doc.size, BG), dim)
    rounded_paste(img, doc, DOC_XY, 36)


def scene_a(img, d, f):
    pills(d, 0)
    doc_layer(img)
    shown = int(len(DOC_DET) * seg(f, 0.4, 2.3))
    draw_boxes(d, DOC_DET, DOC_XY[0], DOC_XY[1], DOC_SCALE, shown)
    card(d, 1130, 220, 1800, 926, "TEXT DETECTION")
    rows = [("Regions found", str(shown)), ("Detector", "text boxes"), ("Output", "box + position")]
    for i, (k, v) in enumerate(rows):
        a = seg(f, 0.6 + i * 0.4, 0.4)
        y = 340 + i * 170
        d.text((1178, y), k, font=F_ROW, fill=mix(CARD, MUTED, a))
        d.text((1178, y + 58), v, font=font(MED, 46), fill=mix(CARD, FG, a))


def scene_b(img, d, f):
    ts = f / FPS - 3.3
    extract = ts > 2.1
    pills(d, 2 if extract else 1)
    doc_layer(img, dim=0.35)
    draw_boxes(d, DOC_DET, DOC_XY[0], DOC_XY[1], DOC_SCALE, len(DOC_DET), color=mix(BG, GREEN, 0.7), width=3)
    if not extract:
        card(d, 1130, 220, 1800, 926, "RECOGNISED TEXT")
        n = min(len(DOC_LINES), int(ts / 0.3) + 1)
        for i, (line, conf) in enumerate(DOC_LINES[:n]):
            y = 320 + i * 88
            a = clamp((ts - i * 0.3) / 0.25)
            d.text((1170, y), line, font=font(MED, 34), fill=mix(CARD, FG, a))
            d.text((1706, y + 4), "%.2f" % conf, font=F_SMALL, fill=mix(CARD, GREEN, a))
    else:
        card(d, 1130, 220, 1800, 926, "STRUCTURED OUTPUT")
        keys = list(FIELDS.items())
        d.text((1170, 320), "{", font=F_MONO, fill=MUTED)
        for i, (k, v) in enumerate(keys):
            a = clamp((ts - 2.2 - i * 0.18) / 0.25)
            y = 372 + i * 78
            d.text((1206, y), '"%s":' % k, font=F_MONO, fill=mix(CARD, ACCENT, a))
            d.text((1206 + 30, y + 40), '"%s"' % v, font=F_MONO, fill=mix(CARD, FG, a))
        d.text((1170, 372 + len(keys) * 78 + 20), "}", font=F_MONO, fill=MUTED)


def scene_c(img, d, f):
    pills(d, 3)
    belt, dets = STREAM[f]
    bx, by = 120, 220
    rounded_paste(img, belt, (bx, by), 36)
    for box, txt, conf in dets:
        pts = [(bx + float(x), by + float(y)) for x, y in box]
        d.line(pts + [pts[0]], fill=GREEN, width=4)
        x0 = min(p[0] for p in pts)
        y0 = min(p[1] for p in pts)
        lab = "%s  %.2f" % (txt, conf)
        lw = d.textlength(lab, font=F_TAG) + 20
        d.rectangle((x0, y0 - 38, x0 + lw, y0), fill=GREEN)
        d.text((x0 + 10, y0 - 36), lab, font=F_TAG, fill=(10, 30, 15))
    card(d, 1300, 220, 1800, 840, "LIVE OUTPUT")
    info = parse_stream(dets)
    d.text((1340, 320), "{", font=F_MONO, fill=MUTED)
    for i, key in enumerate(("lot", "exp", "qty")):
        y = 370 + i * 84
        d.text((1376, y), '"%s":' % key, font=F_MONO, fill=ACCENT)
        v = info.get(key)
        s = ('"%s"' % v if isinstance(v, str) else str(v)) if v is not None else "…"
        d.text((1376 + 30, y + 40), s, font=F_MONO, fill=FG if v is not None else MUTED)
    d.text((1340, 370 + 3 * 84 + 20), "}", font=F_MONO, fill=MUTED)
    d.text((120, 880), "OCR on every frame of the stream", font=F_SMALL, fill=MUTED)


def frame_image(f):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    t = f / FPS
    if t < 3.3:
        scene_a(img, d, f)
    elif t < 6.2:
        scene_b(img, d, f)
    else:
        scene_c(img, d, f)
    return img


for f in range(TOTAL):
    frame_image(f).save(os.path.join(OUT, "f%04d.png" % f))
print("frames:", TOTAL)
