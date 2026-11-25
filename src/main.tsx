import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { LangProvider } from './lib/i18n'
import App from './App.tsx'
import { initializeConsentMode } from './lib/analytics'

initializeConsentMode()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
