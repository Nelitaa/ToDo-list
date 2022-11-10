import Tasks from './TasksClass.js';
import Task from './TaskClass.js';
import './style.css';

const tasksList = document.querySelector('.tasks-list');
const inputTask = document.querySelector('#input-task');

const allTasks = new Tasks();
allTasks.renderTasks();

inputTask.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const newTask = new Task(allTasks.tasks.length + 1, inputTask.value);
    allTasks.addTask(newTask);
    allTasks.updateLocalStorage();
    allTasks.renderTask(newTask);
    inputTask.value = '';
  }
});

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-task-img')) {
    event.preventDefault();
    const parentEl = event.target.parentElement;
    const inputText = parentEl.querySelector('.input-text');
    const editTaskImg = event.target;
    editTaskImg.style.display = 'none';
    const editTaskImgTrash = parentEl.querySelector('.edit-task-img-trash');
    editTaskImgTrash.style.display = 'block';
    inputText.removeAttribute('disabled');

    inputText.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const index = event.target.parentElement.parentElement.getAttribute('index');
        const description = inputText.value;
        allTasks.updateTask(index, description);
        allTasks.updateLocalStorage();
        editTaskImg.style.display = 'block';
        editTaskImgTrash.style.display = 'none';
        inputText.setAttribute('disabled', 'true');
      }
    });
  }
  if (event.target.classList.contains('edit-task-img-trash')) {
    const taskLi = event.target.parentElement;
    let index = taskLi.getAttribute('index');
    index = parseInt(index, 10);
    allTasks.deleteTask(index);
    taskLi.remove();
    for (let i = 0; i < allTasks.tasks.length; i += 1) {
      allTasks.tasks[i].index = i + 1;
      tasksList.children[i].setAttribute('index', i + 1);
    }
    allTasks.updateLocalStorage();
  }
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = event.target.parentElement.parentElement.getAttribute('index');
      const completed = event.target.checked;
      allTasks.updateCompleted(index, completed);
      allTasks.updateLocalStorage();
    });
  });
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('clear-all')) {
    allTasks.deleteAllTasks();
    allTasks.updateLocalStorage();
    for (let i = 0; i < tasksList.children.length; i += 1) {
      while (tasksList.children[i].children[0].children[0].checked) {
        tasksList.children[i].remove();
      }
    }
  }
});