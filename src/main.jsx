import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client'
import App from './pages/App/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)