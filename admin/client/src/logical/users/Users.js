import axios from "axios";
import { usersUrl } from "../consts/apiUrl";

export const handleApiSwitchChange = async (roleId, value, userId) => {
    try {
        // Check if userId and roleId are provided (don't check value here)
        if (!userId || !roleId) {
            return {
                message: 'Invalid Request'
            };
        }
        // Handle a true switch state
        if (value === true) {
            const result = await axios.post(`${usersUrl}/role/assign?userId=${userId}&roleId=${roleId}`);
            return result.data;
        }
        // Handle a false switch state
        if (value === false) {
            const result = await axios.post(`${usersUrl}/role/revoke?userId=${userId}&roleId=${roleId}`);
            return result.data;
        }
    } catch (error) {
        throw error;
    }
};
