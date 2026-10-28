import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import ThemeToggle from './components/ThemeToggle'
import Logo from './components/Logo'
import { useTheme } from './theme.js'

export default function App() {
  const [page, setPage] = useState('login') // 'login' or 'register'
  const [user, setUser] = useState(null) // the logged-in user, or null
  const { theme, toggle } = useTheme()

  let content

  // Placeholder screen after login. The dashboard replaces this later.
  if (user) {
    content = (
      <div className="page-center">
        <div className="card auth-card">
          <div className="brand big"><Logo theme={theme} /></div>
          <p>Welcome, {user.name}!</p>
          <p className="muted small">Dashboard coming soon.</p>
          <button className="btn" onClick={() => setUser(null)}>Log out</button>
        </div>
      </div>
    )
  } else if (page === 'login') {
    content = (
      <Login
        onLogin={setUser}
        goRegister={() => setPage('register')}
        theme={theme}
      />
    )
  } else {
    content = <Register goLogin={() => setPage('login')} theme={theme} />
  }

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggle} />
      {content}
    </>
  )
}