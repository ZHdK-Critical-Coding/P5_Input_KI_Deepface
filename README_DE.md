# P5.js: Deepface

[English](readme.md)

Nimmt die Webcam auf und schickt das aktuelle Bild als Base64-JPEG an einen
[DeepFace](https://github.com/serengil/deepface)-Analyseserver. Die
JSON-Antwort (Alter, Geschlecht, Emotion, …) wird unter der Zeichenfläche
angezeigt. Ein Ausgangspunkt, um Gesichtsanalyse auf einem Server als Input
für einen Sketch zu verwenden.

## Installation

Voraussetzungen: eine Webcam und ein laufender DeepFace-Server, der vom
eigenen Computer aus erreichbar ist. Der Sketch ist für den kleinen
Flask-Server `deepface` in
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
gemacht (`deepface_server.py`, Port 7777): Er bietet `POST /analyze` an,
erwartet den Body `{ "image": "<base64 jpeg>" }` und erlaubt
Cross-Origin-Anfragen (CORS). Die offizielle DeepFace-API (`img` /
`img_path`) verwendet ein anderes Format und funktioniert nicht ohne
Anpassungen.

`serverURL` oben in `sketch.js` auf den eigenen Server setzen (Standard
`http://10.21.4.117:7777/analyze`).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Ausführen

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Den Zugriff auf die Webcam erlauben.
3. **Leertaste** drücken, um ein Bild zur Analyse zu schicken. Während auf
   die Antwort gewartet wird, erscheint ein roter Punkt.

## Coding-Hilfe

- **`sketch.js` → `serverURL`**: Adresse des DeepFace-Endpunkts.
- **`setup()`**: erstellt eine 640 × 480 grosse Zeichenfläche, startet die
  Webcam mit `createCapture(VIDEO)` (versteckt, wird selbst gezeichnet) und
  fügt unter der Zeichenfläche ein `<pre>`-Element für die Antwort ein.
- **`draw()`**: zeichnet das Webcam-Bild und den roten Punkt, solange
  `waiting` true ist.
- **`keyPressed()`**: Die Leertaste (`keyCode 32`) ruft
  `sendFrameToServer()` auf, ausser es läuft noch eine Anfrage.
- **`sendFrameToServer()`**: wandelt die Zeichenfläche mit
  `canvas.toDataURL()` in ein Base64-JPEG um, schickt es als JSON an
  `serverURL` und schreibt die Antwort formatiert ins `<pre>`-Element. Um im
  Sketch auf das Ergebnis zu reagieren (z. B. auf die erkannte Emotion),
  `data` in einer globalen Variable speichern und in `draw()` verwenden.
