import Tasks from './TasksClass.js';

describe('Tasks', () => {
  const tasks = new Tasks();

  test('should add a task', () => {
    tasks.addTask({ index: 1, description: 'test', completed: false });
    expect(tasks.tasks).toHaveLength(1);
  });
});