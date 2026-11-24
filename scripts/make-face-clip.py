"""Render the "Face Recognition & Analysis" loop (public/cv/face-recognition.mp4 + .webp).

Every box, landmark, embedding value and score in the clip comes from a real run of
OpenCV's YuNet face detector and SFace recogniser on the site's own photos:
  scene A  detect one face, draw the box and the 5 landmarks (YuNet)
  scene B  align the face to 112x112 and show its 128-value embedding (SFace)
  scene C  compare two other photos with the enrolled face (cosine score vs the 0.363 threshold)
Nothing is made up: change the photos and the numbers change with them.

Needs: opencv-python >= 4.8, numpy, Pillow, ffmpeg, Roboto TTFs, and the two ONNX models from
https://github.com/opencv/opencv_zoo (face_detection_yunet_2023mar.onnx, face_recognition_sface_2021dec.onnx).
  python3 scripts/make-face-clip.py <models-dir> <fonts-dir> /tmp/face-frames
  ffmpeg -framerate 30 -i /tmp/face-frames/f%04d.png -vf scale=960:540:flags=lanczos \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an public/cv/face-recognition.mp4
  ffmpeg -i /tmp/face-frames/f0150.png -vf scale=960:540 -c:v libwebp -quality 82 public/cv/face-recognition.webp
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

MODELS, FONTS, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)

FPS = 30
W, H = 1920, 1080
TOTAL = int(9.0 * FPS)

MED = os.path.join(FONTS, "Roboto-Medium.ttf")
REG = os.path.join(FONTS, "Roboto-Regular.ttf")


def font(path, size):
    return ImageFont.truetype(path, size)


F_PILL = font(MED, 40)
F_HEAD = font(MED, 34)
F_ROW = font(REG, 42)
F_VAL = font(MED, 44)
F_TAG = font(MED, 34)
F_SMALL = font(REG, 34)
F_BIG = font(MED, 60)

BG = (29, 29, 31)
CARD = (44, 44, 46)
CARD_ON = (10, 52, 102)
LINE = (72, 72, 74)
FG = (245, 245, 247)
MUTED = (161, 161, 166)
ACCENT = (41, 151, 255)
GREEN = (48, 209, 88)
AMBER = (255, 214, 10)

PILLS = ["Detect", "Landmarks", "Embedding", "Match"]
THRESHOLD = 0.363  # OpenCV's documented cosine threshold for SFace


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


# ---------- real model runs ----------
det = cv2.FaceDetectorYN.create(os.path.join(MODELS, "face_detection_yunet_2023mar.onnx"), "", (320, 320), 0.6, 0.3, 5000)
rec = cv2.FaceRecognizerSF.create(os.path.join(MODELS, "face_recognition_sface_2021dec.onnx"), "")


def load(path):
    im = Image.open(path)
    if im.mode == "RGBA":
        flat = Image.new("RGB", im.size, (245, 245, 247))
        flat.paste(im, mask=im.split()[3])
        im = flat
    return im.convert("RGB")


def analyse(path):
    pil = load(path)
    bgr = cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)
    det.setInputSize((bgr.shape[1], bgr.shape[0]))
    _, faces = det.detect(bgr)
    f = max(faces, key=lambda r: r[2] * r[3])  # largest face
    aligned = rec.alignCrop(bgr, f)
    emb = rec.feature(aligned)
    return {
        "pil": pil,
        "face": f,
        "aligned": Image.fromarray(cv2.cvtColor(aligned, cv2.COLOR_BGR2RGB)),
        "emb": emb,
    }


ENROL = analyse("public/about/portrait-half.webp")
SPEAK = analyse("public/events/bng-ftp-mani-speak.webp")
BIKE = analyse("public/events/zoho-cython-2025.webp")
for p in (SPEAK, BIKE):
    p["score"] = float(rec.match(ENROL["emb"], p["emb"], cv2.FaceRecognizerSF_FR_COSINE))
print("scores", round(SPEAK["score"], 3), round(BIKE["score"], 3))


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
        text_center(d, x + widths[i] / 2, 62, p, F_PILL, FG if on else MUTED)
        x += widths[i] + gap


def card(d, x0, y0, x1, y1, title):
    d.rounded_rectangle((x0, y0, x1, y1), radius=40, fill=CARD, outline=LINE, width=3)
    d.text((x0 + 48, y0 + 40), title, font=F_HEAD, fill=ACCENT)


# ---------- Scene A: detect + landmarks ----------
def scene_a(img, d, f):
    pills(d, 0 if f / FPS < 1.7 else 1)
    # Zoom in on the speaker so the box and the five landmarks are easy to read.
    fx0, fy0, fw0, fh0 = [float(v) for v in SPEAK["face"][:4]]
    side = 360
    cx0, cy0 = fx0 + fw0 / 2, fy0 + fh0 / 2 + 40
    left = int(min(max(cx0 - side / 2, 0), SPEAK["pil"].width - side))
    top = int(min(max(cy0 - side / 2, 0), SPEAK["pil"].height - side))
    pil = SPEAK["pil"].crop((left, top, left + side, top + side))
    scale = 800 / side
    px, py = 120 + (900 - 800) // 2, 170
    rounded_paste(img, pil.resize((800, 800), Image.LANCZOS), (px, py), 36)
    fx, fy, fw, fh = (fx0 - left) * scale, (fy0 - top) * scale, fw0 * scale, fh0 * scale
    t = seg(f, 0.4, 0.8)
    cx, cy = px + fx + fw / 2, py + fy + fh / 2
    bw, bh = fw * (0.4 + 0.6 * t), fh * (0.4 + 0.6 * t)
    if t > 0:
        d.rectangle((cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2), outline=GREEN, width=6)
        lab = "face  %.2f" % float(SPEAK["face"][-1])
        lw = d.textlength(lab, font=F_TAG) + 28
        d.rectangle((cx - bw / 2, cy - bh / 2 - 52, cx - bw / 2 + lw, cy - bh / 2), fill=GREEN)
        d.text((cx - bw / 2 + 14, cy - bh / 2 - 48), lab, font=F_TAG, fill=(10, 30, 15))
    lm = SPEAK["face"][4:14].reshape(5, 2)
    for i, (lx, ly) in enumerate(lm):
        p = seg(f, 1.7 + i * 0.22, 0.25)
        if p > 0:
            x, y = px + (lx - left) * scale, py + (ly - top) * scale
            r = 10 * p + 4
            d.ellipse((x - r - 6, y - r - 6, x + r + 6, y + r + 6), outline=ACCENT, width=3)
            d.ellipse((x - r, y - r, x + r, y + r), fill=AMBER)

    card(d, 1100, 170, 1800, 970, "DETECTION")
    rows = [
        ("Faces found", "1", 0.9),
        ("Confidence", "%.2f" % float(SPEAK["face"][-1]), 1.2),
        ("Box", "%d × %d px" % (round(float(SPEAK["face"][2])), round(float(SPEAK["face"][3]))), 1.5),
        ("Landmarks", "5 points", 2.0),
    ]
    for i, (k, v, at) in enumerate(rows):
        a = seg(f, at, 0.4)
        y = 290 + i * 150
        d.text((1148, y), k, font=F_ROW, fill=mix(CARD, MUTED, a))
        d.text((1148, y + 56), v, font=F_VAL, fill=mix(CARD, FG, a))
    d.text((1148, 900), "eyes · nose · mouth corners", font=F_SMALL, fill=mix(CARD, MUTED, seg(f, 2.4, 0.4)))


# ---------- Scene B: embedding ----------
EMB = ENROL["emb"].flatten()
EMB_MAX = float(np.abs(EMB).max())


def scene_b(img, d, f):
    pills(d, 2)
    ts = f / FPS - 3.3
    crop = ENROL["aligned"].resize((448, 448), Image.LANCZOS)
    a = ease(ts / 0.5)
    rounded_paste(img, crop, (140, 300), 36)
    d.text((140, 770), "Aligned face · 112 × 112", font=F_SMALL, fill=mix(BG, MUTED, a))
    # arrow
    d.line((620, 524, 740, 524), fill=ACCENT, width=6)
    d.polygon([(740, 502), (782, 524), (740, 546)], fill=ACCENT)
    # embedding strip
    x0, mid, bw, gap = 860, 524, 5, 2
    reveal = seg(f, 3.9, 1.6)
    n = int(128 * reveal)
    d.rounded_rectangle((820, 330, 1810, 720), radius=40, fill=CARD, outline=LINE, width=3)
    d.text((868, 356), "EMBEDDING · 128 VALUES", font=F_HEAD, fill=ACCENT)
    d.line((x0 - 8, mid + 20, x0 + 128 * (bw + gap), mid + 20), fill=LINE, width=2)
    for i in range(n):
        v = float(EMB[i]) / EMB_MAX
        h = abs(v) * 130
        x = x0 + i * (bw + gap)
        col = ACCENT if v >= 0 else (94, 92, 230)
        if v >= 0:
            d.rectangle((x, mid + 20 - h, x + bw, mid + 20), fill=col)
        else:
            d.rectangle((x, mid + 20, x + bw, mid + 20 + h), fill=col)
    vals = "  ".join("%+.2f" % float(v) for v in EMB[:6]) + "  …"
    d.text((868, 650), vals, font=font("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 34), fill=mix(CARD, FG, seg(f, 5.2, 0.5)))
    d.text((140, 880), "Each face becomes one list of numbers. Similar faces get similar lists.", font=F_ROW, fill=mix(BG, MUTED, seg(f, 5.0, 0.6)))


# ---------- Scene C: match ----------
def face_card(img, d, x, who, label, sub, show_box):
    """Square crop around the face with its box, plus a caption."""
    pil = who["pil"]
    fx, fy, fw, fh = [float(v) for v in who["face"][:4]]
    side = max(fw, fh) * 2.6
    cx, cy = fx + fw / 2, fy + fh / 2
    box = (cx - side / 2, cy - side / 2, cx + side / 2, cy + side / 2)
    # pad with the background colour if the box leaves the photo
    canvas = Image.new("RGB", (round(side), round(side)), (245, 245, 247))
    canvas.paste(pil, (round(-box[0]), round(-box[1])))
    s = 500 / side
    canvas = canvas.resize((500, 500), Image.LANCZOS)
    rounded_paste(img, canvas, (x, 200), 36)
    if show_box:
        d.rectangle(((fx - box[0]) * s + x, (fy - box[1]) * s + 200, (fx - box[0] + fw) * s + x, (fy - box[1] + fh) * s + 200), outline=GREEN, width=5)
    text_center(d, x + 250, 720, label, F_BIG, FG)
    text_center(d, x + 250, 800, sub, F_SMALL, MUTED)


def score_bar(d, x, y, w, score, p):
    d.rounded_rectangle((x, y, x + w, y + 26), radius=13, fill=(18, 18, 20))
    fill = w * clamp(score) * p
    d.rounded_rectangle((x, y, x + max(fill, 26), y + 26), radius=13, fill=GREEN)
    tx = x + w * THRESHOLD
    d.line((tx, y - 14, tx, y + 40), fill=AMBER, width=4)


def scene_c(img, d, f):
    pills(d, 3)
    xs = [120, 710, 1300]
    face_card(img, d, xs[0], ENROL, "Enrolled", "Manirajan", True)
    for x, who, name in ((xs[1], SPEAK, "speak"), (xs[2], BIKE, "bike")):
        p = seg(f, 6.8 if name == "speak" else 7.6, 0.9)
        face_card(img, d, x, who, "Match" if p > 0.98 else "Comparing…", "cosine %.2f" % (who["score"] * p), True)
        score_bar(d, x, 880, 500, who["score"], p)
    for x in xs[1:]:
        d.text((x + 500 * THRESHOLD - 52, 930), "threshold 0.36", font=F_SMALL, fill=AMBER)


def frame_image(f):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    t = f / FPS
    if t < 3.3:
        scene_a(img, d, f)
    elif t < 6.3:
        scene_b(img, d, f)
    else:
        scene_c(img, d, f)
    return img


for f in range(TOTAL):
    frame_image(f).save(os.path.join(OUT, "f%04d.png" % f))
print("frames:", TOTAL)
