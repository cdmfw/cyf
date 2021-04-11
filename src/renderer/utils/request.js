import axios from 'axios'
import cookie from "./cookie";
const HOST = 'http://localhost'
const PORT = 11015
const instance = axios.create({
  baseURL: `${HOST}:${PORT}`,
  timeout: 30000,
  withCredentials: true,
})

instance
  .interceptors
  .request
  .use(config => {
    if (!config.params) config.params = {}
    if (!config.params.cookie) config.params.cookie = cookie.value
    return config
}, error => {
  console.log(error)
})

instance
  .interceptors
  .response
  .use(result => result.data)

export default instance
