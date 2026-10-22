"""Builds the hero montage: every segment cropped to follow the robot.

Two passes per segment. The first reads the red-shell centroid on every frame
and smooths it, because a per-frame crop box jitters and a lagging one drifts
off the robot on a turn. The second crops and scales against that smoothed
track and pipes raw frames to ffmpeg, which is the only thing here that
touches the codec.

Crop width is a fraction of the source, chosen per clip so nothing is blown up
much past 2x: a tighter crop puts the robot larger in frame and softer on
screen, and past 2x the softness is the thing the eye lands on.
"""
import subprocess, sys
import cv2, numpy as np
import imageio_ffmpeg
from track import red_blob

W, H, FPS = 1280, 720, 30
CRF = 32
DL = r"C:\Users\User\Downloads"

# path, start seconds, duration, crop width as a share of source width,
# track the robot or hold the frame centre
SEGMENTS = [
    (rf"{DL}\[Kamera Mobile] TRIAL 21 September 69 Detik.mp4", 43.5, 4.0, 0.56, True),
    (rf"{DL}\23 meu 2023.mp4",                                209.0, 4.0, 0.72, True),
    (rf"{DL}\Retry Test.mp4",                                  55.0, 4.0, 0.44, True),
    (rf"{DL}\Video1.mp4",                                       0.4, 3.5, 1.00, False),
    (rf"{DL}\[Kamera Mobile] TRIAL 21 September 69 Detik.mp4", 15.5, 4.0, 0.56, True),
]

def frames_of(path, start, dur):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(start * fps))
    want = int(dur * FPS)
    # Source frames per output frame: 60fps footage drops every other one.
    stride = fps / FPS
    got, i = 0, 0.0
    while got < want:
        ok, frame = cap.read()
        if not ok:
            break
        i += 1
        if i >= stride * (got + 1) - 0.5:
            yield frame
            got += 1
    cap.release()

def track(path, start, dur, w_share, follow):
    """Smoothed crop centres, one per output frame."""
    pts, size = [], None
    for frame in frames_of(path, start, dur):
        h, w = frame.shape[:2]
        size = (w, h)
        if follow:
            hit = red_blob(frame)
            pts.append((hit[0], hit[1]) if hit else (pts[-1] if pts else (w / 2, h / 2)))
        else:
            pts.append((w / 2, h / 2))
    if not pts:
        return [], size
    a = np.array(pts, dtype=np.float64)
    # Moving average, centred, so the box neither jitters nor lags.
    k = min(21, len(a) | 1)
    pad = k // 2
    padded = np.vstack([np.repeat(a[:1], pad, 0), a, np.repeat(a[-1:], pad, 0)])
    kern = np.ones(k) / k
    smooth = np.stack([np.convolve(padded[:, i], kern, "valid") for i in (0, 1)], 1)
    return smooth, size

def render(out_path):
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    proc = subprocess.Popen(
        [ff, "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}",
         "-r", str(FPS), "-i", "pipe:0", "-an",
         "-c:v", "libx264", "-preset", "slow", "-crf", str(CRF),
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", out_path],
        stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

    for path, start, dur, w_share, follow in SEGMENTS:
        centres, size = track(path, start, dur, w_share, follow)
        sw, sh = size
        # The crop keeps the output's aspect, so nothing is ever stretched.
        cw = int(sw * w_share)
        ch = int(cw * H / W)
        if ch > sh:                       # portrait source: width is the limit
            ch, cw = sh, int(sh * W / H)
        for frame, (cx, cy) in zip(frames_of(path, start, dur), centres):
            x = int(np.clip(cx - cw / 2, 0, sw - cw))
            y = int(np.clip(cy - ch / 2, 0, sh - ch))
            tile = frame[y:y + ch, x:x + cw]
            proc.stdin.write(cv2.resize(tile, (W, H), interpolation=cv2.INTER_AREA
                                        if cw > W else cv2.INTER_CUBIC).tobytes())
        print(f"  cut: {path.rsplit(chr(92),1)[-1]} @{start}s  crop {cw}x{ch} -> {W}x{H}"
              f"  ({'tracked' if follow else 'centred'}, {cw/W:.2f}x)")

    proc.stdin.close()
    err = proc.stderr.read().decode("utf8", "ignore")
    if proc.wait() != 0:
        sys.exit(err[-1500:])

if __name__ == "__main__":
    render(sys.argv[1])
