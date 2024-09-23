import axios from "axios";

export const handleFetchAllUsers = async (baseUrl,finalUrl) => {
    try{
        const result  = await axios.get(`${baseUrl}/${finalUrl}`);
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
