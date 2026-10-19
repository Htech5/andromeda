"""Bake the galaxy plate: apply the colour grade and the radial edge fade into
the file, so the browser paints a plain image with no filter and no mask.

Run after changing any knob below:  python scripts/bake_galaxy.py

Values mirror what used to live on .sky__core in src/app/components.css.
Tune them here, not in CSS, or the cost comes straight back.
"""

import numpy as np
from PIL import Image

SRC = "scripts/andromeda-source.webp"
OUT = "public/andromeda.webp"

BRIGHTNESS = 0.68
CONTRAST = 1.14
SATURATE = 1.12
# radial-gradient(circle closest-side, #000 52%, transparent 92%)
FADE_IN = 0.52
FADE_OUT = 0.92
QUALITY = 82

# CSS filter shorthands run in sRGB, so this is plain 0..1 maths.
LUMA = np.array([0.213, 0.715, 0.072], dtype=np.float32)


def grade(rgb: np.ndarray) -> np.ndarray:
    rgb = rgb * BRIGHTNESS
    rgb = rgb * CONTRAST + (0.5 - 0.5 * CONTRAST)
    grey = rgb @ LUMA
    return grey[..., None] + (rgb - grey[..., None]) * SATURATE


def edge_alpha(h: int, w: int) -> np.ndarray:
    """closest-side circle: radius is half the shorter side, measured from the
    centre, so a square source fades on a true circle."""
    radius = min(h, w) / 2
    y = (np.arange(h, dtype=np.float32) - (h - 1) / 2)[:, None]
    x = (np.arange(w, dtype=np.float32) - (w - 1) / 2)[None, :]
    d = np.hypot(y, x) / radius
    return np.clip((FADE_OUT - d) / (FADE_OUT - FADE_IN), 0.0, 1.0)


def main() -> None:
    src = Image.open(SRC).convert("RGB")
    rgb = np.asarray(src, dtype=np.float32) / 255.0
    h, w = rgb.shape[:2]

    out = np.clip(grade(rgb), 0.0, 1.0)
    alpha = edge_alpha(h, w)

    plate = np.dstack([out, alpha])
    Image.fromarray((plate * 255 + 0.5).astype(np.uint8), "RGBA").save(
        OUT, "WEBP", quality=QUALITY, method=6
    )
    print(f"{SRC} {w}x{h} -> {OUT}")


def demo() -> None:
    a = edge_alpha(100, 100)
    assert a[50, 50] == 1.0, "centre must stay opaque"
    assert a[0, 0] == 0.0, "corners sit past the circle, must be clear"
    assert 0.0 < a[50, 88] < 1.0, "fade band must ramp, not step"
    # Mid grey through brightness then contrast; saturate cannot move a grey.
    want = 0.5 * BRIGHTNESS * CONTRAST + (0.5 - 0.5 * CONTRAST)
    flat = grade(np.full((1, 1, 3), 0.5, dtype=np.float32))
    assert abs(float(flat.mean()) - want) < 1e-5, "grade chain drifted"
    red = grade(np.array([[[0.8, 0.2, 0.2]]], dtype=np.float32))[0, 0]
    assert red[0] > red[1] and red[0] > red[2], "saturate flattened the hue"
    print("ok")


if __name__ == "__main__":
    demo()
    main()
