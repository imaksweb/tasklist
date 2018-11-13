const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.querySelector('.collection');
const filter = document.getElementById('filter');
const clearBtn = document.querySelector('.clear-tasks');

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
}

loadEventListeners();

function addTask(e) {
  e.preventDefault();

  const inputValue = taskInput.value,
        li = document.createElement('li'),
        text = document.createElement('div'),
        link = document.createElement('a');

  taskInput.value = '';

  if (inputValue === '') alert('Please add task!'); // Нужно будет доработать

  li.className = 'collection__item';

  text.className = 'collection__item-text';
  text.textContent = inputValue;

  li.appendChild(text);

  link.className = 'delete-item';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
}

function removeTask(e) {
  const link = e.target.parentElement,
        listItem = link.parentElement;
  
  if (link.classList.contains('delete-item')) listItem.remove();
}