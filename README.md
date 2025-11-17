# Education API

## Description
A Node.js REST API to manage **Education Schedules** and **Staff–Student interactions**.  
Supports **Admin, Staff, and Student roles** with JWT authentication.  
This project demonstrates role-based access control, secure authentication, and CRUD operations for users and schedules.

---

## Features
- **Admin**
  - Create Staff & Students
  - Manage users (GET, PATCH, DELETE)
  - View all schedules
- **Staff**
  - Create, Update, Delete Schedules
  - Filter and search schedules by year, semester, batch, date range, and keywords
- **Student**
  - View schedules assigned to them only

---

## Technologies
- Node.js, Express
- MongoDB (Atlas)
- JWT Authentication
- Postman for API testing
- bcrypt for password hashing
- dotenv for environment configuration

---

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas account (free tier)

---

## Installation

1. Clone the repository:

bash
git clone https://github.com/nithishjoseph01/educationApi.git
cd educationApi

2. Install dependencies:
npm install

3. Create a .env file using .env.example:
PORT=3000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=test_secret
JWT_EXPIRES_IN=1h

4. Start the server:
npm run dev
Server will run on http://localhost:3000

## API Endpoints

Auth
POST /auth/register — Admin only, create new users
POST /auth/login — Login and receive JWT token

Users
GET /users — Admin only
GET /users/:id — Admin or Self
PATCH /users/:id — Admin or Self
DELETE /users/:id — Admin only

Schedules
POST /schedules — Staff only
GET /schedules — Admin / Staff / Student
GET /schedules/:id — Authorized users only
PATCH /schedules/:id — Staff who created / Admin
DELETE /schedules/:id — Staff who created / Admin

Filters & Query Params:
s=keyword&yearNo=1&semesterNo=2&batch=A&from=YYYY-MM-DD&to=YYYY-MM-DD&page=1&limit=20

## Assumptions
JWT is used for authentication
Only staff can create schedules
Students can only view schedules they are assigned to
Admin can manage users and view all schedules
Dates are in ISO format (YYYY-MM-DD)


## Deliverables in Repository

Full source code
.env.example
postman_collection.json
README.md