// 这里 不需要结构语法是因为 axios包导出时时用export default
import axios from "axios"

// 前端接口的字段名要和后端接口对上。这样在后端才能直接用getbody和「解构语法」取出来               
export const register = (account, password, inviteCode) => {
 return axios.post('http://localhost:3000/auth/register',{
  account, password, inviteCode
})
}

export const login = (account, password) => {
  return axios.post('http://localhost:3000/auth/login',{
    account, password
  })
}


