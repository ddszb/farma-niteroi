import axios from 'axios'
import Config from 'react-native-config'

const HttpService = axios.create({
    baseURL: "http://10.0.2.2:8080/api",
})

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  })
  
export default HttpService