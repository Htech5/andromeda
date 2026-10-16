"""Four mission scenes built from the M31 STL.

The robot is flattened to a single-tone silhouette, so the shape carries the
story and the site's red is free for the one element that matters per frame.
"""
import numpy as np
from PIL import Image, ImageDraw

from render_stl import SRC, load, rasterize

W, H = 1000, 750
SQ = 1100  # square render, cropped into the 4:3 frame

RED = (217, 43, 34)
GROUND = (214, 215, 219, 255)
EDGE = (166, 168, 175, 255)
INK = (34, 37, 47)
ROCK_TONES = [(198, 200, 206), (176, 179, 186), (152, 155, 163), (131, 134, 142)]
ROCK_EDGE = (108, 111, 119, 255)


def robot(verts, norms, yaw, pitch, roll=0.0, scale=0.74):
    """Solid silhouette of the robot on a transparent ground."""
    _, mask = rasterize(verts, norms, np.deg2rad(yaw), np.deg2rad(pitch),
                        np.deg2rad(roll), size=SQ, fill=scale)
    rgb = np.zeros((SQ, SQ, 3), np.uint8)
    rgb[mask] = INK
    return Image.fromarray(np.dstack([rgb, (mask * 255).astype(np.uint8)]), "RGBA")


def frame():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def paste(bg, bot, cx, feet, width):
    """Drop the cut-out so its feet land on `feet`, centred on `cx`."""
    bot = bot.crop(bot.getbbox())
    scale = width / bot.width
    bot = bot.resize((int(bot.width * scale), int(bot.height * scale)), Image.LANCZOS)
    bg.alpha_composite(bot, (int(cx - bot.width / 2), int(feet - bot.height)))
    return bg


def rock(d, cx, cy, r, rng, tone=None):
    """One irregular stone: body polygon, darker rim, lit facet toward the light."""
    n = int(rng.integers(5, 9))
    ang = np.sort(rng.random(n) * 2 * np.pi)
    rad = r * (0.66 + 0.44 * rng.random(n))
    pts = [(cx + np.cos(a) * q, cy + np.sin(a) * q * 0.84) for a, q in zip(ang, rad)]

    tone = tone or ROCK_TONES[int(rng.integers(0, len(ROCK_TONES)))]
    d.polygon(pts, fill=tone + (255,), outline=ROCK_EDGE, width=max(1, int(r * 0.06)))

    # Shrink toward the centroid and shift up-left: reads as the lit face.
    mx = sum(p[0] for p in pts) / n
    my = sum(p[1] for p in pts) / n
    facet = [
        (mx + (x - mx) * 0.74 - r * 0.1, my + (y - my) * 0.74 - r * 0.12)
        for x, y in pts
    ]
    lit = tuple(min(255, c + 20) for c in tone)
    d.polygon(facet, fill=lit + (255,))


def terrain(v, n):
    """Seen from above, ringed by debris: the ground the robot has to cross."""
    im = frame()
    d = ImageDraw.Draw(im)
    rng = np.random.default_rng(11)
    d.rectangle([0, 0, W, H], fill=(231, 232, 235, 255))

    clear = 150  # the robot's own footprint stays free of stones
    placed: list[tuple[float, float, float]] = []
    tries = 0
    while len(placed) < 420 and tries < 40000:
        tries += 1
        x = rng.random() * W
        y = rng.random() * H
        # Gravel dominates; the occasional boulder breaks the rhythm.
        r = float(rng.choice([9, 13, 18, 24, 31, 40, 52],
                             p=[.24, .22, .19, .15, .11, .06, .03]))
        if (x - W / 2) ** 2 + ((y - H / 2) / 0.82) ** 2 < (clear + r) ** 2:
            continue
        # Slight overlap is wanted: a debris field, not a polka dot grid.
        if any((x - px) ** 2 + (y - py) ** 2 < (r + pr - 4) ** 2 for px, py, pr in placed):
            continue
        placed.append((x, y, r))

    # Three stones wear the team red. They must clear the silhouette, or the
    # robot covers them, and they must sit apart, or they read as one blotch.
    marked: set[tuple[float, float]] = set()
    angles: list[float] = []
    for x, y, r in sorted(placed, key=lambda s: -s[2]):
        if not 17 <= r <= 34:
            continue
        dx, dy = x - W / 2, y - H / 2
        dist = (dx * dx + dy * dy) ** 0.5
        if not 280 <= dist <= 440:
            continue
        a = np.arctan2(dy, dx)
        if any(abs((a - b + np.pi) % (2 * np.pi) - np.pi) < 1.5 for b in angles):
            continue
        angles.append(a)
        marked.add((x, y))
        if len(marked) == 3:
            break

    for x, y, r in sorted(placed, key=lambda s: s[1]):
        rock(d, x, y, r, rng, RED if (x, y) in marked else None)

    paste(im, robot(v, n, -40, 86), W / 2, H / 2 + 190, 400)
    return im


def victim(v, n):
    """One real casualty in red, one dummy outlined: the robot picks the real one."""
    im = frame()
    d = ImageDraw.Draw(im)
    d.rectangle([0, 660, 1000, 750], fill=GROUND)
    d.line([(0, 660), (1000, 660)], fill=EDGE, width=5)
    paste(im, robot(v, n, -62, 12), 380, 660, 400)
    d.rounded_rectangle([690, 530, 756, 660], 22, fill=RED + (255,))
    d.ellipse([696, 482, 750, 536], fill=RED + (255,))
    d.rounded_rectangle([818, 566, 872, 660], 18, outline=EDGE, width=6)
    d.ellipse([822, 528, 868, 574], outline=EDGE, width=6)
    for y0, y1 in ((455, 430), (688, 712)):
        d.line([(660, y0), (660, y1), (786, y1)], fill=RED + (255,), width=4)
    return im


def autonomous(v, n):
    """No operator: scan arcs sweep out of the sensor head."""
    im = frame()
    d = ImageDraw.Draw(im)
    for i, r in enumerate((145, 230, 315, 400)):
        d.arc([500 - r, 430 - r, 500 + r, 430 + r], 196, 344,
              fill=RED + (235 - i * 52,), width=7)
    d.rectangle([0, 668, 1000, 750], fill=GROUND)
    d.line([(0, 668), (1000, 668)], fill=EDGE, width=5)
    paste(im, robot(v, n, -8, 10), 500, 668, 370)
    return im


def route(v, n):
    """Victim positions are reshuffled every match, so the path is never fixed."""
    im = frame()
    d = ImageDraw.Draw(im)
    path = [(150, 700), (330, 646), (470, 548), (650, 496), (790, 398), (935, 344)]
    for a, b in zip(path, path[1:]):
        d.line([a, b], fill=EDGE, width=8)
    for i, (x, y) in enumerate(path):
        box = [x - 20, y - 20, x + 20, y + 20]
        if i in (2, 4):
            d.rectangle(box, fill=RED + (255,))
        else:
            d.rectangle(box, outline=EDGE, width=6)
    paste(im, robot(v, n, -50, 44), 265, 690, 300)
    return im


SCENES = {
    "medan": terrain,
    "korban": victim,
    "otonom": autonomous,
    "rute": route,
}

if __name__ == "__main__":
    v, n = load(SRC)
    for name, build in SCENES.items():
        out = f"../public/images/mission-{name}.webp"
        build(v, n).save(out, "WEBP", quality=86, method=6)
        print("wrote", out)
