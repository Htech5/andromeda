"""Squares the roster portraits for the org chart avatars.

Sources are formal red-background shots at wildly different sizes (279px to
5250px wide) and, worse, wildly different framing: some fill the frame, one
leaves half the picture as empty headroom. A fixed crop box therefore cannot
work, so the subject is found first and the square is built around it.

Detection is a colour distance from the backdrop sampled at the corners, or
the alpha channel when the photo is already a cut-out. Alpha is preserved:
the red disc behind a cut-out is painted by CSS, not baked in here.
"""
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "team"

SIZE = 360
QUALITY = 82
# How far a pixel must sit from the sampled backdrop to count as subject.
# ponytail: raise it if a dark backdrop ever reads as subject.
BG_DISTANCE = 60
# Crop side as a multiple of shoulder width, and how much of that side sits
# above the crown. Together they decide how tight the portrait reads.
SIDE_OF_WIDTH = 1.22
HEADROOM = 0.10


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def subject_box(image: Image.Image) -> tuple[int, int, int, int]:
    """Bounding box of the person, falling back to the whole frame."""
    data = np.asarray(image)

    if image.mode == "RGBA":
        mask = data[:, :, 3] > 16
    else:
        corners = np.stack(
            [data[0, 0], data[0, -1], data[-1, 0], data[-1, -1]]
        ).astype(np.int16)
        backdrop = np.median(corners, axis=0)
        mask = np.abs(data.astype(np.int16) - backdrop).max(axis=2) > BG_DISTANCE

    rows = np.flatnonzero(mask.any(axis=1))
    cols = np.flatnonzero(mask.any(axis=0))
    if rows.size == 0 or cols.size == 0:
        return 0, 0, image.width, image.height
    return int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    if not files:
        sys.exit(f"no photos under {SRC}")

    for path in files:
        image = Image.open(path)
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        width, height = image.size

        x0, y0, x1, y1 = subject_box(image)
        side = min(int((x1 - x0) * SIDE_OF_WIDTH), width, height)
        left = (x0 + x1) // 2 - side // 2
        top = y0 - int(side * HEADROOM)
        # Keep the square inside the frame; clamping beats padding, since a pad
        # would show as a hard edge inside the circular mask.
        left = max(0, min(left, width - side))
        top = max(0, min(top, height - side))

        image = image.crop((left, top, left + side, top + side))
        image = image.resize((SIZE, SIZE), Image.LANCZOS)

        target = OUT / f"{slug(path.stem)}.webp"
        image.save(target, "WEBP", quality=QUALITY, method=6)
        print(f"{target.name}  {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
