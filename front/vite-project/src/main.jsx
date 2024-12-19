import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLR0HlFTA7U5c5zMO2j5E5q6aEp3qFwK3H8sgFZ9qF"
  crossorigin="anonymous"
/>


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
