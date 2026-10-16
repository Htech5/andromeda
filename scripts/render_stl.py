"""Render a binary STL to PNG. Area-weighted surface sampling into a z-buffer.

Pure numpy: no 3D engine, no runtime dependency shipped to the site.
"""
import numpy as np
from PIL import Image

SRC = r"C:\Users\User\Downloads\juara nasional robot SAR.stl"
SAMPLES = 42_000_000
CHUNK = 3_000_000


def load(path):
    buf = np.fromfile(path, dtype=np.uint8)
    n = int(buf[80:84].view("<u4")[0])
    rec = np.dtype([("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")])
    data = buf[84 : 84 + n * 50].view(rec)
    return data["v"].reshape(-1, 3, 3).astype(np.float32), data["n"].astype(np.float32)


# The STL is modelled Z-up; the camera works in Y-up. Swap once, then orbit.
ZUP = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]], np.float32)


def basis(yaw, pitch):
    cy, sy = np.cos(yaw), np.sin(yaw)
    cp, sp = np.cos(pitch), np.sin(pitch)
    ry = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]], np.float32)
    rx = np.array([[1, 0, 0], [0, cp, -sp], [0, sp, cp]], np.float32)
    return (rx @ ry @ ZUP).astype(np.float32)


def render(verts, norms, yaw, pitch, size=1600, ink=(236, 236, 236)):
    rot = basis(yaw, pitch)
    tri = verts @ rot.T
    nrm = norms @ rot.T
    nrm /= np.linalg.norm(nrm, axis=1, keepdims=True) + 1e-9

    pts = tri.reshape(-1, 3)
    lo, hi = pts.min(0), pts.max(0)
    span = float((hi - lo)[:2].max())
    scale = (size * 0.9) / span
    mid = (lo + hi) / 2

    e1 = tri[:, 1] - tri[:, 0]
    e2 = tri[:, 2] - tri[:, 0]
    area = np.linalg.norm(np.cross(e1, e2), axis=1) * 0.5
    cum = np.cumsum(area, dtype=np.float64)
    cum /= cum[-1]

    light = np.array([0.34, 0.5, 0.8], np.float32)
    light /= np.linalg.norm(light)
    shade = (0.16 + 0.84 * np.abs(nrm @ light) ** 0.8).astype(np.float32)

    depth = np.full(size * size, np.inf, np.float32)
    value = np.zeros(size * size, np.float32)
    rng = np.random.default_rng(7)

    done = 0
    while done < SAMPLES:
        m = min(CHUNK, SAMPLES - done)
        done += m
        t = np.searchsorted(cum, rng.random(m))
        u = rng.random(m, dtype=np.float32)
        v = rng.random(m, dtype=np.float32)
        flip = u + v > 1
        u[flip] = 1 - u[flip]
        v[flip] = 1 - v[flip]
        p = tri[t, 0] + e1[t] * u[:, None] + e2[t] * v[:, None]

        x = ((p[:, 0] - mid[0]) * scale + size / 2).astype(np.int32)
        y = (size / 2 - (p[:, 1] - mid[1]) * scale).astype(np.int32)
        ok = (x >= 0) & (x < size) & (y >= 0) & (y < size)
        idx = y[ok] * size + x[ok]
        z = (-p[ok, 2]).astype(np.float32)
        np.minimum.at(depth, idx, z)
        hit = depth[idx] == z
        value[idx[hit]] = shade[t[ok][hit]]

    mask = np.isfinite(depth).reshape(size, size)
    lum = value.reshape(size, size)
    rgb = np.zeros((size, size, 3), np.uint8)
    for c in range(3):
        rgb[..., c] = np.clip(lum * ink[c], 0, 255).astype(np.uint8)
    alpha = (mask * 255).astype(np.uint8)
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")


VIEWS = {
    "robot-quarter": (-38, 18),
    "robot-front": (0, 12),
    "robot-side": (90, 12),
    "robot-top": (-38, 62),
}

if __name__ == "__main__":
    v, n = load(SRC)
    for name, (yaw, pitch) in VIEWS.items():
        img = render(v, n, np.deg2rad(yaw), np.deg2rad(pitch))
        img.resize((800, 800), Image.LANCZOS).save(f"{name}.png")
        print("wrote", name)
