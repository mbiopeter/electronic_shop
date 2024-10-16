import axios from 'axios';
import { posterUrl } from '../consts/apiUrl';

export const addPoster = async (name, image) => {
    console.log(name);
    const formData = new FormData();
    if (image) {
        // Convert base64 to Blob to append it as a file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image_${Date.now()}.jpg`);
    }
    formData.append('name', name);

    let resp = {
        message: '',
        type: ''
    };
    console.log(formData);

    try {
        const response = await axios.post(`${posterUrl}/addNew`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
        console.log(error);
    }

    return resp;
};
