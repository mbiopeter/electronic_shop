import axios from "axios";

export const handleFetchAllCategories = async (baseUrl, finalUrl) => {
    try {
        const result = await axios.get(`${baseUrl}/${finalUrl}`);
        return result.data;
    } catch (err) {
        throw err;
    }
}