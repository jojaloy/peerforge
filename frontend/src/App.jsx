import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  const [page, setPage] = useState('login') // 'login' or 'register'
  const [user, setUser] = useState(null) // the logged-in user, or null

  // Placeholder screen after login. The dashboard replaces this later.
  if (user) {
    return (
      <div className="page-center">
        <div className="card auth-card">
          <div className="brand big">PeerForge</div>
          <p>Welcome, {user.name}!</p>
          <p className="muted small">Dashboard coming soon.</p>
          <button className="btn" onClick={() => setUser(null)}>Log out</button>
        </div>
      </div>
    )
  }

  return page === 'login' ? (
    <Login onLogin={setUser} goRegister={() => setPage('register')} />
  ) : (
    <Register goLogin={() => setPage('login')} />
  )
}
