import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogProvider } from './context/BlogContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlogProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </BlogProvider>
  </StrictMode>,
)
