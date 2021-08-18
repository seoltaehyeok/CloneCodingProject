
//제이슨 파일에 있는 items를 동적으로 받아옴
function loadItems() {
  return fetch('data/data.json') // 지정된 주소의 데이터를 받아옴
  .then(response => response.json()) //response의 body를 json의 오브젝트로 변환
  .then(json => json.items); // json안에 있는 아이템만 전달하도록
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
      return;
    }

    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = documnet.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items))
}

//main
loadItems() //제이슨이 실행되면 실행
  .then(items => {
    console.log(items);
    displayItems(items); //아이템들을 보여주고 받아온 아이템을 함수에 전달
    //setEventListeners(items) //버튼을 누르면 필터링을 하는 이벤트
  })
  .catch(console.log);