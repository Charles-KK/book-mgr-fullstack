// 这里 不需要结构语法是因为 axios包导出时时用export default
import axios from "axios"

export const register = (account, password) => {
  axios.post('http://localhost:3000/auth/register',{
    account, password
  })
}

export const login = (account, password) => {
  axios.post('http://localhost:3000/auth/login',{
    account, password
  })
}


