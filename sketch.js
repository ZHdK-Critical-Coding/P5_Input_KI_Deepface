let capture;
const serverURL = "http://10.21.4.117:7777/analyze";
let waiting = false; // track if waiting for server response
let preElement;      // DOM element to show response

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  // Create <pre> element to show JSON response
  preElement = createElement('pre', '');
  preElement.position(10, height + 10); // below canvas
  preElement.style('max-width', '640px');
  preElement.style('white-space', 'pre-wrap');
}

function draw() {
  image(capture, 0, 0, width, height);

  // Draw red dot if waiting for response
  if (waiting) {
    fill(255, 0, 0);
    noStroke();
    ellipse(width - 20, 20, 20, 20);
  }
}

function keyPressed() {
  if (keyCode === 32 && !waiting) { // space key
    sendFrameToServer();
  }
}

function sendFrameToServer() {
  waiting = true; // show red dot

  // Convert current frame to Base64 JPEG
  const base64Img = canvas.toDataURL("image/jpeg").split(",")[1];

  fetch(serverURL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ image: base64Img })
  })
  .then(res => res.json())
  .then(data => {
    console.log("DeepFace response:", data);
    preElement.html(JSON.stringify(data, null, 2)); // print to <pre>
  })
  .catch(err => {
    console.error("DeepFace error:", err);
    preElement.html("Error: " + err);
  })
  .finally(() => {
    waiting = false; // remove red dot
  });
}