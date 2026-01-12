# 📚 Nalanda Library Management System – Backend

A backend RESTful API for managing a Library Management System, built using **Node.js**, **Express.js**, and **MongoDB**.  
The system supports **user authentication**, **book management**, **borrowing operations**, and **analytical reports** using MongoDB aggregations.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT‑based authentication
- Role‑based access control (Admin / Member)

### 📖 Books Management
- Add, update, delete books (Admin only)
- View books (All users)
- Fields:
  - Title
  - Author
  - Genre
  - ISBN
  - Publication Date
  - Total Copies
  - Available Copies

### 🔄 Borrow Management
- Borrow a book
- Return a book
- Borrow history tracking
- User ↔ Book relationship

### 📊 Reports & Aggregations
- Most borrowed books
- Most active members
- Book availability summary

---

## 🛠️ Technology Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- RESTful APIs
- Postman

---

## 📁 Project Structure

