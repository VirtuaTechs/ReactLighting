import { createRoot } from 'react-dom/client'
import * as React from 'react'
import './styles.css'
import App from './App'

const rootElement = document.getElementById('root');
createRoot(rootElement as Element).render(<App />)
