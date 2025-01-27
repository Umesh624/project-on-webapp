let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            time: new Date().toLocaleString()
        };
        tasks.push(task);
        taskInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? "completed" : "";
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <span class="task-time">${task.time}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        if (task.completed) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    task.time = new Date().toLocaleString(); // Update time on completion/undo
    displayTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newTaskText = prompt("Edit your task:", task.text);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.text = newTaskText.trim();
        task.time = new Date().toLocaleString(); // Update time on edit
        displayTasks();
    }
}