import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const navItems = [
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/teams', label: 'Teams' },
    { path: '/users', label: 'Users' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Training operations</h1>
        </div>
        <nav className="nav nav-pills app-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
