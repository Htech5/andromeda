"""Resizes the gallery photos for the carousel row.

Sources are mixed camera output: JPG, PNG and iPhone HEIC at up to 8MP. The
carousel keeps each card's natural aspect, so nothing is cropped here -- only
downscaled to a height the row can draw sharp and re-encoded to webp.
"""
import sys
from pathlib import Path

import pillow_heif
from PIL import Image, ImageOps

pillow_heif.register_heif_opener()

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "gallery"
HEIGHT = 1100
QUALITY = 80

OUT.mkdir(parents=True, exist_ok=True)
n = 0
for src in sorted(SRC.iterdir()):
    if src.suffix.lower() not in {".jpg", ".jpeg", ".png", ".heic"}:
        continue
    n += 1
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if img.height > HEIGHT:
        img = img.resize(
            (round(img.width * HEIGHT / img.height), HEIGHT), Image.LANCZOS
        )
    name = f"{n:02d}"
    img.save(OUT / f"{name}.webp", quality=QUALITY, method=6)
    print(f"{src.name} -> {name}.webp {img.width}x{img.height}")
