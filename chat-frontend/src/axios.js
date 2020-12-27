import axios from "axios"


const instance = axios.create({
    baseURL: "https://chat-it-up-anywhere.herokuapp.com", 
    
})

export default instance

//https://chat-it-up-anywhere.herokuapp.com
//http://localhost:9000