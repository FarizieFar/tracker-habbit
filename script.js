const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const taskCard = document.getElementById("taskCard");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

function renderTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    taskList.innerHTML = `<p class="text-gray-500 text-center">Belum ada tugas ✨</p>`;
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `flex justify-between items-center p-3 rounded-xl border shadow-sm transition ${
      task.completed ? "bg-green-100 border-green-300" : "bg-white border-gray-200"
    }`;

    const span = document.createElement("span");
    span.className = `cursor-pointer flex items-center gap-2 text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`;
    span.innerHTML = `<i data-lucide="check-circle" class="${task.completed ? 'text-green-500' : 'text-gray-400'}"></i> ${task.text}`;
    span.addEventListener("click", () => toggleComplete(task.id));

    const delBtn = document.createElement("button");
    delBtn.className = "text-red-500 hover:text-red-600";
    delBtn.innerHTML = `<i data-lucide="trash-2"></i>`;
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  lucide.createIcons();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleComplete(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  applyTheme();
}

function applyTheme() {
  if (darkMode) {
    document.body.classList.remove("from-blue-500", "to-indigo-600");
    document.body.classList.add("from-gray-900", "to-gray-800");
    taskCard.classList.add("bg-gray-800", "text-white");
    taskCard.classList.remove("bg-white");
    themeToggle.innerHTML = `<i data-lucide="sun"></i>`;
  } else {
    document.body.classList.remove("from-gray-900", "to-gray-800");
    document.body.classList.add("from-blue-500", "to-indigo-600");
    taskCard.classList.remove("bg-gray-800", "text-white");
    taskCard.classList.add("bg-white");
    themeToggle.innerHTML = `<i data-lucide="moon"></i>`;
  }
  lucide.createIcons();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
themeToggle.addEventListener("click", toggleTheme);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Inisialisasi
applyTheme();
renderTasks();
