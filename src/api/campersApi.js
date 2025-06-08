import axios from 'axios'

const BASE = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers'

export function fetchCampers({ page = 1, limit = 4, filters = {} }) {
  return axios
    .get(BASE, { params: { page, limit, ...filters } })
    .then(r => r.data)
}

export function fetchCamperById(id) {
  return axios.get(`${BASE}/${id}`).then(r => r.data)
}

export function postBooking(id, payload) {
  return axios.post(`${BASE}/${id}/bookings`, payload)
}
