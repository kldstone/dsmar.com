import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { LangProvider } from './lib/i18n'
import App from './App.tsx'
import { initializeConsentMode } from './lib/analytics'

initializeConsentMode()

const root = document.getElementById('root')!
const initialLang = /^\/zh(?:\/|$)/.test(window.location.pathname) ? 'zh' : 'en'
const app = (
  <StrictMode>
    <LangProvider initialLang={initialLang}>
      <App />
    </LangProvider>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
