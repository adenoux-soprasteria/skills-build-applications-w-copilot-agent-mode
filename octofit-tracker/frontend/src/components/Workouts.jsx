import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then((items) => {
        setWorkouts(items)
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
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      {status === 'loading' && <p className="text-muted">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-warning">Unable to load workouts: {error}</p>}
      {status === 'ready' && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6 col-xl-4" key={workout._id || workout.workoutId}>
              <article className="data-card h-100">
                <div className="d-flex justify-content-between gap-3 align-items-start">
                  <h2>{workout.title}</h2>
                  <span className="badge text-bg-success">{workout.level}</span>
                </div>
                <p>{workout.description}</p>
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>{workout.durationMinutes} min</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>{Array.isArray(workout.focusAreas) ? workout.focusAreas.join(', ') : 'Balanced'}</dd>
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

export default Workouts
