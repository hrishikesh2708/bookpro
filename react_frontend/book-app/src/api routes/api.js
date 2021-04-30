import axios from "axios";

export const get_books = async() => {
    const data = await axios.get(`${process.env.REACT_APP_LOCALHOST}/api/getbook`)
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