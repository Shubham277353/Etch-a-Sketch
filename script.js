document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const create = document.querySelector("#createButton");
  const reset = document.querySelector("#reset");
  const shade = document.querySelector("#shade");
  const rainbow = document.querySelector("#rainbow");

  let isPainting = false;
  let toggleShade = false;
  let toggleRainbow = false;

  container.onmousedown = (e) => {
    if (e.target !== document.getElementById("gridSize")) {
        e.preventDefault();
    }
};


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
      container.innerHTML = "";
      const size = 500 / count;

      for (let i = 0; i < count * count; i++) {
          const square = document.createElement("div");
          square.style.height = `${size}px`;
          square.style.width = `${size}px`;
          square.classList.add("squares");

          let darkness = 0;

          function darkenSquare() {
              if (darkness < 10) {
                  darkness += 1;
                  let lightness = 100 - darkness * 10;
                  square.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
              }
          }

          function randomColor() {
              if (toggleRainbow) {
                  const red = Math.floor(Math.random() * 256);
                  const green = Math.floor(Math.random() * 256);
                  const blue = Math.floor(Math.random() * 256);
                  square.style.backgroundColor = `rgb(${red},${green},${blue})`;
              }
          }

          square.addEventListener("mousedown", (e) => {
              e.preventDefault();
              isPainting = true;
              square.style.backgroundColor = "black";
              if (toggleRainbow) randomColor();
              if (toggleShade) darkenSquare();
          });

          square.addEventListener("mousemove", (e) => {
              if (isPainting) {
                  square.style.backgroundColor = "black";
                  if (toggleRainbow) randomColor();
                  if (toggleShade) darkenSquare();
              }
          });

          reset.addEventListener("click", () => {
              square.style.backgroundColor = "white";
          });

          container.appendChild(square);
      }
  }

  document.addEventListener("mouseup", () => {
      isPainting = false;
  });

  function updateGrid() {
      const newSize = document.getElementById("gridSize").value;
      if (newSize > 0 && newSize <= 100) {
          squareGrid(newSize);
      } else {
          alert("Please enter a valid number between 1 and 100.");
      }
  }

  squareGrid(16);
});
