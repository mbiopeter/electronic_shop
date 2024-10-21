import axios from 'axios';
import { emailUrl } from '../consts/apiUrl';

export const sendEmail = async (sender, receiver, copyTo, subject, body) => {

    const formData = {
        from: sender,
        to: receiver,
        cc: copyTo,
        subject,
        body
    }
    let resp = {
        message: '',
        type: ''
    };

    try {
        const response = await axios.post(`${emailUrl}/send`, formData);
        resp.message = response.data.message;
        resp.type = 'success';

    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
    }

    return resp;
};
