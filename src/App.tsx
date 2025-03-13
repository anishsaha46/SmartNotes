import './index.css'
import React,{useEffect} from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Layout
import Layout from './components/layout/Layout'


// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/notes/NotesPage'
import NoteDetailPage from './pages/notes/NoteDetailPage'
import NewNotePage from './pages/notes/NewNotePage'
import EditNotePage from './pages/notes/EditNotePage'
import NotFoundPage from './pages/NoteFoundPage'

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <h1 className="text-4xl font-bold text-white">
        Hello World
      </h1>
    </div>
  )
}

export default App
