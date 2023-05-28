const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#000000';

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentSize(sliderValue) {
    currentSize = sliderValue
}

function setBackgroundColor(newBgColor) {
    container.style.backgroundColor = newBgColor
}

const clearBtn = document.getElementById('clear-btn')
const colorPicker = document.getElementById('color-picker')
const fillPicker = document.getElementById('fill-picker')
const slider = document.getElementById('slider')
const sliderValueLabel = document.getElementById('sliderValue')

slider.addEventListener('input', handleSliderChange)

function handleSliderChange(event) {
    const sliderValue = event.target.value
    sliderValueLabel.textContent = sliderValue
    setCurrentSize(sliderValue)
    reloadGrid()
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
clearBtn.onclick = () => reloadGrid()
fillPicker.oninput = (e) => setBackgroundColor(e.target.value)


function reloadGrid(){
    clearGrid()
    gridSetup(currentSize)
    console.log('Container cleared')
}

function clearGrid(){
    container.innerHTML = ''
}

function gridSetup(size) {
container.style.display = 'grid'
container.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`
container.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`

for(let i=0; i < size * size; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.addEventListener('mouseover', changeColor)
    square.addEventListener('mousedown', changeColor)
    container.appendChild(square)
}
}

function changeColor(e){
    e.target.style.backgroundColor = currentColor;
}

const container = document.getElementById('root');


window.onload = () => {
    gridSetup(currentSize)
}
