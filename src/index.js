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

  renderTask(task) {
    const taskLi = document.createElement('li');
    taskLi.textContent = `\u00a0  \u00a0 \u00a0 ${task.description}`;
    tasksList.appendChild(taskLi);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    taskLi.appendChild(checkbox);

    const move = document.createElement('img');
    move.src = 'https://drive.google.com/uc?export=download&id=1sPrm0H-RE7O346HqzOGXcqp1-lyE2xC_';
    taskLi.appendChild(move);
  }
}
const init = () => {
  const allTasks = new Tasks();
  allTasks.tasks.forEach((task) => allTasks.renderTask(task));

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
  };

init();