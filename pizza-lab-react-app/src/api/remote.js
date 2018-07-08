import Auth from '../utils/auth'
const host = 'http://localhost:5000/'

async function register (username, email, password) {
  const res = await window.fetch(host + 'auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })

  return res.json()
}

async function login (email, password) {
  const res = await window.fetch(host + 'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  return res.json()
}

async function fetchStats () {
  const res = await window.fetch(host + 'stats')
  return res.json()
}

async function fetchPage (page) {
  const res = await window.fetch(host + 'pizza/all?page=' + page)
  return res.json()
}

async function fetchSearchPage (page, search) {
  const res = await window.fetch(host + `pizza/all?page=${page}&search=${search}`)
  return res.json()
}

async function fetchDetails (id) {
  const res = await window.fetch(host + 'pizza/details/' + id, {
    method: 'GET',
    headers: {
      'Authorization': 'bearer ' + Auth.getToken()
    }
  })

  return res.json()
}

async function createPizza (data) {
  const res = await window.fetch(host + 'pizza/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + Auth.getToken()
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export {
  register,
  login,
  fetchPage,
  fetchSearchPage,
  fetchDetails,
  createPizza,
  fetchStats
}
