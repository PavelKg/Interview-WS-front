import axios from 'axios'

const API_ROOT = 'https://dev.pepex.kg/api'

const Api = axios.create({
  baseURL: API_ROOT,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer`
  }
})

export default {
  setHeaderAuth (token) {
    Api.defaults.headers['Authorization'] = `Bearer ${token}`
  },
  delHeaderAuth (token) {
    delete Api.defaults.headers.common['Authorization']
  },
  login (data) {
    const { personalId, companyId, password } = data
    return Api.post(`/login`, { personal_id: personalId, company_id: companyId, password })
  },
  user_info () {
    return Api.get(`/user`)
  },
  companies () {
    return Api.get(`/companies`)
  },
  company_upd (data) {
    const {compId, compData} = data
    console.log('compId=', compId, 'compData=', compData)
    return Api.put(`/companies`, {company_id: compId, compData})
  },
  company_add (data) {
    const {compData} = data
    return Api.put(`/companies`, {compData})
  }

}
