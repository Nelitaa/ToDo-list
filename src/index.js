/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import './style.css';

const tasksList = document.querySelector('.tasks-list');
const inputTask = document.querySelector('#input-task');

class Task {
  constructor(index, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}
class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  renderTasks() {
    this.tasks.forEach(this.renderTask);
  }

  renderTask(task) {
    const taskLi = document.createElement('li');
    taskLi.setAttribute('index', task.index);
    tasksList.appendChild(taskLi);

    const taskDiv = document.createElement('div');
    taskLi.appendChild(taskDiv);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    taskDiv.appendChild(checkbox);

    const inputText = document.createElement('input');
    inputText.value = task.description;
    inputText.className = 'input-text';
    inputText.setAttribute('disabled', 'true');
    taskDiv.appendChild(inputText);

    const editTaskImg = document.createElement('img');
    editTaskImg.className = 'edit-task-img';
    editTaskImg.src = 'https://drive.google.com/uc?export=download&id=1sPrm0H-RE7O346HqzOGXcqp1-lyE2xC_';
    taskLi.appendChild(editTaskImg);

    const editTaskImgTrash = document.createElement('img');
    editTaskImgTrash.className = 'edit-task-img-trash';
    editTaskImgTrash.style.display = 'none';
    editTaskImgTrash.src = 'https://drive.google.com/uc?export=download&id=1FQtxnRA9DqZVonm55uyTS5Ee-CfNj7RK';
    taskLi.appendChild(editTaskImgTrash);
  }

  deleteTask(index) {
    this.tasks.splice(index - 1, 1);
  }
}

const allTasks = new Tasks();
allTasks.renderTasks();

inputTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const newTask = new Task(allTasks.tasks.length + 1, inputTask.value);
    allTasks.addTask(newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
    allTasks.renderTask(newTask);
    inputTask.value = '';
  }
});

tasksList.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-task-img')) {
    const parentEl = e.target.parentElement;
    const inputText = parentEl.querySelector('.input-text');
    const editTaskImg = e.target;
    editTaskImg.style.display = 'none';
    const editTaskImgTrash = parentEl.querySelector('.edit-task-img-trash');
    editTaskImgTrash.style.display = 'block';
    inputText.removeAttribute('disabled');

    inputText.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        editTaskImg.style.display = 'block';
        editTaskImgTrash.style.display = 'none';
        inputText.setAttribute('disabled', 'true');
      }
    });

    tasksList.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-task-img-trash')) {
        const taskLi = e.target.parentElement;
        const index = taskLi.getAttribute('index');
        allTasks.deleteTask(index);
        localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
        e.target.parentElement.remove();
      }
    });
  }
});