# Real-time Markdown Editor with Live Preview 🚀

A powerful real-time Markdown editor built with Node.js and React, featuring instant HTML preview and syntax highlighting.

## ✨ Overview

This editor provides a seamless experience for writing and previewing Markdown content in real-time. It converts Markdown syntax to HTML dynamically and displays the rendered content in a live preview pane.

## 🎯 Features

- Real-time Markdown to HTML conversion
- Live preview of HTML output
- Optional syntax highlighting for better readability
- Backend processing using Node.js and Express
- Stateless, real-time operations without a database

## 💻 Technologies Used

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express
- TypeScript

### Dependencies
- CORS for cross-origin requests
- Lodash for debouncing
- Sanitize-HTML for cleaning HTML output

## 🚀 Getting Started

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Akbarhaleel1/Markdown-Editor.git
   ```

2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

## 🌐 Running the Application

- Backend server runs at: `http://localhost:3001`
- Frontend application runs at: `http://localhost:3000`

## 📦 Package Details

### Backend (server/package.json)

**Scripts:**
- `start`: Runs the compiled backend server
- `dev`: Runs the backend server with nodemon for development

**Key Dependencies:**
- `express`: Web framework for Node.js
- `cors`: Middleware for CORS
- `marked`: Markdown parsing library
- `sanitize-html`: HTML sanitization

**DevDependencies:**
- TypeScript typings for Express, CORS, and sanitize-html

### Frontend (client/package.json)

**Scripts:**
- `start`: Launches the React development server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a Pull Request

## 📜 License

This project is licensed under the ISC License.

## 📞 Contact

For inquiries, please contact:
- **Name:** Akbar Haleel
- **Email:** akbarhaleel508@gmail.com

---

Made with ❤️ by Akbar Haleel
