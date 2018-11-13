const form = document.getElementById('task-form'),
      taskInput = document.getElementById('task'),
      taskList = document.querySelector('.collection'),
      filter = document.getElementById('filter'),
      clearBtn = document.querySelector('.clear-tasks'),
      tasksCard = document.querySelector('.card__action');


function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

loadEventListeners();

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
      renderTask(task);
    })
  }
}

function addTask(e) {
  e.preventDefault();

  const inputValue = taskInput.value;

  taskInput.value = '';

  if (inputValue === '') {
    alert('Please add task!'); // Нужно будет доработать
  } else {
    renderTask(inputValue);
    addTaskToLocalStorage(inputValue);
  }
}

function addTaskToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(value) {
  const li = document.createElement('li'),
        text = document.createElement('div'),
        link = document.createElement('a');

  li.className = 'collection__item';

  text.className = 'collection__item-text';
  text.textContent = value;

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
  removeTaskFromLocaleStorage(listItem);
}

function removeTaskFromLocaleStorage(taskItem) {
  let tasks;

  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  e.preventDefault();

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase(),
        itemLists = document.querySelectorAll('.collection__item');
  
  itemLists.forEach(item => {
    const taskText = item.firstChild.textContent.toLowerCase();
    
    if (taskText.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}