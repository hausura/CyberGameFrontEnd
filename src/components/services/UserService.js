import axios from "./CustomizeAxios";

const fetchAllUser =(page)=>{
    return axios.get(`/api/users?page=${page}`)
}
const postCreateUser =(FirstName,LastName,job)=>{
    return axios.post("/api/users",{FirstName,job})
}
const putUpdateUser =(FirstName,job) =>{
    return axios.post("/api/users",{FirstName,job})
}
const deleteUser = (id) =>{
    return axios.delete(`/api/users/${id}`)
}
const loginApi =(email,password) => {
    return axios.post("/api/login",{email,password})
}
const getUserById = (id) =>{
    return axios.get(`/api/users/${id}`,{id})

}

export {fetchAllUser,postCreateUser,putUpdateUser,deleteUser,loginApi,getUserById};