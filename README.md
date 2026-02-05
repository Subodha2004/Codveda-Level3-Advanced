# 📝 Task Manager Pro

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). This modern, feature-rich application helps you organize and track your daily tasks efficiently with advanced features like priority levels, due dates, categories, and dark mode.

![Task Manager Pro](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Node](https://img.shields.io/badge/Node-24.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

## ✨ Features

### Core Functionality
- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Real-time task statistics dashboard
- ✅ Persistent data storage with MongoDB

### Advanced Features
- 🔴 **Priority Levels** - Categorize tasks as High, Medium, or Low priority
- 📅 **Due Dates** - Set deadlines with smart date indicators (Overdue, Due Today, etc.)
- 📁 **Categories/Tags** - Organize tasks by custom categories (Work, Personal, etc.)
- 🔍 **Search & Filter** - Find tasks quickly with real-time search and multiple filters
- 📊 **Statistics Dashboard** - Visual overview of task completion and priorities
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ✅ **Bulk Actions** - Select and delete multiple tasks at once
- 💾 **Offline Support** - Local storage backup for when backend is unavailable
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### User Experience
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Fast and intuitive interface
- 🎯 Collapsible advanced options in forms
- 🔔 Smart notifications for overdue tasks
- 💫 Hover effects and visual feedback

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building user interfaces
- **Axios** - Promise-based HTTP client for API requests
- **CSS3** - Modern styling with CSS variables and animations
- **LocalStorage** - Client-side data caching

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling tool
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

**For MongoDB Atlas (cloud database):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env`

## 🎮 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

The application should automatically open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
task-manager-pro/
├── backend/
│   ├── controllers/
│   │   └── taskController.js      # Task CRUD operations
│   ├── models/
│   │   └── Task.js                # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js          # API routes
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express server setup
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js        # Add/edit task form
│   │   │   ├── TaskList.js        # Task list container
│   │   │   ├── TaskItem.js        # Individual task component
│   │   │   ├── SearchBar.js       # Search and filter component
│   │   │   └── Statistics.js      # Stats dashboard
│   │   ├── App.js                 # Main application component
│   │   ├── App.css                # Global styles
│   │   └── index.js               # React entry point
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task by ID |
| DELETE | `/api/tasks/:id` | Delete a task by ID |

### Request/Response Examples

**Create Task (POST /api/tasks)**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "high",
  "category": "Work",
  "dueDate": "2026-02-10",
  "completed": false
}
```

**Response**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "high",
  "category": "Work",
  "dueDate": "2026-02-10T00:00:00.000Z",
  "completed": false,
  "createdAt": "2026-02-05T10:30:00.000Z",
  "updatedAt": "2026-02-05T10:30:00.000Z",
  "__v": 0
}
```

## 🎨 Features Guide

### Adding a Task
1. Enter task title in the main input field
2. Click the dropdown arrow (▼) for advanced options
3. Set priority, category, and due date (optional)
4. Add description if needed
5. Click "Add Task" button

### Searching & Filtering
- Use the search bar to find tasks by title, description, or category
- Filter by status: All Tasks, Active, or Completed
- Filter by priority: All Priorities, High, Medium, or Low

### Bulk Actions
1. Click checkboxes to select multiple tasks
2. Use "Select All" button to select all in a section
3. Click "Delete Selected" to remove multiple tasks at once

### Dark Mode
- Click the moon (🌙) / sun (☀️) icon in the header to toggle themes
- Preference is saved locally and persists across sessions

## 🧪 Testing with Postman

1. **Get All Tasks**
   - Method: GET
   - URL: `http://localhost:5000/api/tasks`

2. **Create Task**
   - Method: POST
   - URL: `http://localhost:5000/api/tasks`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
   ```json
   {
     "title": "Test Task",
     "description": "Testing the API",
     "priority": "medium",
     "category": "Testing"
   }
   ```

3. **Update Task**
   - Method: PUT
   - URL: `http://localhost:5000/api/tasks/{task_id}`
   - Headers: `Content-Type: application/json`
   - Body: (same as create)

4. **Delete Task**
   - Method: DELETE
   - URL: `http://localhost:5000/api/tasks/{task_id}`

## 📦 Available Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend
```bash
npm start      # Start development server
npm build      # Create production build
npm test       # Run tests
npm eject      # Eject from Create React App (one-way operation)
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (macOS/Linux)
kill -9 $(lsof -ti:5000)

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas
- Check firewall settings

### React App Not Loading
- Clear browser cache
- Delete `node_modules` and run `npm install` again
- Check browser console for errors
- Ensure backend is running on correct port

### CORS Errors
- Verify CORS is enabled in backend
- Check API_URL in frontend `App.js` matches backend port

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
NODE_ENV=development
```

### Frontend
The frontend uses `http://localhost:5000` by default. To change:
- Update `API_URL` in `src/App.js`

## 🚢 Deployment

### Backend (Heroku Example)
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_atlas_uri

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API_URL to point to your deployed backend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the powerful database
- Express.js for the minimal web framework
- All contributors who help improve this project

## 📸 Screenshots

### Light Mode
![Light Mode Dashboard](screenshots/light-mode.png)

### Dark Mode
![Dark Mode Dashboard](screenshots/dark-mode.png)

### Mobile View
![Mobile View](screenshots/mobile.png)




**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!
