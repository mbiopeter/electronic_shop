import axios from 'axios';
import { usersUrl } from '../consts/apiUrl';

export const handleAddUser = async (userDetails) => {
    try{
        const result  = await axios.post(`${usersUrl}/register`, userDetails);
        return result.data;
    }catch (error) {
        throw error
    }
}