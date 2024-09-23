import axios from 'axios';
export const handleDeleteApi = async (baseUrl,finalUrl,id) => {
    try{
        const response = await axios.delete(`${baseUrl}/${finalUrl}`, {
            params: { id }
        });
        return response.data;
    }catch(error){
        throw error;
    }
}