import { useState } from 'react'
import { getUsers, saveUsers } from '../api/users.js'
import Logo from '../components/Logo'

// Student ID format: 2 digits - 4 digits - 3 digits (e.g. 23-1234-567)
const STUDENT_ID_FORMAT = /^\d{2}-\d{4}-\d{3}$/

export default function Register({ goLogin, theme }) {
  const [form, setForm] = useState({ studentId: '', name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  // Update one field at a time
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = getUsers()
    const id = form.studentId.trim()
    const email = form.email.trim()

    // Validate every input
    if (!id || !form.name.trim() || !email || !form.password) return setError('All fields are required.')
    if (!STUDENT_ID_FORMAT.test(id)) return setError('Student ID must follow the format 00-0000-000 (e.g. 23-1234-567).')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (users.some((u) => u.studentId === id)) return setError('That Student ID is already registered.')
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return setError('That email is already registered.')

    saveUsers([...users, { studentId: id, name: form.name.trim(), email, password: form.password }])
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <div className="page-center">
        <div className="card auth-card">
          <div className="brand big"><Logo theme={theme} /></div>
          <div className="notice ok">Account created. You can log in now.</div>
          <button className="btn primary" onClick={goLogin}>Go to login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-center">
      <div className="card auth-card">
        <div className="brand big"><Logo theme={theme} /></div>
        <p className="muted">Create your student account.</p>
        {error && <div className="notice err">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Student ID
            <input
              value={form.studentId}
              onChange={set('studentId')}
              placeholder="e.g. 23-1234-567"
              maxLength={11}
            />
          </label>
          <label>Full name<input value={form.name} onChange={set('name')} /></label>
          <label>Email<input type="email" value={form.email} onChange={set('email')} /></label>
          <label>Password<input type="password" value={form.password} onChange={set('password')} /></label>
          <label>Confirm password<input type="password" value={form.confirm} onChange={set('confirm')} /></label>
          <div className="row">
            <button className="btn primary" type="submit">Create account</button>
            <button className="btn" type="button" onClick={goLogin}>Back to login</button>
          </div>
        </form>
      </div>
    </div>
  )
}