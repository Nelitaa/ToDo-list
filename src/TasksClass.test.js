import Tasks from './TasksClass.js';

describe('Tasks', () => {
  const tasks = new Tasks();

  test('should add a task', () => {
    tasks.addTask({ index: 1, description: 'test', completed: false });
    expect(tasks.tasks).toHaveLength(1);
  });
  test('should remove a task', () => {
    tasks.deleteTask(1);
    expect(tasks.tasks).toHaveLength(0);
  });
  test('should update a task', () => {
    tasks.addTask({ index: 1, description: 'test', completed: false });
    tasks.updateTask(1, 'test2');
    expect(tasks.tasks[0].description).toBe('test2');
  });
  test('should update the completed status of a task', () => {
    tasks.updateCompleted(1, true);
    expect(tasks.tasks[0].completed).toBe(true);
  });
});
