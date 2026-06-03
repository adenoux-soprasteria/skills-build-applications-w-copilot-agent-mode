import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(teamsEndpoint)
      .then((items) => {
        setTeams(items)
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
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      {status === 'loading' && <p className="text-muted">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-warning">Unable to load teams: {error}</p>}
      {status === 'ready' && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-lg-6" key={team._id || team.teamId}>
              <article className="data-card h-100">
                <h2>{team.name}</h2>
                <p>{team.description}</p>
                <dl>
                  <div>
                    <dt>Members</dt>
                    <dd>{Array.isArray(team.members) ? team.members.length : 0}</dd>
                  </div>
                  <div>
                    <dt>Weekly goal</dt>
                    <dd>{team.weeklyGoalMinutes || 0} min</dd>
                  </div>
                </dl>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
