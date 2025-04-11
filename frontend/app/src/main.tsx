import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/destyle.css'
import './styles/index'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
