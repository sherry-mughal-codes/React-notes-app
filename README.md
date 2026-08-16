# 📓 iNotebook - Cloud Notes Management App

A modern, responsive full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application designed to securely manage, organize, search, and categorize your notes in the cloud.

---

## 🌟 Key Features

- **📝 Create Notes**: Add notes with titles, rich descriptions, and category tags.
- **🏷️ Category Tagging & Filtering**: Organize notes with quick tags (`#Work`, `#Personal`, `#Ideas`, `#Study`, `#General`) and filter notes with category pills.
- **🔍 Real-Time Search**: Search through notes instantly by title, description, or tag from the top search bar.
- **✏️ Edit & Update**: Modify existing notes directly via a modal dialog.
- **🗑️ Delete Notes**: Remove notes with instant state update.
- **📋 One-Click Copy**: Easily copy full note titles and content to your clipboard.
- **🎨 Responsive Widescreen UI**: Built with Bootstrap 5, Plus Jakarta Sans typography, and Font Awesome 6 icons.
- **🔒 Backend API & Security**: RESTful APIs built with Express, input validation with `express-validator`, password hashing with `bcryptjs`, and JWT user authentication.

---

## 🛠️ Tech Stack

### Frontend
- **React.js 19** (Functional Components, Hooks, Context API)
- **React Router 7** (`react-router-dom`)
- **Bootstrap 5.3 & Custom CSS**
- **Font Awesome 6**

### Backend
- **Node.js & Express.js 5**
- **MongoDB & Mongoose ODM**
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password encryption
- **express-validator** for request validation
- **cors** for Cross-Origin Resource Sharing

---

## 📂 Project Structure

```text
inotebook/
├── Backened/                # Express & Node.js API Server
│   ├── middleware/          # JWT authentication middleware (fetchuser.js)
│   ├── Models/              # Mongoose schemas (User.js, Notes.js)
│   ├── Routes/              # API endpoints (auth.js, notes.js)
│   ├── db.js                # MongoDB connection setup
│   ├── index.js             # Backend server entry point (Port 5000)
│   └── package.json         # Backend dependencies & scripts
│
├── public/                  # Public assets & index.html
├── src/                     # React Frontend Source
│   ├── components/          # Reusable UI components
│   │   ├── About.js         # About page
│   │   ├── AddNote.js       # Note creation form
│   │   ├── Alert.js         # Floating toast notifications
│   │   ├── Home.js          # Main dashboard view
│   │   ├── Navbar.js        # Navigation bar & search
│   │   ├── Noteitem.js      # Individual note card
│   │   └── Notes.js         # Notes explorer & edit modal
│   ├── context/notes/       # Context API state management
│   │   ├── noteContext.js   # Context creation
│   │   └── NoteState.js     # Global state provider & actions
│   ├── App.js               # Root component & routing
│   ├── index.js             # React DOM root entry point
│   └── index.css            # Custom design tokens & layout
└── package.json             # Frontend dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ installed)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017` (or a MongoDB Atlas connection string)

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Backened
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node index.js
   # or with nodemon for auto-reloading:
   npx nodemon index.js
   ```
   *The backend will start on **`http://localhost:5000`** and connect to MongoDB.*

---

### 2. Frontend Setup

1. Open a new terminal in the root `inotebook` directory:
   ```bash
   cd inotebook
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The React app will open automatically on **`http://localhost:3000`**.*

---

## 📡 API Endpoints Summary

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user & return JWT token | No |
| `POST` | `/api/auth/getuser` | Fetch logged-in user profile | Yes (`auth-token`) |

### Notes (`/api/notes`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/notes/fetchallnotes` | Fetch all notes for authenticated user | Yes (`auth-token`) |
| `POST` | `/api/notes/addnote` | Create a new note | Yes (`auth-token`) |
| `PUT` | `/api/notes/updatenote/:id` | Update an existing note | Yes (`auth-token`) |
| `DELETE` | `/api/notes/deletenote/:id` | Delete a note | Yes (`auth-token`) |

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
