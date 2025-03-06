const container = document.querySelector(".container");
const body = document.querySelector("body");
const title = document.createElement("div");
const controls = document.querySelector("#controls");
const create = document.querySelector("#createButton");
const reset = document.querySelector("#reset");
const shade = document.querySelector("#shade");
const rainbow = document.querySelector("#rainbow");

title.textContent = "Etch-a-Sketch";
title.classList.add("head-title");
body.insertBefore(title, body.firstChild);

let toggleShade = false;
let toggleRainbow = false;

shade.addEventListener("click", () => {
  toggleShade = !toggleShade;
});

rainbow.addEventListener("click", () => {
  toggleRainbow = !toggleRainbow;
});

create.addEventListener("click", () => {
  updateGrid();
});

function squareGrid(count) {
  let isPainting = false;
  container.innerHTML = "";
  const size = 500 / count;

  for (let i = 1; i <= count * count; i++) {
    const square = document.createElement("div");
    square.style.height = size + "px";
    square.style.width = size + "px";
    square.classList.add(`squares`);

    square.addEventListener("mousedown", () => {
      isPainting = true;
      square.style.backgroundColor = "Black";
    });

    square.addEventListener("mouseenter", () => {
      if (isPainting) {
        square.style.backgroundColor = "black";
      }
    });

    document.addEventListener("mouseup", () => {
      isPainting = false;
    });

    reset.addEventListener("click", () => {
      square.style.backgroundColor = "white";
    });

    let darkness = 0;

    function darkenSquare() {
      if (darkness < 10) {
        darkness += 1;
        let lightness = 100 - darkness * 10;
        square.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
      }
    }

    function randomColor() {
      if (isPainting && toggleRainbow) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${red},${green},${blue})`;
      }
    }

    square.addEventListener("mousedown", randomColor);
    square.addEventListener("mousedown", darkenSquare);

    square.addEventListener("mouseenter", () => {
      if (isPainting && toggleShade) {
        darkenSquare();
      }
    });
    square.addEventListener("mouseenter", () => {
      if (isPainting && toggleRainbow) {
        randomColor();
      }
    });

    container.appendChild(square);
  }
}

function updateGrid() {
  const newSize = document.getElementById("gridSize").value;
  if (newSize > 0 && newSize <= 100) {
    squareGrid(newSize);
  } else {
    alert("Please enter a valid number between 1 and 100. ");
  }
}

squareGrid(16);
