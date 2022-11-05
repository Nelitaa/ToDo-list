export default class Tasks {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  renderTasks() {
    this.tasks.forEach(this.renderTask);
  }

  // eslint-disable-next-line class-methods-use-this
  renderTask(task) {
    const tasksList = document.querySelector('.tasks-list');

    const taskLi = document.createElement('li');
    taskLi.setAttribute('index', task.index);
    taskLi.className = 'task-item';
    tasksList.appendChild(taskLi);

    const taskDiv = document.createElement('div');
    taskDiv.className = 'checkbox-div';
    taskLi.appendChild(taskDiv);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
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