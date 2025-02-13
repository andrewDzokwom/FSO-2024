import axios from "axios";
const baseUrl = `/api/persons`

const getAll = ()=>{
    return(
        axios
            .get(baseUrl)
            .then(response => response.data)
    )
}

const createPerson = newPerson =>{
    return axios
            .post(baseUrl, newPerson)
            .then(response=> response.data)
}

const removePerson = id =>{
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}
const updatePerson = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data)
}

export default {getAll, createPerson, removePerson, updatePerson}