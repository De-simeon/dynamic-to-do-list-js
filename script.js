document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Remove one occurrence of a task from localStorage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = storedTasks.indexOf(taskText);
    if (index > -1) {
      storedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Create DOM element for a task and optionally save it to localStorage
  function addTask(taskTextParam, save = true) {
    const taskText = (typeof taskTextParam === 'string')
      ? taskTextParam.trim()
      : taskInput.value.trim();

    if (taskText === '') {
      alert('Kindly enter a task');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove button (using className to avoid classList.add)
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.className = 'remove-btn';

    // Remove from DOM and Local Storage when clicked
    button.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(button);
    taskList.appendChild(li);

    // Clear input if this was added from the UI
    if (!taskTextParam) taskInput.value = '';

    // Persist
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Load saved tasks and render them (don't save again when rendering)
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  // Initial load
  loadTasks();
});
