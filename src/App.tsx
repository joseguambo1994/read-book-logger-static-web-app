import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type AuthUser = {
  identityProvider: string
  userDetails: string
  userId: string
  userRoles: string[]
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    fetch('/.auth/me')
      .then((res) => {
        console.log('Guambo auth', res)
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setUser(data[0])
        } else {
          setUser(null)
        }
      })
      .catch(() => setUser(null))
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>📚 Read Tracker App</h1>

      <div className="card">
        {user ? (
          <>
            <p>👋 Welcome, {user.userDetails}</p>
            <p>🔑 Provider: {user.identityProvider}</p>
            <a href="/.auth/logout">🚪 Logout</a>
          </>
        ) : (
          <a href="/.auth/login/github">🔐 Login with GitHub</a>
        )}
      </div>
    </>
  )
}

export default App
