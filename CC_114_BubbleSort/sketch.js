let persons = new Array();
let animating;

let startY = 60;
let offsetX = 60;

function setup() {
  createCanvas(640, 480);


  for (let i = 0; i < 9; i++) {
    let r = Math.floor(random(10));
    persons.push(new Person(r, i * 64, startY))
  }

  animating = wait(60 * 1);

}


function draw() {
  background(51);

  strokeWeight(0);
  fill(99);
  beginShape();
  vertex(offsetX, 200);
  vertex(-offsetX, height);
  vertex(width + offsetX, height);
  vertex(width - offsetX, 200);
  endShape(CLOSE);


  persons.forEach(person => person.draw());

  if (!animating) {
    for (let i = 0; i < persons.length; i++) {
      for (let j = 0; j < persons.length - i - 1; j++) {
        let a = persons[j];
        let b = persons[j + 1];
        if (a.value > b.value) {
          animating = swap(j, j + 1);
        }
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      if (animating)
        animating = animating();
    }

  }
}

function wait(time) {
  let i = 0;
  let func = function () {
    if (i++ < time)
      return func;
    return undefined;
  }
  return func;
}

function swap(aIndex, bIndex) {
  let a = persons[aIndex];
  let b = persons[bIndex];

  let aTargetX = b.x;
  let bTargetX = a.x;

  let moveDown = true;

  let func = function () {
    if (moveDown) {
      if (a.y < 150) {
        a.y = a.y + 1;
      }
      if (b.y < 150) {
        b.y = b.y + 1;
      }
      if (a.y < 150 || b.y < 150)
        return func;
    }
    moveDown = false;
    if (a.x != aTargetX || b.x != bTargetX) {
      if (a.x > aTargetX) {
        a.x--;
      }
      if (a.x < aTargetX) {
        a.x++;
      }
      if (b.x > bTargetX) {
        b.x--;
      }
      if (b.x < bTargetX) {
        b.x++;
      }
      return func;
    }

    if (a.y > startY) {
      a.y = a.y - 1;
    }
    if (b.y > startY) {
      b.y = b.y - 1;
    }
    if (a.y != startY || b.y != startY)
      return func;

    let tmp = persons[aIndex];
    persons[aIndex] = persons[bIndex];
    persons[bIndex] = tmp;

    return wait(60 * 1);

  }
  return func;
}