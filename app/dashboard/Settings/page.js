import { useState, useEffect } from 'react'
// import '@/styles/globals.css'

export default function Setting() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div style={{ padding: 20 }}>
      <h1>Settings Page</h1>
      <button 
        style={{ padding: '10px 20px', marginTop: 10 }}
        onClick={() => setDarkMode(prev => !prev)}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}

