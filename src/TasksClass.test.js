import Tasks from './TasksClass.js';

describe('Add new task', () => {
  test('A new object is created in the tasks array', () => {
    const tasks = new Tasks();
    tasks.addTask({ index: 1, description: 'Finish the second capstone', completed: false });
    expect(tasks.tasks).toHaveLength(1);
  });
});

describe('Remove task', () => {
  test('The task is removed from the tasks array', () => {
    const tasks = new Tasks();
    tasks.addTask({ index: 1, description: 'Finish the second capstone', completed: false });
    tasks.deleteTask(1);
    expect(tasks.tasks).toHaveLength(0);
  });
});