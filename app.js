const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll('.jsColor')
const range = document.querySelector('#jsRange')
const mode = document.querySelector('#jsMode')
const save = document.querySelector('#jsSave')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)



ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR


let painting = false;
let filling = false
let x, y;

function stopPainting() {
    painting = false;
}

function startPainting(event) {
    painting = true;
    x = event.offsetX;
    y = event.offsetY;
}

function onMouseMove(event) {
    if (!painting) {
        x = event.offsetX;
        y = event.offsetY;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        x = event.offsetX;
        y = event.offsetY;
    }
}

function onMouseDown(event) {
    painting = true;
    x = event.offsetX;
    y = event.offsetY;
}

function handleColorClick(event) {
    const color = event.target.style.background
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

function handleRangeChange(event) {
    const rangeValue = event.target.value
    ctx.lineWidth = rangeValue

}

function hanldeModeClick() {
    if (filling === true) {
        filling = false
        mode.innerText = 'Заливка'
    } else {
        filling = true
        mode.innerText = 'Рисование'
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = image
    link.download = 'PaintJS [Export]'
    link.click()
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', event => { event.preventDefault() })
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))


if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener('click', hanldeModeClick)
}

if (save) {
    save.addEventListener('click', handleSaveClick)
}