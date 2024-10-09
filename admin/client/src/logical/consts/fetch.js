import axios from "axios";

export const handleFetchAllUsers = async (baseUrl,finalUrl) => {
    let userId = localStorage.getItem('userId');
    userId = parseInt(userId, 10);
    try{
        const result = await axios.get(`${baseUrl}/${finalUrl}?userId=${userId}`);
        return result.data;
    }catch(err){
        throw err;
    }
}

export const handleFetchOneUser = async (baseUrl,finalUrl,id) => {
    try{
        const result  = await axios.get(`${baseUrl}/${finalUrl}?id=${id}`);
        return result.data;
    }catch(err){
        throw err;
    }
}