import axios from 'axios';
import { notificationUrl } from '../consts/apiUrl';

export const addNotification = async (name, desc, image) => {

    const formData = new FormData();
    if (image) {
        // Convert base64 to Blob to append it as a file
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('images', blob, `image_${Date.now()}.jpg`);
    }
    formData.append('name', name);
    formData.append('description', desc);

    let resp = {
        message: '',
        type: ''
    };

    try {
        const response = await axios.post(`${notificationUrl}/addNew`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
    }

    return resp;
};
