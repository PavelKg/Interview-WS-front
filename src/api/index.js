import axios from 'axios'

const API_ROOT = 'https://dev.pepex.kg/api'

const Api = axios.create({
  baseURL: API_ROOT,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer`
  }
})

export default {
  setHeaderAuth(token) {
    Api.defaults.headers['Authorization'] = `Bearer ${token}`
  },
  delHeaderAuth(token) {
    delete Api.defaults.headers.common['Authorization']
  },
  login(data) {
    const {personalId, companyId, password} = data
    return Api.post(`/login`, {
      personal_id: personalId,
      company_id: companyId,
      password
    })
  },
  user_info() {
    return Api.get(`/user`)
  },
  companies() {
    return Api.get(`/companies`)
  },
  company_upd(data) {
    const {compId, compData} = data
    return Api.put(`/companies`, {company_id: compId, company_data: compData})
  },
  company_add(data) {
    const {compData} = data
    return Api.post(`/companies`, {company_data: compData})
  },
  company_del(data) {
    const {compId} = data
    return Api.delete(`/companies`, {data: {company_id: compId}})
  },
  administrators() {
    return Api.get(`/administrators`)
  },
  user_upd(data) {
    const {userId, userData} = data
    return Api.put(`/administrators`, {user_id: userId, user_data: userData})
  },
  user_add(data) {
    const {userData} = data
    return Api.post(`/administrators`, {user_data: userData})
  },
  user_del(data) {
    const {userId} = data
    return Api.delete(`/administrators`, {data: {user_id: userId}})
  },
  videos() {
    return Api.get(`/videos`)
  }
}
