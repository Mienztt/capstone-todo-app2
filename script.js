// --- BAGIAN ATAS: GET REFERENCES, GLOBAL VARS ---

// Get references to HTML elements
const inputField = document.getElementById("task-input");
const addButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");
const taskDateInput = document.getElementById("task-date");
const taskTimeInput = document.getElementById("task-time"); // Perbaiki typo jika ada (document = document.)
const taskPriorityInput = document.getElementById("task-priority");
const filterAllBtn = document.getElementById("filter-all");
const filterActiveBtn = document.getElementById("filter-active");
const filterCompletedBtn = document.getElementById("filter-completed");
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");

// Global variables
let todos = []; // <<< Data todos sekarang akan diisi dari Firestore
let currentFilter = "all"; // Default filter state
let darkModeEnabled = false; // Untuk dark mode

// --- HELPER FUNCTIONS ---

// Helper function to get day of the week in Indonesian
function getDayOfWeek(dateString) {
  const daysOfTheWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const date = new Date(dateString);
  return daysOfTheWeek[date.getDay()];
}

// Function to set default value for date and time inputs
function setDefaultDateTimeInputs() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  taskDateInput.value = `${year}-${month}-${day}`;
  taskTimeInput.value = `${hours}:${minutes}`;
}

// Function to toggle dark mode
function toggleDarkMode() {
  darkModeEnabled = !darkModeEnabled;
  document.body.classList.toggle("dark-mode", darkModeEnabled);
  localStorage.setItem("darkModePreference", darkModeEnabled);
}

// Function to apply initial dark mode based on localStorage
function applyInitialDarkMode() {
  const savedPreference = localStorage.getItem("darkModePreference");
  if (savedPreference === "true") {
    darkModeEnabled = true;
    document.body.classList.add("dark-mode");
  } else {
    darkModeEnabled = false;
    document.body.classList.remove("dark-mode");
  }
}

// --- CORE FIRESTORE INTEGRATION ---

// Firestore Realtime Listener
// 'db' diasumsikan sudah diinisialisasi di index.html dan dapat diakses secara global
db.collection("todos")
  .orderBy("date", "desc")
  .orderBy("time", "desc")
  .onSnapshot((snapshot) => {
    try {
      // Kosongkan array todos lokal
      todos.length = 0; // Mengosongkan array sambil mempertahankan referensinya

      // Isi array todos lokal dengan data dari Firestore
      snapshot.docs.forEach((doc) => {
        const todoData = doc.data();
        todos.push({ id: doc.id, ...todoData }); // Tambahkan id dari Firestore
      });

      // Render ulang UI dengan data yang diperbarui dari Firestore
      displayTodos();
    } catch (error) {
      console.error("Error reading todos from Firestore:", error);
    }
  });

// Function to add a new task (MODIFIED FOR FIRESTORE)
function addTodo() {
  const newTodoText = inputField.value.trim();
  const selectedDate = taskDateInput.value;
  const selectedTime = taskTimeInput.value;
  const selectedPriority = taskPriorityInput.value;

  if (newTodoText && selectedDate && selectedTime) {
    const dayOfWeek = getDayOfWeek(selectedDate);

    const newTodo = {
      text: newTodoText,
      completed: false, // Default completed status
      date: selectedDate,
      time: selectedTime,
      dayOfWeek: dayOfWeek,
      priority: selectedPriority,
    };

    // Tambahkan dokumen baru ke Firestore
    db.collection("todos")
      .add(newTodo)
      .then(() => {
        console.log("Task added to Firestore successfully!");
      })
      .catch((error) => {
        console.error("Error adding task to Firestore:", error);
      });

    // Kosongkan input fields setelah menambahkan tugas
    inputField.value = "";
    taskPriorityInput.value = "Medium";
    setDefaultDateTimeInputs(); // Reset date/time inputs to current
  } else {
    alert("Please enter a task, date, and time.");
  }
}

// Function to edit a task (MODIFIED FOR FIRESTORE)
function editTodo(todoIdToEdit, currentText) {
  // Menerima ID Firestore & teks saat ini
  const li = document.querySelector(`li.todo-item[data-id="${todoIdToEdit}"]`);
  if (!li) return;

  const taskSpan = li.querySelector(".task-text .task-description");
  const taskTextContainer = li.querySelector(".task-text");

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");

  taskSpan.style.display = "none";
  taskTextContainer.appendChild(input);

  input.focus();

  const saveEdit = () => {
    const newTodoText = input.value.trim();
    if (newTodoText && newTodoText !== currentText) {
      db.collection("todos")
        .doc(todoIdToEdit)
        .update({ text: newTodoText })
        .then(() => console.log("Task updated in Firestore successfully!"))
        .catch((error) => console.error("Error updating task:", error));
    } else if (newTodoText === "") {
      if (
        confirm("Task text cannot be empty. Do you want to delete this task?")
      ) {
        deleteTodo(todoIdToEdit);
      } else {
        displayTodos();
      }
    } else {
      displayTodos();
    }
  };

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
  });
}

// Function to delete a task (MODIFIED FOR FIRESTORE)
function deleteTodo(todoIdToDelete) {
  // Menerima ID Firestore
  const todoItemElement = document.querySelector(
    `li.todo-item[data-id="${todoIdToDelete}"]`
  );

  if (todoItemElement) {
    todoItemElement.classList.add("task-fade-out"); // Terapkan fade-out

    setTimeout(() => {
      db.collection("todos")
        .doc(todoIdToDelete)
        .delete()
        .then(() => console.log("Task deleted from Firestore successfully!"))
        .catch((error) => console.error("Error deleting task:", error));
    }, 300); // Durasi delay harus cocok dengan durasi animasi CSS
  } else {
    // Fallback jika elemen tidak ditemukan di DOM, langsung hapus dari Firestore
    db.collection("todos")
      .doc(todoIdToDelete)
      .delete()
      .then(() => console.log("Task deleted from Firestore (fallback)!"))
      .catch((error) =>
        console.error("Error deleting task (fallback):", error)
      );
  }
}

// Function to display todos in UI (ini adalah fungsi displayTodos Anda yang sudah lengkap dan sekarang dipicu Firestore)
function displayTodos() {
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "all") {
      return true;
    } else if (currentFilter === "active") {
      return !todo.completed;
    } else if (currentFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.dataset.id = todo.id; // <<< PENTING: Menggunakan ID Firestore

    // Tambahkan kelas prioritas background
    if (todo.priority === "High") {
      li.classList.add("priority-bg-high");
    } else if (todo.priority === "Medium") {
      li.classList.add("priority-bg-medium");
    } else if (todo.priority === "Low") {
      li.classList.add("priority-bg-low");
    }

    // Tambahan untuk efek visual pada seluruh baris saat completed
    if (todo.completed) {
      li.classList.add("task-completed-visual");
    }

    // Checkbox container
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      // Update completed status di Firestore
      db.collection("todos")
        .doc(todo.id)
        .update({ completed: checkbox.checked })
        .then(() => console.log("Task completion updated in Firestore!"))
        .catch((error) => console.error("Error updating completion:", error));
    });
    checkboxContainer.appendChild(checkbox);
    li.appendChild(checkboxContainer);

    // Task text container (div.task-text)
    const taskTextContainer = document.createElement("div");
    taskTextContainer.classList.add("task-text");

    // Span untuk teks tugas utama
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = todo.text;
    taskTextSpan.classList.add("task-description");
    if (todo.completed) {
      taskTextSpan.classList.add("completed");
    }
    taskTextContainer.appendChild(taskTextSpan);

    // Elemen untuk Hari, Tanggal, dan Waktu
    const dateTimeContainer = document.createElement("div");
    dateTimeContainer.classList.add("task-datetime-container");

    const daySpan = document.createElement("span");
    daySpan.classList.add("task-day");
    daySpan.textContent = `${todo.dayOfWeek}`;
    dateTimeContainer.appendChild(daySpan);

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("task-date");
    dateSpan.textContent = ` (${todo.date})`;
    dateTimeContainer.appendChild(dateSpan);

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("task-time");
    timeSpan.textContent = ` ${todo.time}`;
    dateTimeContainer.appendChild(timeSpan);

    taskTextContainer.appendChild(dateTimeContainer);
    li.appendChild(taskTextContainer);

    // Action buttons container
    const actionButtonsDiv = document.createElement("div");
    actionButtonsDiv.classList.add("action-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      editTodo(todo.id, todo.text);
    });
    actionButtonsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTodo(todo.id);
    });
    actionButtonsDiv.appendChild(deleteButton);

    li.appendChild(actionButtonsDiv);
    todoList.appendChild(li);
  });
}
function setFilter(filterType) {
  currentFilter = filterType;
  filterAllBtn.classList.remove("active");
  filterActiveBtn.classList.remove("active");
  filterCompletedBtn.classList.remove("active");

  if (filterType === "all") {
    filterAllBtn.classList.add("active");
  } else if (filterType === "active") {
    filterActiveBtn.classList.add("active");
  } else if (filterType === "completed") {
    filterCompletedBtn.classList.add("active");
  }

  displayTodos();
}
// --- BAGIAN BAWAH: EVENT LISTENERS & PANGGILAN AWAL ---

// Event Listeners for filter buttons
filterAllBtn.addEventListener("click", () => setFilter("all"));
filterActiveBtn.addEventListener("click", () => setFilter("active"));
filterCompletedBtn.addEventListener("click", () => setFilter("completed"));

// Event listener for Add Button
addButton.addEventListener("click", addTodo);

// Event listener for Dark Mode Toggle
darkModeToggleBtn.addEventListener("click", toggleDarkMode);

// Panggilan awal untuk setup aplikasi
applyInitialDarkMode();
setDefaultDateTimeInputs();
setFilter("all"); // Panggil ini untuk set filter 'all' secara default dan tampilkan tugas
