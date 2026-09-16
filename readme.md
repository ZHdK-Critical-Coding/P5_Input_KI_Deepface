# P5 -> DeepFace

A p5.js sketch that captures the webcam and sends the current frame (Base64
JPEG) to a [DeepFace](https://github.com/serengil/deepface) analysis server.
The JSON response (age, gender, emotion, …) is shown below the canvas.

## Requirements

- A running DeepFace server exposing `POST /analyze`. Adjust `serverURL` in
  `sketch.js` to point to your server.

## How to Use

1. Start Live Server (click **Go Live** in the VS Code status bar).
2. Allow webcam access.
3. Press **Space** to send a frame for analysis. A red dot is shown while waiting.
