document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") addTask();
    });
});


function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();  // Fixed typo

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("taskList");  // Fixed ID reference
    let li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);  // Fixed incorrect function call
    saveTasks();
    taskInput.value = "";  // Fixed incorrect variable reference
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.textContent.replace("X", "").trim(),
            completed: li.classList.contains("completed"),
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));  // Fixed misplaced bracket
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task.text} 
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        document.getElementById("taskList").appendChild(li);
    });
}
// Call `loadTasks` on page load
document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("darkModeToggle").addEventListener("change",function () {
    document.body.classList.toggle("dark-mode")
});