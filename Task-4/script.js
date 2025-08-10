const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const details = document.createElement("div");
        details.classList.add("task-details");

        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) text.style.textDecoration = "line-through";

        const time = document.createElement("span");
        time.classList.add("task-time");
        time.textContent = task.time ? new Date(task.time).toLocaleString() : "";

        const badge = document.createElement("span");
        badge.classList.add("badge", task.completed ? "completed" : "pending");
        badge.textContent = task.completed ? "Completed" : "Pending";

        details.appendChild(text);
        details.appendChild(time);
        details.appendChild(badge);

        const btns = document.createElement("div");
        btns.classList.add("buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit Task:", task.text);
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        btns.appendChild(completeBtn);
        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn);

        li.appendChild(details);
        li.appendChild(btns);

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return alert("Please enter a task!");
    const timeValue = taskTime.value;

    tasks.push({ text, time: timeValue, completed: false });
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskTime.value = "";
});

renderTasks();
