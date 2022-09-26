import axios from 'axios'

export const listLeads = (cb) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/leads/?location_string=India`)
    .then((response) => {
      cb(null, response.data)
    })
    .catch((error) => {
      cb(error)
    })
}

export const addLead = (data, cb) => {
  axios.post(`${process.env.REACT_APP_API_URL}/api/leads/`, data)
    .then((response) => {
      cb(null, response.data)
    })
    .catch((error) => {
      cb(error)
    })
}

export const updateLead = (id, data, cb) => {
  axios.put(`${process.env.REACT_APP_API_URL}/api/mark_lead/${id}`, data)
    .then((response) => {
      cb(null, response.data)
    })
    .catch((error) => {
      cb(error)
    })
}

export const deleteLead = (id, cb) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/api/leads/${id}/`)
    .then((response) => {
      cb(null, response.data)
    })
    .catch((error) => {
      cb(error)
    })
}
