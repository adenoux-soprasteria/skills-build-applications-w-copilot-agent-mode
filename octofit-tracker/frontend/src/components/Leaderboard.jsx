import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then((items) => {
        setLeaders(items)
        setStatus('ready')
      })
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      {status === 'loading' && <p className="text-muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="alert alert-warning">Unable to load leaderboard: {error}</p>}
      {status === 'ready' && (
        <div className="leader-list">
          {leaders.map((leader) => (
            <article className="leader-row" key={leader._id || leader.entryId || leader.userId}>
              <span className="rank">#{leader.rank}</span>
              <div>
                <h2>{leader.name}</h2>
                <p>{leader.weeklyStreak || 0} week streak</p>
              </div>
              <strong>{leader.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
