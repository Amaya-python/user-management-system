# User Management System

A full-stack User Management System developed using Django REST Framework and React. The application allows administrators to create, view, update, delete, search, and manage user records through a modern and responsive dashboard interface.

This project was developed as an internship task for **Saiket Systems**.

---

## 📌 Project Overview

The User Management System is a CRUD-based web application designed to manage user information efficiently.

The system provides a frontend dashboard built with React and a backend REST API built with Django REST Framework.

Users can be added, viewed, edited, deleted, and searched through the application.

---

## 🚀 Features

### User Management

- Add new users
- View all users
- View individual user details
- Update existing user information
- Delete users with confirmation
- Search users by name, email, or age

### Validation

Frontend validation includes:

- First name is required
- Last name is required
- Name must contain at least 2 characters
- Name can contain only letters
- Email is required
- Email format validation
- Age is required
- User must be at least 18 years old
- Age cannot be greater than 100

Backend validation is also handled through Django REST Framework serializers.

### Dashboard

The application dashboard displays:

- Total number of users
- Average user age
- Total adult users
- Recent user information

### User Interface

- Responsive layout
- Sidebar navigation
- Dynamic page header
- Home page
- Dashboard page
- User Management page
- Search functionality
- View user modal
- Delete confirmation modal
- Edit user functionality
- Success and error messages

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Bootstrap
- JavaScript
- HTML5
- CSS3

### Backend

- Python
- Django
- Django REST Framework
- SQLite

### Tools

- Git
- GitHub
- VS Code
- Postman

---

## 📂 Project Structure

````text
user_management/
│
├── frontendapp/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Users.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── users/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── user_management/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── manage.py
├── .gitignore
└── README.md

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Amaya-python/user-management-system.git

2. Navigate to the Project Directory
cd user-management-system

Backend Setup
1. Create a Virtual Environment
python -m venv venv
2. Activate the Virtual Environment
Windows
venv\Scripts\activate
3. Install Required Dependencies
pip install django djangorestframework django-cors-headers
4. Run Database Migrations
python manage.py makemigrations
python manage.py migrate
5. Start the Django Server
python manage.py runserver

Backend:

http://127.0.0.1:8000/
Frontend Setup

Open another terminal and navigate to:

cd frontendapp

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend:

http://localhost:5173/
🔗 API Endpoints
GET     /api/users/
POST    /api/users/
GET     /api/users/{id}/
PUT     /api/users/{id}/
DELETE  /api/users/{id}/

Example:

http://127.0.0.1:8000/api/users/
🔍 Search Functionality

Users can be searched by:

First Name
Last Name
Full Name
Email
Age
📱 Responsive Design

The application supports responsive layouts for:

Desktop
Tablet
Mobile devices
👩‍💻 Internship Project

This project was developed as part of an internship task for Saiket Systems.

The project demonstrates:

Django REST API development
React frontend development
CRUD operations
Frontend and backend validation
REST API integration
User search functionality
Dashboard statistics
Responsive UI design
Git and GitHub version control

🔮 Future Improvements
User authentication and authorization
JWT authentication
Admin login
Pagination
Sorting and advanced filtering
Role-based access control
PostgreSQL integration
Cloud deployment
Docker containerization
👤 Author

Amaya Surendran

Python Full Stack Developer

GitHub: https://github.com/Amaya-python

Project Repository: https://github.com/Amaya-python/user-management-system

📄 License

This project was developed for educational and internship purposes as part of a Saiket Systems internship task.
````
