import axios from "../axios";

const handleLoginApi = (email,password) => {
    return axios.post('/api/login', {
        email: email,
        password: password
    });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/getAllUsers?id=${inputId}`,{
        id : inputId
    })
}
// const check = () => {
//     return axios.get('/check')
// }


export {handleLoginApi , getAllUsers}