# 🚀 Job Portal API (MERN Backend)

A fully functional **Job Portal Backend API** built using Node.js, Express, MongoDB with complete Swagger API documentation.

---

## 📌 Features

* 🔐 User Authentication (Register/Login)
* 🧑 User Profile Update
* 💼 Job Management (CRUD)
* 📊 Job Statistics
* 🛡️ JWT Protected Routes
* 📄 API Documentation with Swagger

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Swagger (OpenAPI)

---

## 📄 API Documentation

👉 After running the server, access Swagger UI:

http://localhost:8080/api-docs

---

## ⚙️ Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file and add:

```env
PORT=8080
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 📌 API Endpoints

### Auth

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`

### Jobs

* POST `/api/v1/job/create-job`
* GET `/api/v1/job/get-job`
* PATCH `/api/v1/job/update-job/:id`
* DELETE `/api/v1/job/delete-job/:id`
* GET `/api/v1/job/job-stats`

### User

* PUT `/api/v1/user/update-user`

---

## 🧪 Testing APIs

Use Swagger UI or tools like Postman.

---

## 📷 Swagger Preview

<img width="1873" height="907" alt="Screenshot 2026-03-24 131955" src="https://github.com/user-attachments/assets/218d49dc-20b5-4f4d-9cb1-187b8d9023f2" />


---

## 👨‍💻 Author

Rupam Giri

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
