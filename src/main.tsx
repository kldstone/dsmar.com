import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LangProvider } from './lib/i18n'
import App from './App.tsx'
import { initializeConsentMode } from './lib/analytics'

initializeConsentMode()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
