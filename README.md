# Aplikasi To-Do List Canggih dengan Integrasi Firebase & Bantuan AI

## Deskripsi

Aplikasi To-Do List modern, interaktif, dan responsif penuh yang dirancang untuk membantu pengguna mengelola tugas harian mereka secara efisien. Aplikasi ini menawarkan fungsionalitas CRUD (Create, Read, Update, Delete) lengkap untuk tugas, dengan semua data disimpan secara persisten di **Firebase Firestore**, memungkinkan sinkronisasi _real-time_ antar perangkat. Aplikasi ini memiliki UI _checklist_ ala _spreadsheet_ yang bersih untuk manajemen tugas intuitif, bersama dengan fitur-fitur canggih seperti prioritas tugas, pemfilteran berdasarkan status, dan mode gelap.

**Proyek ini dikembangkan sebagai proyek Capstone untuk HACKTIV8 Student Developer Initiative, dengan bantuan signifikan dari model AI IBM Granite untuk pembuatan dan optimasi kode.**

## Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend & Database:** Firebase (Firestore) untuk penyimpanan dan manajemen data _cloud_ _real-time_.
- **Alat AI:** Model IBM Granite (diakses melalui Google Colab) untuk mempercepat pengembangan, menghasilkan _snippet_ kode kompleks, dan meningkatkan UI/UX.
- **Deployment:** Netlify (atau Vercel/Firebase Hosting,)

## Fitur

- **Penyimpanan Data Cloud:** Tugas disimpan dengan aman di Firebase Firestore, memungkinkan sinkronisasi _real-time_ di berbagai perangkat.
- **Tambah Tugas:** Tambah tugas baru dengan cepat melalui _input field_ yang bersih dengan tanggal, waktu, dan prioritas yang dapat dipilih.
- **Lihat Tugas:** Tampilkan semua tugas saat ini dalam format _checklist_ ala _spreadsheet_ yang terorganisir dengan detail hari, tanggal, dan waktu.
- **Tandai Selesai:** Alihkan status penyelesaian tugas menggunakan _checkbox_ khusus, dengan efek coret visual.
- **Edit Tugas:** Modifikasi deskripsi tugas yang ada langsung di daftar.
- **Hapus Tugas:** Hapus tugas yang selesai atau tidak diinginkan dengan animasi _fade-out_ yang halus.
- **Prioritas:** Indikasi visual prioritas tugas (Tinggi, Sedang, Rendah) melalui warna _background_ yang berbeda untuk _list item_.
- **Pemfilteran:** Filter tugas berdasarkan status (Semua, Aktif, Selesai).
- **Desain Responsif:** Tata letak yang dioptimalkan untuk tampilan yang mulus di berbagai perangkat (desktop, tablet, seluler).
- **Mode Gelap:** Tema gelap yang dapat dialihkan pengguna untuk kenyamanan visual yang ditingkatkan dan personalisasi, dengan preferensi disimpan di firebase.
- **Animasi:** Animasi _fade-out_ halus untuk tugas yang dihapus, dan transisi halus untuk perubahan UI (misalnya, warna prioritas, status penyelesaian).
- **UI/UX yang Ditingkatkan:** Desain minimalis modern dengan _header_ kolom yang jelas dan interaksi intuitif.

## Instruksi Setup

Untuk menjalankan proyek ini secara lokal, Anda memerlukan proyek Firebase.

1.  **Setup Proyek Firebase:**
    - Buka [Firebase Console](https://console.firebase.google.com/).
    - Buat proyek baru (misalnya, `capstone-todo-app-sdi`).
    - Tambahkan aplikasi web ke proyek Anda.
    - Buka "Build" -> "Firestore Database" dan klik "Create database", lalu pilih "Start in test mode" (untuk tujuan pengembangan).
    - **Penting:** Agar _query_ berfungsi, Anda perlu membuat indeks Firestore. Periksa konsol _browser_ Anda setelah menjalankan aplikasi; Firebase akan memberikan _link_ langsung untuk membuat indeks yang diperlukan untuk `orderBy('date', 'desc').orderBy('time', 'desc')`. Klik _link_ itu dan buat indeks.
    - Salin konfigurasi proyek Firebase Anda (dari "Project settings" -> "Your apps").
2.  **Clone repositori:**
    ```bash
    git clone [https://github.com/NamaPenggunaGitHubAnda/capstone-todo-app.git](https://github.com/NamaPenggunaGitHubAnda/capstone-todo-app.git)
    ```
3.  **Navigasi ke direktori proyek:**
    ```bash
    cd capstone-todo-app
    ```
4.  **Integrasikan Konfigurasi Firebase:**
    - Buka `index.html`.
    - Temukan tag `<script>` tempat `firebase.initializeApp(firebaseConfig);` dipanggil.
    - **Ganti _placeholder_ objek `firebaseConfig`** dengan konfigurasi sebenarnya yang Anda salin dari Firebase Console Anda.
5.  **Buka dengan Live Server:**
    Jika Anda memiliki ekstensi "Live Server" yang terinstal di VS Code, klik kanan pada `index.html` dan pilih "Open with Live Server". Jika tidak, cukup buka `index.html` langsung di _web browser_ Anda.

        ## Penjelasan Dukungan AI

    IBM Granite, sebagai AI programmer asisten, telah berkontribusi signifikan dalam pengembangan aplikasi To-Do List ini. Peran AI ini memungkinkan proses pengembangan yang lebih cepat, efisien, dan menghasilkan kode dengan kualitas yang lebih tinggi, terutama dalam mengimplementasikan fitur-fitur kompleks dan mengoptimalkan _user experience_.

### 1. Setup Proyek Awal & Boilerplate (Struktur HTML, JS)

Granite membantu dalam menghasilkan kerangka dasar proyek, termasuk struktur HTML awal (`index.html`) dengan elemen-elemen penting seperti _header_, bagian _input_ tugas, dan _container_ daftar tugas (`<ul>`). AI juga membantu dalam menyiapkan variabel JavaScript awal dan memastikan _file-linking_ (CSS & JS) dilakukan dengan tepat. Ini mempercepat fase _bootstrapping_ proyek secara signifikan.

### 2. Implementasi Logika CRUD Inti (JavaScript)

Granite berperan krusial dalam membangun fungsionalitas CRUD (Create, Read, Update, Delete) inti aplikasi, terutama dalam transisi ke penyimpanan data _cloud_ real-time dengan Firebase Firestore.

- **Migrasi Data ke Firebase Firestore:** AI memberikan panduan dan cuplikan kode untuk mengganti operasi `localStorage` dengan Firebase Firestore. Ini termasuk setup _real-time listener_ (`db.collection().onSnapshot`) yang secara otomatis memperbarui UI setiap kali ada perubahan data di _database_, serta operasi `add`, `update`, dan `delete` dokumen Firestore (`db.collection().add/doc().update/doc().delete`).
  - **Contoh Cuplikan Kode JavaScript**
    ```javascript
      db.collection('todos').orderBy('date', 'desc').orderBy('time', 'desc').onSnapshot((snapshot) => { ... });
    ```
- **Fungsi `addTodo()`:** AI membantu merumuskan fungsi `addTodo` yang kompleks, yang tidak hanya menambahkan teks tugas, tetapi juga detail tanggal, waktu, hari dalam seminggu, dan prioritas yang diambil dari input pengguna, lalu menyimpannya ke Firestore. \* **Contoh Cuplikan Kode JavaScript **

  ```javascript
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
  ```

- **Fungsi `displayTodos()`:** Ini adalah salah satu fungsi terkompleks. AI membantu menyusun fungsi `displayTodos` agar dapat _me-render_ tugas dari array `todos` yang diterima dari Firestore. Setiap tugas ditampilkan dengan _checkbox_ interaktif, teks tugas, detail hari/tanggal/waktu, dan tombol _Edit/Delete_, semua dalam tata letak _spreadsheet_ yang responsif. \* **Contoh Cuplikan Kode JavaScript **

  ```javascript
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
  ```

- **Fungsi `editTodo()` dan `deleteTodo()`:** AI membantu dalam mengimplementasikan logika untuk mengedit dan menghapus tugas secara _real-time_ melalui Firestore, termasuk penanganan _ID_ dokumen Firestore dan efek animasi _fade-out_ saat penghapusan.

### 3. Optimalisasi Estetika & Fungsionalitas UI/UX (Interaksi CSS & JS)

Granite berperan penting dalam meningkatkan desain visual dan _user experience_ aplikasi.

- **Tata Letak _Checklist_ ala _Spreadsheet_:** AI membantu dalam transformasi tata letak dasar menjadi tampilan _checklist_ ala _spreadsheet_ yang modern dan rapi, lengkap dengan _header_ kolom yang sejajar (`CHECKLIST`, `LIST KEGIATAN`, `AKSI`). \* **Contoh Cuplikan Kode CSS (Anda bisa tempel di sini bagian `.column-headers` dan `.todo-item` Anda):**
  ```css
  column-headers {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ccc;
    background-color: #f9f9f9;
    padding: 10px 0px;
    margin-bottom: 5px;
    font-size: 1.1em;
  }
  ```

.header-cell {
padding: 5px 0;
text-align: center; /
font-weight: bold;
color: #555;
box-sizing: border-box;
}

.checklist {
flex: 0 0 40px;
text-align: center;
padding: 5px 0;
}

.list-activity {
flex-grow: 1;
font-weight: bold;
text-align: center;
padding: 5px 10px;
color: #555;
font-size: 1em;
}

.actions {
flex: 0 0 120px;
text-align: center;
padding: 5px 10px;
}

.todo-list {
list-style-type: none;
padding: 0;
margin: 0;
}

.todo-item {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 12px 0px;
border-bottom: 1px solid #eee;
transition: background-color 0.2s ease, box-shadow 0.2s ease;
position: relative;
}

.todo-item:last-child {
border-bottom: none;
}

.todo-item:hover {
background-color: rgba(245, 245, 245, 0.7);
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.checkbox-container {
flex: 0 0 40px;
display: flex;
justify-content: center;
align-items: center;
padding: 0 0;
box-sizing: border-box;
}

.checkbox-container input[type="checkbox"] {
transform: scale(1.3);
cursor: pointer;
}

.task-text {
flex-grow: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0 10px; /
box-sizing: border-box;
margin-left: 80px;
}

.task-description {
font-size: 1.15em;
font-weight: bold;
color: #333;
display: block;
margin-bottom: 2px;
line-height: 1.2;
text-align: center;
}
/_ ..column-headers {
display: flex;
align-items: center;
border-bottom: 2px solid #ccc;
background-color: #f9f9f9;
padding: 10px 0px;
margin-bottom: 5px;
font-size: 1.1em;
} _/
/_ .todo-item {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 12px 0px; /* <<< DIUBAH: Padding horizontal di sini menjadi 0 */
border-bottom: 1px solid #eee;
/* background-color akan ditimpa oleh kelas prioritas */
transition: background-color 0.2s ease, box-shadow 0.2s ease;
position: relative;
} _/
/_ .checkbox-container {
flex: 0 0 40px;
display: flex;
justify-content: center;
align-items: center;
padding: 0 0;
box-sizing: border-box;
} _/
/_ .task-text {
flex-grow: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0 10px;
box-sizing: border-box;
margin-left: 80px;
}
} _/
/_ .actions {
flex: 0 0 120px;
text-align: center;
padding: 5px 10px;
} _/

```
- **Styling Input & Tombol:** AI menyediakan _styling_ yang konsisten dan menarik untuk _input field_ (teks, tanggal, waktu, pilihan prioritas) dan tombol-tombol aksi, memastikan keselarasan visual dalam desain _flexbox_ yang responsif.
- **Indikasi Prioritas Visual:** Daripada hanya teks, AI membantu menerapkan indikasi visual prioritas tugas melalui warna _background_ yang berbeda pada setiap _list item_ (merah muda untuk 'High', kuning muda untuk 'Medium', hijau muda untuk 'Low'), membuat daftar lebih informatif sekilas.
- **Penyelesaian Tugas dengan _Checkbox_:** AI memandu implementasi _checkbox_ khusus untuk menandai tugas selesai, lengkap dengan efek coretan visual dan pembaruan status di Firestore.
- **Desain Responsif Penuh:** Melalui _media query_ yang dihasilkan AI, aplikasi secara otomatis menyesuaikan tata letaknya untuk tampilan yang optimal di berbagai ukuran perangkat, dari _mobile_ hingga _desktop_.
- **Mode Gelap:** AI menyediakan kode lengkap untuk fitur mode gelap, termasuk _toggle_ di UI dan penyimpanan preferensi pengguna di _local storage_.
- **Animasi Halus:** Untuk meningkatkan interaktivitas, AI membantu menambahkan animasi _fade-out_ halus saat tugas dihapus, serta transisi mulus untuk perubahan UI seperti warna prioritas atau status penyelesaian.

### 4. Debugging & Pemecahan Masalah

Selama pengembangan, AI terbukti menjadi alat _debugging_ dan pemecah masalah yang sangat efektif. AI membantu mengidentifikasi dan menyediakan solusi untuk berbagai _error_ JavaScript (seperti `SyntaxError`, `ReferenceError: setFilter is not defined`, `TypeError: Cannot read properties of undefined`, masalah transisi `localStorage` ke Firestore) dan _error_ CSS (masalah _alignment_ Flexbox, duplikasi kode). Bantuan AI dalam diagnostik dan perbaikan ini menghemat waktu pengembangan yang signifikan.
```
