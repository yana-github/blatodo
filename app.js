
const root = document.getElementById('root');

//создать все дом-элементы
function createEl(el) {
  return document.createElement(el)
}

//добавить основную форму и список для хранения задач
let container = createEl('div');
root.classList.add('container');

let form = createEl('div', 'form')
container.classList.add('form');

let formNav = createEl('div');
formNav.classList.add('form-nav');

let deleteBtn = createEl('button');
deleteBtn.textContent = 'Delete All';
deleteBtn.classList.add('prime-btn');

let formInput = createEl('input');
formInput.placeholder = 'Enter to do...';
formInput.classList.add('form-input');

let addBtn = createEl('button');
addBtn.textContent = 'Add';
addBtn.classList.add('prime-btn');


let ul = createEl('ul');
ul.classList.add('card-list');

//повесить прослушку на список, по клику на Х внутри задачи, по чекбоксу - меняем цвет на серый и зачеркиваем текст, если снять чекбокс - вернуть как было

ul.addEventListener('click', (e) => {
  let tr = e.target;

  if (tr.tagName === 'BUTTON' && tr.innerText === '✖') {
    let delId = tr.closest('li').id;
    console.log(delId);

    tr.closest('li').remove();
    removeItem(delId);
    console.log(typeof delId)

  } else if (tr.tagName === 'INPUT' && tr.type === 'checkbox') {
    if (tr.checked) {
      tr.closest('li').style.backgroundColor = 'darkgrey';
      tr.closest('li').style.textDecoration = 'line-through';
      console.log(!!(tr.value = 'checked'));
    } else {
      tr.closest('li').style.backgroundColor = 'rgba(101, 81, 216, 0.1)';
      tr.closest('li').style.textDecoration = 'none';
      console.log(!!(tr.value != 'checked'));
    }
  }
});



function clearStorage() {
  localStorage.clear();
}


function removeItem(delId) {
  let newTodos = JSON.parse(localStorage.getItem('todos')).filter(item => item.id !== delId);
console.log(item);
}


function getDate() {
  let d = new Date();
  return `${d.getDate()}.${('0' + (d.getMonth() + 1))}.${d.getFullYear()}`;
}

function getText() {
  // asdsadsad
  let itemText = formInput.value;
  return itemText;
}
//need commit

function deleteItemList(e) {




  
  ul.innerHTML = '';
  clearStorage();
}


//need help blya



function renderItem (item) { 
  // lablalbllalalsdl
  let checkBtn = createEl('input');
  checkBtn.type = 'checkbox';
  checkBtn.classList.add('custom-check-btn');

  let cardItemText = createEl('div');
  cardItemText.textContent = item.text;
  cardItemText.classList.add('card-item-text');

  let cardItemOptions = createEl('div');
  cardItemOptions.classList.add('card-item__options');

  let closeBtn = createEl('button');
  closeBtn.innerText = '✖';
  closeBtn.classList.add('card-delete-btn');

  let cardItemDate = createEl('div');
  cardItemDate.innerText = getDate();
  cardItemDate.classList.add('card-item__date');

  let li = createEl('li');
  li.classList.add('card-item');
  li.id = item.id;
  li.style.backgroundColor = 'rgba(101, 81, 216, 0.1)';

  cardItemOptions.append(closeBtn, cardItemDate);
  li.append(checkBtn, cardItemText, cardItemOptions);
  ul.append(li); // вернули измененную ли-шку в список
};

const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos. forEach((el) => { 
  renderItem(el)
});



function addItem(e) {
  if (!formInput.value) { 
    return;
  } else {

    const todo = {
      id: randomInteger(1,50),
      date: getDate(),
      text: formInput.value,
      isChecked: '',
    };

    renderItem(todo);

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //очистить поле ввода значений после добавления задачи
  formInput.value = '';
};







let randomId = randomInteger(1,50);
console.log(randomId);


function randomInteger(min, max) {
  return Math.round(Math.random(min, max) * (max - min) + min);
}



// получить из локал сторейдж [] 
// функция, которая рендерит элемент 
// вызвать функцию которая рендерит элемент для каждого обьекта в массиве 
// как-то повесить на лишку айдишку 
// когда элемент добавляется нужно просто обновить локал сторейдж и ничего не рендерить самому сразу же 
// как-то повесить на локал сторейдж листенер чтобы он перерендеревал список по обновлению содержания 
// --- 
// чекбокс 
// удаление 



/////////////////////////////////////////////////////////////РЕШЕНИЕ, которое не работает, как рендерить форму заполненную через ЛС////////////////////////
/* const formFields = form.elements; */


//способ сохранения данных из инпутов формы с чекбоксом. у моих инпутов нет контекста This??
/* function changeHandler() {
  if (this.type !== 'checkbox') {
    console.log(this.name, this.value);
    localStorage.setItem(this.name, this.value);
  } else {
    console.log(this.name, this.checked);
    localStorage.setItem(this.name, this.checked);
  }
} */

//вызывается при загрузке страницы, проверяет содержимое ЛС
/* function checkStorage() {
  for (let i = 0; i < formInput.length; i++) {
    if (formFields[i].type !== 'submit') {
      if (formFields[i].type === 'checked') {
        formFields[i].cheked = localStorage.getItem(formInput.name)
      } else {
        formFields[i].value = localStorage.getItem(formInput.name)
      }
    }
  }
  attachEvents();
} */

////повесили слушателя на все инпуты сразу, при изменениях должны храниться инпуты - не работает тоже
/* function attachEvents() {
  for (let i = 0; i < formFields.lenght; i++) {
    formFields[i].addEventListener('change'), changeHandler()
  }
} */

///////////////////////////////////////////////////////////////////////Это решение номер три, тоже у меня - не работает. С рендерингом после сохранения в ЛС
/* 
function displayItems(todo, cardsList) {

  cardsList.innerHTML = todos.map((todo, index) => {
    return `<li>
    <input type='checkbox' id='item${index}' data-index='${index}' ${todo.checked ? 'checked' : ''}/>
    </li>`;
  }).join('');
}
 */


/* function toggleClick(e) {
const element = e.target.dataset.index;
todos[element].checked = !todos[element].checked;
localStorage.setItem('todos', JSON.stringify(todos));
displayItems(todo, todos);
}
 */

//прослушки мои и связанные функции

addBtn.addEventListener('click', addItem);
deleteBtn.addEventListener('click', deleteItemList);

///мое по ДОМ, структура страницы в html 
root.append(container);
container.append(form);
form.append(formNav, ul);
formNav.append(deleteBtn, formInput, addBtn);