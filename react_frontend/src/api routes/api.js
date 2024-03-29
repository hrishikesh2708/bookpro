import axios from "axios";

export const get_books = async() => {
    const data = await axios.get(`${process.env.REACT_APP_LOCALHOST}/api/getbook`)
    // console.log(" api call", data)
    return data
}
export const get_my_books = async(token) => {
    const data = await axios.get(`${process.env.REACT_APP_LOCALHOST}/api/privateBook` , { headers : {Authorization : token}})
    // console.log(" api call", data)
    return data
}
export const dbupdate = async(req) => {
    const data = await axios.get(`${process.env.REACT_APP_LOCALHOST}/api/boook`)
    return data 
}
export const add = async(req) => {
    const data = await axios.post(`${process.env.REACT_APP_LOCALHOST}/api/book-addition`,req)
    return data 
}
export const modify = async(req) => {
    const data = await axios.put(`${process.env.REACT_APP_LOCALHOST}/api/book-modify`,req)
    return data 
}

export const googleLogin = async(req) => {
    const data = await axios.post(`${process.env.REACT_APP_LOCALHOST}/api/users/googleLogin`,req)
    return data 
}

export const login = async(req) => {
    const data = await axios.post(`${process.env.REACT_APP_LOCALHOST}/api/users/login`,req)
    return data 
}
export const signIn = async(req) => {
    const data = await axios.post(`${process.env.REACT_APP_LOCALHOST}/api/users/register`,req)
    return data 
}
export const Deleted = async(req) => {
    const data = await axios.delete(`${process.env.REACT_APP_LOCALHOST}/api/book-delete/${req}`)
    return data 
}