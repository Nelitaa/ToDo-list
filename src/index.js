import Tasks from './TasksClass.js';
import Task from './TaskClass.js';
import './style.css';

const tasksList = document.querySelector('.tasks-list');
const inputTask = document.querySelector('#input-task');

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
        const index = e.target.parentElement.getAttribute('index');
        const task = allTasks.tasks[index - 1];
        task.description = inputText.value;
        localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
        editTaskImg.style.display = 'block';
        editTaskImgTrash.style.display = 'none';
        inputText.setAttribute('disabled', 'true');
      }
    });
  }
  if (e.target.classList.contains('edit-task-img-trash')) {
    const taskLi = e.target.parentElement;
    let index = taskLi.getAttribute('index');
    index = parseInt(index, 10);
    allTasks.deleteTask(index);
    taskLi.remove();
    for (let i = 0; i < allTasks.tasks.length; i += 1) {
      allTasks.tasks[i].index = i + 1;
      tasksList.children[i].setAttribute('index', i + 1);
    }
    localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
  }
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const index = e.target.parentElement.parentElement.getAttribute('index');
    const task = allTasks.tasks[index - 1];
    task.completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('clear-all')) {
    allTasks.tasks = allTasks.tasks.filter((task) => task.completed === false);
    localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
    for (let i = 0; i < tasksList.children.length; i += 1) {
      while (tasksList.children[i].children[0].children[0].checked) {
        tasksList.children[i].remove();
      }
    }
  }
});