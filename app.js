document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (taskTitle.trim() === "") {
        alert("Task title cannot be empty");
        return;
    }

    const task = {
        title: taskTitle,
        description: taskDescription,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);

    saveTasks(tasks);
    loadTasks();
    clearInputFields();
}

function loadTasks() {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <span>${task.title}</span>
            <span>
                <button onclick="toggleTask(${index})">Toggle</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </span>
        `;

        tasksContainer.appendChild(taskElement);
    });
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function editTask(index) {
    let tasks = getTasks();
    const newTitle = prompt("Enter new title", tasks[index].title);
    if (newTitle !== null) {
        tasks[index].title = newTitle;
        saveTasks(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        let tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    }
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    const tasksData = localStorage.getItem("tasks");
    return tasksData ? JSON.parse(tasksData) : [];
}

function clearInputFields() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
}
