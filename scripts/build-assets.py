#!/usr/bin/env python3
"""
Build the graded image assets used by the portfolio site.

Source photographs are placeholder stock images (Unsplash) plus the portrait
extracted from the resume DOCX. Replace the files in public/images with real
work when available and delete this script's dependency on the temp folder.

Usage: python3 scripts/build-assets.py
"""

from __future__ import annotations

import glob
import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
SRC = Path("/tmp/full")

GRADE_CACHE: dict[str, Image.Image] = {}


def load(name: str) -> Image.Image:
    path = SRC / f"{name}.jpg"
    if path.exists():
        return Image.open(path).convert("RGB")
    # fall back to the compressed copies shipped in the repo history
    raise FileNotFoundError(path)


def crop_to(img: Image.Image, ratio: float, focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    """Crop to an aspect ratio around a focus point (0..1 in both axes)."""
    w, h = img.size
    target = ratio
    if w / h > target:
        nw = int(h * target)
        nh = h
    else:
        nw = w
        nh = int(w / target)
    fx, fy = focus
    x = int(min(max(w * fx - nw / 2, 0), w - nw))
    y = int(min(max(h * fy - nh / 2, 0), h - nh))
    return img.crop((x, y, x + nw, y + nh))


def grade(img: Image.Image, *, desat=0.18, contrast=1.07, warmth=1.0, vignette=0.55, grain=3.0) -> Image.Image:
    """A restrained, slightly warm grade so all placeholder work feels like one body of work."""
    arr = np.asarray(img).astype(np.float32) / 255.0
    lum = arr @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    gray = np.dstack([lum] * 3)
    arr = arr * (1 - desat) + gray * desat
    arr = np.clip((arr - 0.5) * contrast + 0.5, 0, 1)
    # warm highlights, cool shadows
    arr[..., 0] = np.clip(arr[..., 0] * (1.0 + 0.035 * warmth) + 0.006, 0, 1)
    arr[..., 2] = np.clip(arr[..., 2] * (1.0 - 0.03 * warmth) + 0.012, 0, 1)
    arr = np.clip(arr, 0, 1)

    if grain > 0:
        rng = np.random.default_rng(11)
        n = rng.normal(0, grain, arr.shape[:2])[..., None]
        arr = np.clip(arr * 255 + n, 0, 255) / 255.0

    out = Image.fromarray((arr * 255).astype("uint8"))

    if vignette > 0:
        w, h = out.size
        mask = Image.new("L", (w, h), 0)
        d = ImageDraw.Draw(mask)
        d.ellipse([-w * 0.22, -h * 0.22, w * 1.22, h * 1.22], fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.12))
        dark = ImageEnhance.Brightness(out).enhance(1 - vignette * 0.45)
        out = Image.composite(out, dark, mask)
    return out


def save(img: Image.Image, name: str, quality: int = 82) -> None:
    path = OUT / name
    img.save(path, "WEBP", quality=quality, method=6)
    print(f"{name:24s} {img.size[0]}x{img.size[1]}  {path.stat().st_size // 1024} KB")


def build_work() -> None:
    specs = [
        # file, source, ratio, focus, max width
        ("work-01.webp", "1489599849927-2ee91cede3ba", 2.2, (0.5, 0.82), 2000),
        ("work-02.webp", "1478720568477-152d9b164e26", 1.6, (0.5, 0.5), 1600),
        ("work-03.webp", "1502823403499-6ccfcf4fb453", 0.8, (0.5, 0.36), 1200),
        ("work-04.webp", "1493514789931-586cb221d7a7", 1.33, (0.5, 0.5), 1400),
        ("work-05.webp", "1493225457124-a3eb161ffa5f", 1.6, (0.5, 0.45), 1600),
        ("hero-poster.webp", "1519608487953-e999c86e7455", 1.78, (0.5, 0.55), 1920),
    ]
    for name, source, ratio, focus, width in specs:
        img = crop_to(load(source), ratio, focus)
        if img.width > width:
            img = img.resize((width, int(width / ratio)), Image.LANCZOS)
        grade_amount = dict(desat=0.22, contrast=1.06, vignette=0.6, grain=2.4)
        save(grade(img, **grade_amount), name, quality=80)


def build_contact_bg() -> None:
    """Out-of-focus neon plate, derived from the hero poster so the closing page rhymes with it."""
    src = Image.open(OUT / "hero-poster.webp").convert("RGB")
    plate = src.filter(ImageFilter.GaussianBlur(24))
    plate = ImageEnhance.Color(plate).enhance(1.45)
    plate = ImageEnhance.Brightness(plate).enhance(0.95)

    w, h = plate.size
    # vertical fade so the plate melts into the page at the top and bottom
    fade = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(fade)
    for y in range(h):
        t = y / h
        v = 1.0
        if t < 0.28:
            v = 0.35 + (t / 0.28) * 0.65
        elif t > 0.72:
            v = 0.35 + ((1 - t) / 0.28) * 0.65
        d.line([(0, y), (w, y)], fill=int(255 * max(0.05, min(1, v))))
    plate = Image.composite(plate, Image.new("RGB", (w, h), (7, 7, 8)), fade)
    save(plate, "contact-bg.webp", quality=80)


def build_portrait() -> None:
    """Portrait from the resume photo: background cut out, placed on a dark studio backdrop."""
    source = Path("/tmp/cut.png")
    if not source.exists():
        print("portrait source missing (run the cutout step first)")
        return

    src = Image.open(source).convert("RGBA")
    w0, h0 = src.size
    scale = 3.4
    w, h = int(w0 * scale), int(h0 * scale)
    src = src.resize((w, h), Image.LANCZOS)

    arr = np.asarray(src).astype(np.float32)
    rgb, alpha = arr[..., :3], arr[..., 3] / 255.0

    # kill the white fringe left by the original ID-photo background
    mask = Image.fromarray((alpha * 255).astype("uint8"))
    core = mask.filter(ImageFilter.MinFilter(9))
    band = np.clip(
        (np.asarray(mask).astype(np.float32) - np.asarray(core).astype(np.float32)) / 255.0 * 1.6,
        0,
        1,
    )
    band = np.asarray(
        Image.fromarray((band * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.6))
    ) / 255.0
    rgb = rgb * (1 - 0.8 * band[..., None]) * (alpha[..., None] ** 1.3)

    portrait_src = Image.fromarray(
        np.dstack([np.clip(rgb, 0, 255).astype("uint8"), (alpha * 255).astype("uint8")]), "RGBA"
    ).filter(ImageFilter.UnsharpMask(radius=1.4, percent=40, threshold=3))

    cw, ch = 1000, 1250
    canvas = Image.new("RGB", (cw, ch), (7, 7, 8))

    warm = Image.new("L", (cw, ch), 0)
    d = ImageDraw.Draw(warm)
    d.ellipse([cw * 0.06, -ch * 0.2, cw * 0.98, ch * 0.62], fill=105)
    warm = warm.filter(ImageFilter.GaussianBlur(120))
    canvas = Image.composite(
        Image.new("RGB", (cw, ch), (42, 31, 23)), canvas, warm.point(lambda v: int(v * 0.9))
    )

    cool = Image.new("L", (cw, ch), 0)
    d = ImageDraw.Draw(cool)
    d.ellipse([cw * 0.58, 0, cw * 1.3, ch * 0.8], fill=85)
    cool = cool.filter(ImageFilter.GaussianBlur(140))
    canvas = Image.composite(
        Image.new("RGB", (cw, ch), (16, 23, 32)), canvas, cool.point(lambda v: int(v * 0.8))
    )

    ph = int(ch * 1.06)
    pw = int(w * ph / h)
    portrait = portrait_src.resize((pw, ph), Image.LANCZOS)
    canvas.paste(portrait, ((cw - pw) // 2, int(-ch * 0.01)), portrait)

    graded = grade(canvas, desat=0.34, contrast=1.06, vignette=0.7, grain=4.5)

    arr = np.asarray(graded).astype(np.float32) / 255
    arr = np.where(arr > 0.72, 0.72 + (arr - 0.72) * 0.55, arr)  # highlight roll-off
    arr = np.clip(arr * 0.96, 0, 1)
    arr[..., 0] = np.clip(arr[..., 0] * 1.02 + 0.004, 0, 1)
    arr[..., 2] = np.clip(arr[..., 2] * 1.02 + 0.010, 0, 1)
    save(Image.fromarray((arr * 255).astype("uint8")), "portrait.webp", quality=86)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build_work()
    build_contact_bg()
    build_portrait()


if __name__ == "__main__":
    main()
