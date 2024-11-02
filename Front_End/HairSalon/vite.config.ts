import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GrConsole } from 'react-icons/gr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})