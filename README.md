# Lumora

## Deskripsi Sistem

Lumora adalah platform pendamping belajar berbasis web dan mobile yang dirancang untuk membantu mahasiswa dan pelajar mengelola proses pembelajaran mandiri (Self-Regulated Learning) dengan memanfaatkan teknologi Agentic Artificial Intelligence (AI).

Sistem ini memungkinkan pengguna untuk mengelola target mingguan, menyusun jadwal harian secara otomatis melalui obrolan dengan AI, mencatat materi penting, serta memantau progres belajar secara terstruktur dan efisien.

---

## Tujuan Sistem

Tujuan dari sistem Lumora adalah:

* Mempercepat proses penyusunan jadwal belajar dengan bantuan fungsi otomatisasi AI
* Meningkatkan efisiensi pengelolaan waktu pengguna melalui sinkronisasi kalender terintegrasi
* Membantu pengguna dalam mempertahankan fokus dan motivasi melalui target harian
* Menyediakan sistem evaluasi dan pemantauan gaya belajar melalui kuesioner terstruktur

---

## Workflow Sistem (Berdasarkan Role)

Workflow sistem Lumora difokuskan pada pengguna utama (pelajar/mahasiswa) untuk memastikan seluruh proses berjalan sesuai dengan kebutuhan pengelolaan waktu mereka.

---

**Student (Pengguna)**

1. Student melakukan registrasi akun ke sistem
2. Student melakukan login ke sistem
3. Student mengisi kuesioner awal (Onboarding) untuk penentuan profil belajar
4. Student berinteraksi dengan AI (Lumora Buddy) untuk meminta saran target mingguan atau harian
5. Student menerima jadwal yang dibuat secara otomatis oleh AI di halaman Planner
6. Student menyinkronkan jadwal belajarnya dengan Google Calendar
7. Student menandai tugas yang sudah selesai pada halaman Targets
8. Student mencatat rangkuman pelajaran pada fitur Notes
9. Student logout dari sistem

---

| Layer       | Technology                                 |
| ----------- | ------------------------------------------ |
| Backend     | Go (Gin Framework)                         |
| Web App     | Vue.js (VILT Stack: Vue, Inertia, Laravel) |
| Mobile App  | React Native (Expo)                        |
| Database    | MySQL (GORM)                               |
| AI Service  | OpenRouter API (Agentic Function Calling)  |
| Auth        | Token-based Authentication (JWT)           |
| Testing     | Postman                                    |

## System Architecture

### Use Case Diagram
![Use Case Diagram](link_use_case_diagram_disini)

### Class Diagram
![Class Diagram](link_class_diagram_disini)

### Entity Relationship Diagram (ERD)
![ERD](link_erd_disini)

## API Documentation

### Base URL
```
http://localhost:8008/api
```

### Authentication

#### Register
* **Endpoint:** POST /auth/register => `http://localhost:8008/api/auth/register`
* **Deskripsi:** Digunakan untuk mendaftarkan akun pengguna baru ke dalam sistem.
* **Request:**
  ```json
  {
    "name": "Mahasiswa",
    "email": "mahasiswa@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "User created successfully"
  }
  ```
* **Screenshot:**
  ![Register API](link_screenshot_register)

#### Login
* **Endpoint:** POST /auth/login => `http://localhost:8008/api/auth/login`
* **Deskripsi:** Digunakan untuk melakukan login user dan mendapatkan token JWT untuk autentikasi.
* **Request:**
  ```json
  {
    "email": "mahasiswa@example.com",
    "password": "password123"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```
* **Screenshot:**
  ![Login API](link_screenshot_login)

#### Get Current User
* **Endpoint:** GET /auth/me => `http://localhost:8008/api/auth/me`
* **Deskripsi:** Digunakan untuk mendapatkan data profil pengguna yang sedang login.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user_id": "uuid-1234",
      "name": "Mahasiswa",
      "email": "mahasiswa@example.com",
      "role": "student"
    }
  }
  ```
* **Screenshot:**
  ![Get Current User API](link_screenshot_me)

#### Logout
* **Endpoint:** POST /auth/logout => `http://localhost:8008/api/auth/logout`
* **Deskripsi:** Digunakan untuk mengakhiri sesi login pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```
* **Screenshot:**
  ![Logout API](link_screenshot_logout)

### AI Service (Lumora Buddy)

#### Chat with AI
* **Endpoint:** POST /assessment/chat => `http://localhost:8008/api/assessment/chat`
* **Deskripsi:** Digunakan untuk mengirim pesan ke Lumora Buddy. AI akan secara dinamis membaca profil belajar dan memanggil JSON Action untuk membuat jadwal atau target otomatis.
* **Header:** `Authorization: Bearer <token>`
* **Request:**
  ```json
  {
    "message": "Buatkan saya target belajar matematika untuk minggu ini"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Success",
    "reply": "Siap! Aku sudah buatkan target mingguan untuk Matematika.\n{\"action\": \"create_target\", \"title\": \"Belajar Matematika\", \"due_date\": \"2026-10-20\"}"
  }
  ```
* **Screenshot:**
  ![Chat AI API](link_screenshot_chat)

#### Get Chat History
* **Endpoint:** GET /assessment/chat/history => `http://localhost:8008/api/assessment/chat/history`
* **Deskripsi:** Digunakan untuk mengambil riwayat percakapan dengan Lumora Buddy.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "role": "user",
        "content": "Buatkan saya target belajar matematika untuk minggu ini"
      },
      {
        "role": "bot",
        "content": "Siap! Aku sudah buatkan target mingguan untuk Matematika..."
      }
    ]
  }
  ```
* **Screenshot:**
  ![Chat History API](link_screenshot_history)

### Planner & Google Calendar

#### Get Planner
* **Endpoint:** GET /dashboard/planner => `http://localhost:8008/api/dashboard/planner`
* **Deskripsi:** Digunakan untuk mengambil daftar jadwal harian pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Belajar Matematika",
        "date": "2026-10-15",
        "start_time": "20:00",
        "end_time": "21:30"
      }
    ]
  }
  ```
* **Screenshot:**
  ![Get Planner API](link_screenshot_planner_get)

#### Create Planner
* **Endpoint:** POST /dashboard/planner => `http://localhost:8008/api/dashboard/planner`
* **Deskripsi:** Digunakan untuk menambahkan jadwal studi baru.
* **Header:** `Authorization: Bearer <token>`
* **Request:**
  ```json
  {
    "title": "Latihan Fisika",
    "date": "2026-10-16",
    "start_time": "19:00",
    "end_time": "20:30",
    "description": "Latihan soal mekanika"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Planner created successfully"
  }
  ```
* **Screenshot:**
  ![Create Planner API](link_screenshot_planner_post)

#### Sync to Google Calendar
* **Endpoint:** POST /google/sync => `http://localhost:8008/api/google/sync`
* **Deskripsi:** Digunakan untuk menyinkronkan jadwal Planner internal ke Google Calendar pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "message": "Synced 3 events to Google Calendar"
  }
  ```
* **Screenshot:**
  ![Sync Google Calendar API](link_screenshot_google_sync)

### Targets & Goals

#### Get Targets
* **Endpoint:** GET /dashboard/targets => `http://localhost:8008/api/dashboard/targets`
* **Deskripsi:** Mengambil semua target mingguan pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Selesaikan Bab 3",
        "due_date": "2026-10-20",
        "is_completed": false
      }
    ]
  }
  ```
* **Screenshot:**
  ![Get Targets API](link_screenshot_targets_get)

#### Create Target
* **Endpoint:** POST /dashboard/targets => `http://localhost:8008/api/dashboard/targets`
* **Deskripsi:** Menambahkan target mingguan baru.
* **Header:** `Authorization: Bearer <token>`
* **Request:**
  ```json
  {
    "title": "Membaca Jurnal Ilmiah",
    "due_date": "2026-10-22"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Target created successfully"
  }
  ```
* **Screenshot:**
  ![Create Target API](link_screenshot_targets_post)

#### Toggle Target Completion
* **Endpoint:** PUT /dashboard/targets/:id/toggle => `http://localhost:8008/api/dashboard/targets/1/toggle`
* **Deskripsi:** Mengubah status target antara selesai atau belum selesai.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "message": "Target status updated"
  }
  ```
* **Screenshot:**
  ![Toggle Target API](link_screenshot_targets_toggle)

### Notes Management

#### Get Notes
* **Endpoint:** GET /dashboard/notes => `http://localhost:8008/api/dashboard/notes`
* **Deskripsi:** Mengambil semua catatan studi pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Ringkasan Bab 1",
        "content": "Inti dari bab 1 adalah..."
      }
    ]
  }
  ```
* **Screenshot:**
  ![Get Notes API](link_screenshot_notes_get)

#### Create Note
* **Endpoint:** POST /dashboard/notes => `http://localhost:8008/api/dashboard/notes`
* **Deskripsi:** Menambahkan catatan studi baru.
* **Header:** `Authorization: Bearer <token>`
* **Request:**
  ```json
  {
    "title": "Ide Proyek",
    "content": "Buat aplikasi manajemen waktu"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Note created successfully"
  }
  ```
* **Screenshot:**
  ![Create Note API](link_screenshot_notes_post)

### Assessment (SRL Profile)

#### Submit Assessment
* **Endpoint:** POST /assessment/submit => `http://localhost:8008/api/assessment/submit`
* **Deskripsi:** Mengirim jawaban kuesioner Self-Regulated Learning (SRL) untuk menghitung profil belajar pengguna.
* **Header:** `Authorization: Bearer <token>`
* **Request:**
  ```json
  {
    "answers": {
      "q1": 4,
      "q2": 5,
      "q3": 3
    }
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Assessment submitted successfully",
    "data": {
      "profile": "Advanced Learner"
    }
  }
  ```
* **Screenshot:**
  ![Submit Assessment API](link_screenshot_assessment_submit)

#### Get Assessment Status
* **Endpoint:** GET /assessment/status => `http://localhost:8008/api/assessment/status`
* **Deskripsi:** Mengecek apakah pengguna sudah pernah mengisi kuesioner atau belum.
* **Header:** `Authorization: Bearer <token>`
* **Response:**
  ```json
  {
    "success": true,
    "data": {
      "has_completed": true
    }
  }
  ```
* **Screenshot:**
  ![Assessment Status API](link_screenshot_assessment_status)
