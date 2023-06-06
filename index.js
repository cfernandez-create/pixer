const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;


function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentSize(sliderValue) {
  currentSize = sliderValue;
}

function setBackgroundColor(newBgColor) {
  container.style.backgroundColor = newBgColor;
}

const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
const fillPicker = document.getElementById("fill-picker");
const slider = document.getElementById("slider");
const sliderValueLabel = document.getElementById("sliderValue");
const saveBtn = document.getElementById("save-btn");

slider.addEventListener("input", handleSliderChange);

function handleSliderChange(event) {
  const sliderValue = event.target.value;
  sliderValueLabel.textContent = sliderValue + " x " + sliderValue;
  setCurrentSize(sliderValue);
  reloadGrid();
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
clearBtn.onclick = () => reloadGrid();
fillPicker.oninput = (e) => setBackgroundColor(e.target.value);
saveBtn.onclick = () => saveImage();

function reloadGrid() {
  clearGrid();
  gridSetup(currentSize);
  console.log("Container cleared");
}

function clearGrid() {
  container.innerHTML = "";
}

function gridSetup(size) {
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mousedown", startDrawing);
    container.appendChild(square);
  }
}

function startDrawing(e) {
  e.target.style.backgroundColor = currentColor;
  container.addEventListener("mousemove", changeColor);
}

function changeColor(e) {
  e.target.style.backgroundColor = currentColor;
}

function stopDrawing() {
  container.removeEventListener("mousemove", changeColor);
}

const container = document.getElementById("root");

container.addEventListener("mouseup", stopDrawing);

function saveImage() {
  const squares = container.getElementsByClassName("square");
  const canvasSize = container.offsetWidth;
  const squareSize = canvasSize / currentSize;

  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");

  const containerBackgroundColor = getComputedStyle(container).backgroundColor;

  if (containerBackgroundColor === "rgb(255, 255, 255)") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = containerBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  Array.from(squares).forEach((square) => {
    const rect = square.getBoundingClientRect();
    const x = rect.left - container.getBoundingClientRect().left;
    const y = rect.top - container.getBoundingClientRect().top;

    setTimeout(() => {
      const color = getComputedStyle(square).backgroundColor;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, squareSize, squareSize);
    }, 0);
  });

  setTimeout(() => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "my_pixel.png";
    link.click();
  }, 100);
}

window.onload = () => {
  gridSetup(currentSize);
};
