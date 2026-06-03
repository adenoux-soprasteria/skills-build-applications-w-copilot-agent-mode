export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'data', 'items', 'docs']
  const matchingKey = collectionKeys.find((key) => Array.isArray(payload[key]))

  return matchingKey ? payload[matchingKey] : []
}

export const fetchCollection = async (endpoint) => {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollectionResponse(payload)
}
