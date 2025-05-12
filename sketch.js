let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  noFill();
  stroke(255, 0, 0); // 紅色線條
  strokeWeight(5); // 線條粗度

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 繪製嘴唇
    drawLines(keypoints, [
      409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
      76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184,
    ]);

    // 繪製左眼
    drawLines(keypoints, [
      243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112,
      133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155,
    ]);

    // 繪製右眼
    drawLines(keypoints, [
      359, 467, 260, 259, 257, 258, 286, 444, 463, 341, 256, 252, 253, 254, 339, 255,
      263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249,
    ]);
  }
}

function drawLines(keypoints, indices) {
  beginShape();
  for (let i = 0; i < indices.length; i++) {
    const [x, y] = keypoints[indices[i]];
    vertex(x, y);
  }
  endShape(CLOSE);
}
