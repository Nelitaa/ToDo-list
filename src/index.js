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

  if (e.target.classList.contains('checkbox')) {
    const index = e.target.parentElement.parentElement.getAttribute('index');
    const task = allTasks.tasks[index - 1];
    const inputCheckbox = e.target;
    inputCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        task.completed = true;
      } else {
        task.completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('clear-all')) {
    for (let i = 0; i < allTasks.tasks.length; i += 1) {
      if (allTasks.tasks[i].completed === true) {
        allTasks.deleteTask(i + 1);
        tasksList.children[i].remove();
        i -= 1;
        localStorage.setItem('tasks', JSON.stringify(allTasks.tasks));
      }
    }
  }
});