"""Finds the robot in a clip by its red shell, so the montage can crop to it.

The robot is the only large saturated-red thing in any of this footage: the
arenas are white board and grey carpet, the people are in dark or neutral
clothes. So a red mask plus the biggest blob in it is the whole tracker, and
it needs no model, no training and no per-clip tuning.
"""
import cv2, numpy as np

def red_blob(frame):
    """Centroid and pixel area of the largest red region, or None."""
    hsv = cv2.cvtColor(cv2.GaussianBlur(frame, (7, 7), 0), cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (0, 90, 60), (10, 255, 255)) | \
           cv2.inRange(hsv, (170, 90, 60), (180, 255, 255))
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, _, stats, cent = cv2.connectedComponentsWithStats(mask, 8)
    if n < 2:
        return None
    i = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    return (float(cent[i][0]), float(cent[i][1]), int(stats[i, cv2.CC_STAT_AREA]))

def scan(path, step_s=0.5):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out = []
    for f in range(0, n, max(1, int(fps * step_s))):
        cap.set(cv2.CAP_PROP_POS_FRAMES, f)
        ok, frame = cap.read()
        if not ok:
            break
        hit = red_blob(frame)
        out.append((f / fps, hit, w * h))
    cap.release()
    return out, fps, w, h

if __name__ == "__main__":
    for key, path in [
        ("trial21", r"C:\Users\User\Downloads\[Kamera Mobile] TRIAL 21 September 69 Detik.mp4"),
        ("retry",   r"C:\Users\User\Downloads\Retry Test.mp4"),
        ("meu2023", r"C:\Users\User\Downloads\23 meu 2023.mp4"),
        ("video1",  r"C:\Users\User\Downloads\Video1.mp4"),
    ]:
        rows, fps, w, h = scan(path)
        # share of the frame the robot covers, as a percentage
        share = [(t, 0.0 if hit is None else 100 * hit[2] / px) for t, hit, px in rows]
        best = sorted(share, key=lambda r: -r[1])[:8]
        print(f"\n{key}  {w}x{h} @{fps:.0f}  samples={len(rows)}")
        print("  biggest:", ", ".join(f"{t:.0f}s={v:.2f}%" for t, v in sorted(best)))
        # a coarse profile, so a sustained stretch is visible rather than a spike
        for i in range(0, len(share), 20):
            chunk = share[i:i + 20]
            bar = "".join("#" if v > 1.2 else ("+" if v > 0.4 else ".") for _, v in chunk)
            print(f"  {chunk[0][0]:6.0f}s {bar}")
