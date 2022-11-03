import './style.css';

const tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete T Do list project', completed: false, index: 2 },
];
const tasksList = document.querySelector('.tasks-list');

const renderOldTasks = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    const task = document.createElement('li');
    task.textContent = `\u00a0  \u00a0 \u00a0 ${tasks[i].description}`;
    tasksList.appendChild(task);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = tasks[i].completed;
    task.appendChild(checkbox);

    const move = document.createElement('img');
    move.src = 'https://drive.google.com/uc?export=download&id=1sPrm0H-RE7O346HqzOGXcqp1-lyE2xC_';
    task.appendChild(move);
  }
};

renderOldTasks();