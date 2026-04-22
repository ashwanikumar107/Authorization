# Authorization

A backend practice project built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to learn **JWT authentication**, **session handling**, **role-based authorization**, and **protected CRUD APIs**.

This project is mainly for practice and learning backend authorization flow step by step.

---

## Features

- User registration
- User login
- JWT-based authentication
- Access token generation
- Refresh token generation
- Refresh token hash stored in database sessions
- Role-based authorization
- Protected routes using middleware
- Task CRUD APIs
- MongoDB integration with Mongoose

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Dotenv

---

## Project Goal

The main goal of this project is to understand:

- how authentication works
- how authorization works
- difference between authentication and authorization
- how JWT tokens are verified
- how roles like **admin**, **manager**, and **user** can be restricted
- how protected CRUD routes work

---

## Folder Structure

```bash
Authorization/
│── src/
│   ├── Controllers/
│   ├── Routes/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   └── app.js
│
│── server.js
│── package.json
│── README.md
