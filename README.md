# DevPulse API 🚀

A backend API for an internal tech issue and feature tracking platform where contributors can report issues and maintainers can manage the workflow.

Built with **Node.js**, **TypeScript**, **Express.js**, and **PostgreSQL** using **raw SQL queries**.

---

# 🌐 Live Links

- **Live API:** https://dev-pulse-phi-bay.vercel.app/
- **GitHub Repository:** https://github.com/thedev-mohammadali/assignment-B7A2.git
- **Interview Video:** https://youtu.be/zPbhq16x3TM

---

# ✨ Features

- JWT Authentication & Authorization
- Role-based access control
- Issue reporting system
- Contributor & Maintainer workflow
- Password hashing with bcrypt
- PostgreSQL database integration
- Raw SQL queries using native `pg`
- Global error handling
- Modular architecture
- Strict TypeScript setup
- Query filtering and sorting

---

# 🛠️ Tech Stack

| Technology   | Usage               |
| ------------ | ------------------- |
| Node.js      | Runtime Environment |
| TypeScript   | Static Typing       |
| Express.js   | Backend Framework   |
| PostgreSQL   | Relational Database |
| pg           | PostgreSQL Driver   |
| bcrypt       | Password Hashing    |
| jsonwebtoken | JWT Authentication  |
| tsup         | Build Tool          |

---

# 📁 Project Structure

```bash
src/
├── app.ts
├── server.ts
├── config/
├── db/
├── middleware/
├── modules/
│   ├── auth/
│   └── issues/
├── types/
└── utils/
```

---

# 🔐 Authentication System

- Users can register as:
  - contributor
  - maintainer

- Login returns a JWT token.

- Protected routes require:

```http
Authorization: <JWT_TOKEN>
```

---

# 👥 Roles & Permissions

| Role        | Permissions                                        |
| ----------- | -------------------------------------------------- |
| contributor | Create issues, view issues, update own open issues |
| maintainer  | Full issue management access                       |

---

# 🗄️ Database Schema

## Users Table

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | SERIAL PRIMARY KEY       |
| name       | VARCHAR(80)              |
| email      | VARCHAR(255) UNIQUE      |
| password   | TEXT                     |
| role       | contributor / maintainer |
| created_at | TIMESTAMP                |
| updated_at | TIMESTAMP                |

---

## Issues Table

| Field       | Type                          |
| ----------- | ----------------------------- |
| id          | SERIAL PRIMARY KEY            |
| title       | VARCHAR(150)                  |
| description | TEXT                          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | INTEGER                       |
| created_at  | TIMESTAMP                     |
| updated_at  | TIMESTAMP                     |

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql_connection_string
SECRET=jwt_secret
EXPIRY=1d
```

---

# 📦 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/thedev-mohammadali/assignment-B7A2.git
```

## Move Into Project

```bash
cd assignment-B7A2
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

---

# 📌 API Endpoints

---

## 🔹 Authentication Routes

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

---

## 🔹 Issue Routes

### Create Issue

```http
POST /api/issues
```

### Get All Issues

```http
GET /api/issues
```

### Get Single Issue

```http
GET /api/issues/:id
```

### Update Issue

```http
PATCH /api/issues/:id
```

### Delete Issue

```http
DELETE /api/issues/:id
```

---

# 🔍 Query Parameters

## Get All Issues

```http
GET /api/issues?sort=newest&type=bug&status=open
```

| Query  | Values                        |
| ------ | ----------------------------- |
| sort   | newest / oldest               |
| type   | bug / feature_request         |
| status | open / in_progress / resolved |

---

# 📤 Sample Response

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Database issue",
    "description": "Connection timeout under heavy load",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2026-05-24T10:00:00Z",
    "updated_at": "2026-05-24T10:00:00Z"
  }
}
```

---

# 🚨 Error Response Format

```json
{
  "success": false,
  "message": "Unauthorized access",
  "errors": "Invalid token"
}
```

---

# 🔒 Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Role-based authorization
- Parameterized SQL queries
- Sensitive data excluded from responses

---
