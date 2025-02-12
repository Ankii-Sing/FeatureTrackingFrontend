import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import FeatureContext, { FeatureProvider } from './context/FeatureContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FeatureProvider>
        <App />
      </FeatureProvider>
    </UserProvider>
  </StrictMode>
)
