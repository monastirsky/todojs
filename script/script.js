const todo = document.getElementById("wrapper");
const list = document.getElementById("todo-list");
const checkAll = document.getElementById("check-all");
const quantity = document.getElementById("quantity-elements");
const listElements = [];

let displayStatus = `All`;

function createNewElement(text) {
  const temp = {
    status: false,
    value: text,
  };
  listElements.push(temp);
  render();
}

function deleteElement(id) {
  console.log(listElements.splice(id, 1));
  render();
}

function changeAllElements() {
  if (!checkAll.checked) {
    listElements.forEach((element) => {
      element.status = false;
    });
  } else {
    listElements.forEach((element) => {
      element.status = true;
    });
  }
  console.log(listElements);
  render();
}

function changeOneElement(element) {
  if (element.checked) {
    listElements[element.parentNode.getAttribute("number")].status = true;
  } else {
    listElements[element.parentNode.getAttribute("number")].status = false;
  }
  render();
}

function checkStatusAllElement() {
  if (
    listElements.every((element) => {
      return element.status;
    })
  ) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
}

function prepareShowList() {
  let showList = [];
  switch (displayStatus) {
    case `All`:
      showList = listElements.map((element, index) => {
        element.id = index;
        return element;
      });
      break;
    case `Checked`:
      showList = listElements.filter((element, index) => {
        if (element.status) {
          element.id = index;
          return element;
        }
      });
      break;
    case `Unchecked`:
      showList = listElements.filter((element, index) => {
        if (!element.status) {
          element.id = index;
          return element;
        }
      });
      break;
  }
  let temp = "";
  for (const element of showList) {
    temp += `<li class="todo-list__element" number="${element.id}"
                status="${element.status}">
            <input type="checkbox" class="list-element__checkbox" ${
              element.status ? "checked" : ""
            }>
            <span class="list-element__text">${element.value}</span>
            <input type="button" class="list-element__button">
        </li>`;
  }
  return temp;
}

function prepareFooter() {
  if (listElements.length) {
    quantity.innerHTML = `${
      listElements.filter((element) => {
        if (!element.status) {
          return element;
        }
      }).length
    } items left`;
  } else {
    quantity.innerHTML = "";
  }
}

function changeDisplayStatus(element) {
  displayStatus = element.value;
  console.log(element.value);
  render();
}

function render() {
  list.innerHTML = prepareShowList();
  prepareFooter();
  checkStatusAllElement();
}

todo.addEventListener(`keydown`, (event) => {
  if (event.code === `Enter`) {
    let temp = event.target.value.trim();
    event.target.value = ``;
    if (temp) {
      createNewElement(temp);
    }
  }
});

todo.addEventListener(`click`, (event) => {
  switch (event.target.className) {
    case `list-element__checkbox`:
      changeOneElement(event.target);
      break;
    case `list-element__button`:
      deleteElement(event.target.parentNode.getAttribute("number"));
      break;
    case `display-selection__button`:
      changeDisplayStatus(event.target);
      break;
    case `check-all`:
      changeAllElements();
      break;
  }
});

// todo.addEventListener(`dblclick`, (event) => {
//   if (event.target.className.contains("list-element__text")) {
//   }
// });
