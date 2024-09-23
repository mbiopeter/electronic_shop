import axios from 'axios';

export const handleAddDetails = async (userDetails,baseUrl,finalUrl) => {
    try{
        const result  = await axios.post(`${baseUrl}/${finalUrl}`, userDetails);
        return result.data;
    }catch (error) {
        throw error
    }
}