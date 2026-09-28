# P5.js: Deepface

[Deutsch](README_DE.md)

Captures the webcam and sends the current frame as a Base64 JPEG to a
[DeepFace](https://github.com/serengil/deepface) analysis server. The JSON
response (age, gender, emotion, …) is shown below the canvas. A starting
point for using face analysis on a server as input for a sketch.

## Installation

Requirements: a webcam.

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

## Server

Needs `deepface` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(HTTP, port 7777), running on a Raspberry Pi in the same network as your
computer. Start it first with `python deepface_server.py` in its folder
(or `bash run_server.sh`, which restarts it after a crash). It exposes
`POST /analyze`, takes `{ "image": "<base64 jpeg>" }` and returns age,
gender, race and emotion as JSON (with CORS). The official DeepFace API
uses a different format. Set `serverURL` in `sketch.js` to its address
(default `http://10.21.4.117:7777/analyze`).

## How to Run

1. Make sure the DeepFace server is running (see Server).
2. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
3. Allow webcam access.
4. Press **Space** to send a frame for analysis. A red dot is shown while
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
