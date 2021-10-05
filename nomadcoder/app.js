const canvas = document.getElementById("jsCanvas");
const colorSet = document.getElementById("jsReset");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const button = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
// css의 캔버스 크기가 700이므로 width와 height의 크기또한 700으로 주면 된다.
// canvas.width = 700;
// canvas.height = 700;
// 하지만 밑의 코드처럼 직접 캔버스의 너비와 높이를 가져오는 코드를 작성해도 된다.
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;


//not code & not fillColor drawing image save => backColor : transparentColor
//Because default backColor -> white
ctx.fillStyle = "white";
ctx.fillRect(1, 1, canvas.width, canvas.height);

//default fillColor, lineColor -> black
ctx.fillStyle = INITIAL_COLOR
ctx.strokeStyle = INITIAL_COLOR
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

let painting = false; // painting default
let filling = false; // Fill button default(★)

function stopPainting() {
    painting = false;
}

//mousedown left, right, wheel operate
//only left click operate code
function startPainting(event) {
    if(event.which !=1){
    return false;
    }
    else
    painting = true;
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//새로고침(리셋)
function colorReset() {
    window.location.reload()
}

function handleRangeChange(event){
    const size = event.target.value;
    console.log(size);
    ctx.lineWidth = size;
}

// 처음 기본값이 false 이므로 버튼을 클릭할 때 else문이 동작
// filling 은 true가 되고 버튼의 텍스트는 Paint가 된다.
// 다시 클릭하게 되면 filling 은 true이므로 if문이 동작
// 동작과 동시에 filling은 false가 되면서 버튼의 텍스트는 Fill이 된다.
// 위 과정 반복
function handleButtonClick(){
    if(filling === true) {
        filling = false;
        button.innerText = "Fill"
    } else {
        filling = true;
        button.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling === true)
        ctx.fillRect(1, 1, canvas.width, canvas.height);
}

// contextmenu 자체는 우클릭을 허용하지만 preventDefault();를 사용하는 즉시 우클릭이 금지된다.
function handleCM(event){
    event.preventDefault();
}

function saveImage(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;  // a href = 이미지 주소
    link.download = "bySeol.png"; //파일이름
    link.click();
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

colorSet.addEventListener("click", colorReset);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(button){
    button.addEventListener("click", handleButtonClick);
}

if(save){
    save.addEventListener("click", saveImage);
}