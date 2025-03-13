import './index.css'
import React,{useEffect} from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Layout
import Layout from './components/layout/Layout'


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
