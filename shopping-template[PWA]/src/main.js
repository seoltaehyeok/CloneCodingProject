
// items
function loadItems(){
    return fetch('data/data.json') // fetch를 통해 경로를 작성하면 데이터를(json파일을) 받아옴
    .then(response => response.json()) // response 바디를 json의 오브젝트로 변환
    .then(json => json.items); // json안에 있는 items를 리턴
}

function displayItems(items){
    const container = document.querySelector('.items');
     // 매핑을 통해 items를 문자열로 변환(li태그) 및 join을 이용하여 문자열의 배열을 하나의 문자열로 병합
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    //String 템플릿 사용
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
    if(key == null || value == null) { //필터링할 수 있는 데이터가 없는 경우는 return으로 인한 종료
      return;
    }
    displayItems(items.filter(item => item[key] === value)); // key와 value를 보여줌
}


//버튼이 클릭되었을 때 동작하는 코드
function setEventListeners(items) {
    //이벤트 위임
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');

    logo.addEventListener('click', () => displayItems(items)); // 로고가 클릭되면 모든 아이템들이 보이도록
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems() // data.json파일이 실행된 이후 호출
    .then(items => {
        displayItems(items);
        setEventListeners(items)
    })
    .catch(console.log); // 성공하지 못하면 에러메시지 출력