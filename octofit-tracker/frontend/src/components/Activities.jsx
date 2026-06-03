import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then((items) => {
        setActivities(items)
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
        <p className="eyebrow">Training log</p>
        <h1>Activities</h1>
      </div>
      {status === 'loading' && <p className="text-muted">Loading activities...</p>}
      {status === 'error' && <p className="alert alert-warning">Unable to load activities: {error}</p>}
      {status === 'ready' && (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.activityId}>
                  <td>{activity.type}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{Number(activity.distanceMiles || 0).toFixed(1)} mi</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
