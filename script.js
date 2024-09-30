document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const clearBtn = document.getElementById('clear-btn');
    const allBtn = document.getElementById('all-btn');
    const completedBtn = document.getElementById('completed-btn');
    const pendingBtn = document.getElementById('pending-btn');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    addBtn.addEventListener('click', () => {
      const taskText = input.value.trim();
      if (taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        saveTasks();
        input.value = '';
        renderTasks(tasks);
      }
    });
  
    todoList.addEventListener('click', (e) => {
      const index = e.target.parentElement.dataset.index;
      if (e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(tasks);
      } else if (e.target.classList.contains('edit-btn')) {
        const newTask = prompt("Edit task", tasks[index].text);
        if (newTask) {
          tasks[index].text = newTask;
          saveTasks();
          renderTasks(tasks);
        }
      } else if (e.target.classList.contains('todo-text')) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(tasks);
      }
    });
  
    allBtn.addEventListener('click', () => renderTasks(tasks));
    completedBtn.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));
    pendingBtn.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));
  
    clearBtn.addEventListener('click', () => {
      tasks = [];
      saveTasks();
      renderTasks(tasks);
    });
  
    function renderTasks(tasksToRender) {
      todoList.innerHTML = '';
      tasksToRender.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        listItem.dataset.index = index;
        listItem.innerHTML = `
          <span class="todo-text ${task.completed ? 'complete' : ''}">${task.text}</span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(listItem);
      });
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    renderTasks(tasks);
  });
  
