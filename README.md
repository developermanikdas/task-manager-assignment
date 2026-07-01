# 🚀 Task Manager – Full Stack REST API with JWT Authentication

A secure, scalable full-stack Task Manager application built with **Node.js**, **Express.js**, **MongoDB**, and **React**. The project demonstrates authentication, role-based authorization, RESTful API design, CRUD operations, and frontend integration.

---

## 📌 Features

### 🔐 Authentication

- User Registration
- User Login
- Password Hashing using **bcrypt**
- JWT Authentication
- Protected Routes

### 👤 Role-Based Authorization

- **User**
  - Create Tasks
  - View Own Tasks
  - Update Own Tasks
  - Delete Own Tasks

- **Admin**
  - View All Tasks
  - Manage All Tasks

### ✅ Task Management

- Create Task
- View Tasks
- Update Task
- Delete Task
- Mark Task as Complete/Pending

### 🛡 Security

- Password Hashing (bcrypt)
- JWT Token Authentication
- Route Protection
- Role-Based Authorization
- Request Validation using Joi
- MongoDB ObjectId Validation

### 📖 API Documentation

- Interactive Swagger UI
- RESTful API Design
- Standard HTTP Status Codes

---

# 🏗 Project Structure

```
Task-Manager/
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── docs
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── validators
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Swagger
- Helmet
- Morgan
- CORS

## Frontend

- React
- React Router DOM
- Axios
- Context API

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/task-manager.git
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |

---

## Tasks

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/tasks` | Get Tasks |
| GET | `/api/v1/tasks/:id` | Get Task |
| POST | `/api/v1/tasks` | Create Task |
| PUT | `/api/v1/tasks/:id` | Update Task |
| DELETE | `/api/v1/tasks/:id` | Delete Task |

---

# 🔑 Authentication

All protected endpoints require a JWT.

Example

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📖 Swagger Documentation

After starting the backend, open

```
http://localhost:5000/api-docs
```

to access the interactive API documentation.

---

# 📷 Application Flow

```
Register
     │
     ▼
Login
     │
     ▼
JWT Authentication
     │
     ▼
Protected Dashboard
     │
     ▼
Task CRUD Operations
```

---

# 📈 Scalability Considerations

The project follows a modular MVC architecture that allows easy extension as the application grows.

Potential production improvements include:

- Redis Caching
- Refresh Token Authentication
- Docker Containerization
- CI/CD Pipeline
- Load Balancing
- Microservice Architecture
- API Rate Limiting
- Centralized Logging
- Unit & Integration Testing
- Cloud Deployment

---

# 📌 Future Enhancements

- Email Verification
- Forgot Password
- Refresh Tokens
- Task Categories
- File Attachments
- Search & Filtering
- Pagination
- Sorting
- Dark Mode
- Notifications

---

# 👨‍💻 Author

**Manik Das**

Bachelor of Computer Applications (BCA)

Passionate Backend Developer focused on building secure, scalable REST APIs using the MERN stack.

---

# 📄 License

This project is created for educational and internship evaluation purposes.