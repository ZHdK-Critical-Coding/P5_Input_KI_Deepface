# P5.js: Deepface

[Deutsch](README_DE.md)

Captures the webcam and sends the current frame as a Base64 JPEG to a
[DeepFace](https://github.com/serengil/deepface) analysis server. The JSON
response (age, gender, emotion, …) is shown below the canvas. A starting
point for using face analysis on a server as input for a sketch.

## Installation

Requirements: a webcam, and a running DeepFace server that is reachable from
your computer. The sketch is made for the small Flask server `deepface` in
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(`deepface_server.py`, port 7777): it exposes `POST /analyze`, expects the
body `{ "image": "<base64 jpeg>" }` and allows cross-origin requests (CORS).
The official DeepFace API (`img` / `img_path`) uses a different format and
does not work without changes.

Set `serverURL` at the top of `sketch.js` to your server (default
`http://10.21.4.117:7777/analyze`).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Allow webcam access.
3. Press **Space** to send a frame for analysis. A red dot is shown while
   waiting for the answer.

## Coding Help

- **`sketch.js` → `serverURL`**: address of the DeepFace endpoint.
- **`setup()`**: creates a 640 × 480 canvas, starts the webcam with
  `createCapture(VIDEO)` (hidden, drawn manually) and adds a `<pre>` element
  below the canvas for the response.
- **`draw()`**: draws the webcam image and the red dot while `waiting` is
  true.
- **`keyPressed()`**: Space (`keyCode 32`) calls `sendFrameToServer()`,
  unless a request is still running.
- **`sendFrameToServer()`**: converts the canvas to a Base64 JPEG with
  `canvas.toDataURL()`, posts it as JSON to `serverURL` and prints the
  response formatted into the `<pre>` element. To react to the result in
  the sketch (e.g. to the detected emotion), store `data` in a global
  variable and use it in `draw()`.
