import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hash routing is handled in-app, so a plain static dist works on any host
export default defineConfig({ plugins: [react()] })
