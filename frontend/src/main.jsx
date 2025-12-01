import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from "motion/react"

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
<MotionConfig viewport={{ once: true }}>
  <App />
</MotionConfig>
    
    </BrowserRouter>
   </StrictMode>, 
)
