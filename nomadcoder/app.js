const canvas = document.getElementById("jsCanvas");
const colorSet = document.getElementById("jsReset");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();    // 경로 생성
        ctx.moveTo(x, y);   // 선 시작 좌표
    } else {
        ctx.lineTo(x, y);   // 선 끝 좌표
        ctx.stroke();       // 선 그리기
        //ctx.closePath();  // 경로 해제
    }
}

let painting = false; // 페인팅 기본값

function stopPainting(event) {
    painting = false;
}

function startPainting() {
    painting = true;
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
}

function colorReset() {
    window.location.reload()
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

colorSet.addEventListener("click", colorReset);

