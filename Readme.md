# SecretSpace 🔐

**SecretSpace** is a secure and elegant note management web application that allows users to create, manage, and store personal notes safely. It uses a token-based authentication system, ensuring only authorized users can access their notes.

---

## 🚀 Features

- 📝 Create, Read, Update, Delete (CRUD) notes
- 🔐 Secure Login & Signup with JWT Authentication
- 🌙 Dark & Light Theme Toggle
- ⚡ Responsive, modern UI built with React & Tailwind CSS
- 🔒 Protected Routes with React Router
- 🛠️ Custom Toast Notifications

---

## 🧰 Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- React Router DOM
- React Toastify
- Lucide Icons

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- BcryptJS for password hashing
- JSON Web Token (JWT)

---

## 📦 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/secretspace.git
cd secretspace

Set up the Backend
cd backend
npm install

Create a .env file inside the backend folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key


Set up the Frontend
cd ../frontend
npm install
npm run start

secretspace/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
└── README.md


🔐 Authentication Flow
User signs up or logs in
JWT token is stored in localStorage
Protected routes are accessible only when a valid token is present
On logout, token is removed


🤝 Contributing
Contributions are welcome! If you find a bug or want to suggest an enhancement, feel free to open an issue or pull request.


📄 License
This project is open-source and available under the MIT License.


✍️ Author
Made with 💙 by Yashvardhan Ahuja
