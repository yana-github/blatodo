const root = document.querySelector("#root");

//функции - утилиты

function getDate() {
  let d = new Date();

  let dd = d.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = d.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = d.getFullYear();

  return dd + "." + mm + "." + yy;
}

function randomInteger(min, max) {
  return Math.round(Math.random(min, max) * (max - min) + min);
}

function createEl(tag, className, text, type, placeholder) {
  let el = document.createElement(tag);
  className ? el.classList.add(className) : null;
  text ? (el.innerText = text) : null;
  if (tag === "input") {
    type ? (el.type = type) : null;
    placeholder ? (el.placeholder = placeholder) : null;
  }
  return el;
}

//добавить основные элементы

let container = createEl("div", "container");
let form = createEl("div", "form");
let formNav = createEl("div", "form-nav");
let deleteBtn = createEl("button", "prime-btn", "Delete All");
let formInput = createEl("input", "form-input", "", "", "Enter to do...");
let addBtn = createEl("button", "prime-btn", "Add");
let ul = createEl("ul", "card-list");

let randomId = randomInteger(1, 50);

//работа с данными из локал сторадж

let todos = [];

function getName() {
  return JSON.parse(localStorage.getItem("todos")) ?? [];
}

function setName() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", () => {
  todos = getName();
  render(todos);
});

//добавление и удаление задач по кнопкам Add/DeleteAll

function addItem() {
  if (!formInput.value) {
    return;
  }
  const todo = {
    id: randomInteger(1, 50),
    date: getDate(),
    text: formInput.value,
    isChecked: false,
  };
  todos.push(todo);
  setName();
  formInput.value = "";
  render(todos);
}

function deleteItemList() {
  todos.length = 0;
  setName();
  render(todos);
}

//работа с отдельной карточкой - чекбокс и удаление из списка дел

ul.addEventListener("click", (e) => {
  let tr = e.target;

  if (tr.tagName === "BUTTON" && tr.innerText === "✖") {
    console.log(todos);
    console.log(tr.closest("li").id);

    let delIndex = todos.findIndex(
      (el) => el.id === +tr.closest("li").getAttribute("id")
    );
    console.log(delIndex);
    todos.splice(delIndex, 1);
    console.log(todos);
    setName();
    render(todos);
    /*  let element = array.find(el, i) => el === 9; //ищет число 9, получает тру или фолс
   let newArray = array.filter((el, i) => i === array.indexOf(el)); */ //забрали только уникальные элементы, индекс которых равен их индексу по ИндексОф */
  } else if (tr.tagName === "INPUT" && tr.type === "checkbox") {
    if (tr.checked) {

      console.log(tr.value === 'checked');



      tr.closest("li").style.backgroundColor = "darkgrey";
      tr.closest("li").style.textDecoration = "line-through";
    } else {
      tr.closest("li").style.backgroundColor = "rgba(101, 81, 216, 0.1)";
      tr.closest("li").style.textDecoration = "none";
    }
  }
});

function render(arr) {
  ul.innerHTML = "";

  arr.forEach((el) => {
    let li = createEl("li", "card-item");
    li.style.backgroundColor = "rgba(101, 81, 216, 0.1)";
    li.id = el.id;

    let checkBtn = createEl("input", "custom-check-btn", null, "checkbox");
    let cardItemText = createEl("div", "card-item-text", el.text);
    let cardItemOptions = createEl("div", "card-item__options");
    let closeBtn = createEl("button", "card-delete-btn", "✖");
    let cardItemDate = createEl("div", "card-item__date", el.date);

    cardItemOptions.append(closeBtn, cardItemDate);
    li.append(checkBtn, cardItemText, cardItemOptions);
    ul.append(li);
  });
}

addBtn.addEventListener("click", addItem);
deleteBtn.addEventListener("click", deleteItemList);

//вложенность DOM элементов
root.append(container);
container.append(form);
form.append(formNav, ul);
formNav.append(deleteBtn, formInput, addBtn);
