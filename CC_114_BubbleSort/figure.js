const pixelWidth = 64;


class Person {


  constructor(number, x, y) {
    this.x = x;
    this.y = y;
    this.startY = y;
    this.value = number;
    this.image = loadImage('shifman.png');
    this.scale = 0.8 + (number / 10);
    this.iter = 0;
  }

  draw() {
    if(frameCount % 2 == 0) {
      this.iter = (this.iter + 1) % 8;
    }

    textSize(24);
    fill(255);
    textAlign(CENTER);
    text(`${this.value}`, this.x + offsetX, height - 20);

    let newSize = (pixelWidth + (this.y - this.startY) / 4) * this.scale;

    imageMode(CENTER);

    image(this.image, this.x + offsetX, this.y - (newSize / 2) + 200, newSize, newSize, 0, 64 * this.iter, 0, 64);

  }
}