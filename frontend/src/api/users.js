// Temporary storage for accounts (browser localStorage).
// Later the Spring Boot API replaces this, and the backend hashes passwords (bcrypt).
const KEY = 'peerforge-users'

const demoUsers = [
  { studentId: '23-1234-567', name: 'Kurt Realista', email: 'kurt@cit.edu', password: 'password123' },
]

export function getUsers() {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : demoUsers
  } catch {
    return demoUsers
  }
}

export function saveUsers(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // storage unavailable: ignore
  }
}