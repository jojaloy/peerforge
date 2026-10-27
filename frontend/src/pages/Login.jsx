import { useState } from 'react'
import { getUsers } from '../api/users.js'

export default function Login({ onLogin, goRegister }) {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!studentId.trim() || !password) {
      setError('Enter your Student ID and password.')
      return
    }
    const user = getUsers().find((u) => u.studentId === studentId.trim() && u.password === password)
    if (!user) {
      setError('Invalid Student ID or password.')
      return
    }
    setError('')
    onLogin(user)
  }

  return (
    <div className="page-center">
      <div className="card auth-card">
        <div className="brand big">PeerForge</div>
        <p className="muted">Find project partners by skills, availability and mutual consent.</p>
        {error && <div className="notice err">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Student ID
            <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 23-1234-567" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="row">
            <button className="btn primary" type="submit">Login</button>
            <button className="btn" type="button" onClick={goRegister}>Register</button>
          </div>
        </form>
        <div className="demo">Demo account: 23-1234-567 / password123</div>
      </div>
    </div>
  )
}
