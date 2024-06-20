const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
loadTasks();

// Add new task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

// Delete task
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const taskItem = event.target.closest('.list-group-item');
    const taskText = taskItem.textContent.trim().slice(0, -6);
    deleteTask(taskText);
    saveTasks();
  }
});

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task);
  });
}

// Add a new task to the list
function addTask(taskText) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  taskItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
  deleteButton.textContent = 'Delete';

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

// Delete a task from the list
function deleteTask(taskText) {
  const taskItems = document.querySelectorAll('.list-group-item');
  taskItems.forEach(item => {
    if (item.textContent.trim().slice(0, -6) === taskText) {
      item.remove();
    }
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = document.querySelectorAll('.list-group-item');
  const taskTexts = Array.from(tasks).map(task => task.textContent.trim().slice(0, -6));
  localStorage.setItem('tasks', JSON.stringify(taskTexts));
}