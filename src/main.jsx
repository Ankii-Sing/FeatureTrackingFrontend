import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './store/userContext/index.jsx'
import { FeatureProvider } from './screens/privateScreens/featureScreen/store/featureContext/index.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <FeatureProvider>
        <App />
      </FeatureProvider>
    </UserProvider>
  </StrictMode>
)
