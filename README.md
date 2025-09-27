# 📝 Django + React To-Do App

A full-stack To-Do list application built with **Django REST Framework** (backend API) and **React** (frontend).

---

## 🚀 Features
- Add, update, toggle, and delete tasks
- Dark theme UI with React
- Django REST API with browsable interface
- SQLite (default) or PostgreSQL support

---

## 📂 Project Structure
django-react-todo/
│
├── backend/ # Django backend (API)
│ ├── backend/ # Django project config
│ ├── todo/ # To-Do app (models, views, serializers)
│
├── frontend/ # React frontend
│ ├── src/ # React components
│ ├── public/



---

## ⚙️ Setup Instructions

### 1. Backend (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
API available at: http://127.0.0.1:8000/api/tasks/
🛠️ Tech Stack

Backend: Django, Django REST Framework

Frontend: React, Axios

Database: SQLite (default), PostgreSQL (optional)






