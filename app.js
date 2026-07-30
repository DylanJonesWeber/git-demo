const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const showAllButton = document.querySelector('#show-all');
const showOpenButton = document.querySelector('#show-open');
const clearCompletedButton = document.querySelector('#clear-completed');

let tasks = [
  { text: 'Create a Git repository', completed: false },
  { text: 'Make a focused commit', completed: true },
];
let filter = 'all';

function renderTasks() {
  list.innerHTML = '';

  const visibleTasks = tasks.filter((task) => {
    return filter === 'all' || !task.completed;
  });

  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.textContent = task.text;
    if (task.completed) {
      item.classList.add('completed');
    }
    item.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
    });
    list.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
});

showAllButton.addEventListener('click', () => {
  filter = 'all';
  renderTasks();
});

showOpenButton.addEventListener('click', () => {
  filter = 'open';
  renderTasks();
});

clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

renderTasks();
