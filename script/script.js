const list = document.getElementById(`todo-list`);
const checkAll = document.getElementById(`check-all`);
const listElements = [];
const todo = document.getElementById(`wrapper`)

let displayStatus = `All`;

function createNewElement(text) {
    listElements.push({
        id: listElements.length, 
        status: false, 
        value: text
    });
    render();
}

function deleteElement() {

}

function changeAllElements () {

}

function changeOneElement (element) {
    
}

function checkStatusAllElement () {
    if (listElements.every(element => element.status)) {
        checkAll.setAttribute(`checked`);
    } else {
        checkAll.removeAttribute(`checked`);
    }
}


function prepareShowList () {
    let showList = [];
    switch (displayStatus) {
        case `All`: showList = [...listElements]
        break;
        case `Checked`: showList = listElements.filter((element) => {
            if(element.status) {
                return element;
            }
        }
            )
        break;
        case `Unchecked`: showList = listElements.filter((element) => {
            if(!element.status) {
                return element;
            }
        }
            )
        break;
    }
    let temp = "";
    for(const element of showList) {
      temp +=  `<li class="todo-liat__element" number="${element.id} status="${element.status}">
            <input type="checkbox" class="list-element__checkbox" ${element.status ? "checked" : ""}>
            <span class="list-element__text">${element.value}</span>
            <input type="button" value="Del" class="list-element__button">
        </li>`
    }
    return temp;
}

function render() {
    list.innerHTML = prepareShowList();

}

todo.addEventListener (`keydown`,  (event) => {
    if(event.code ===`Enter`) {
        let temp = event.target.value.trim();
        event.target.value = ``;
        if(temp) {
            createNewElement(temp);
        }
    }
})

todo.addEventListener(`click`, (event)=> {
   switch (event.target.className){
        case `list-element__checkbox`: 
        event.target.
            break;
        case `list-element__button`: break;
        case `display-selection__button`: break;
        case `check-all`: break;
   }
})

todo.addEventListener(`dblclick`, (event) => {
    if (event.target.className ===  `list-element__text`){
            
        } 
})
