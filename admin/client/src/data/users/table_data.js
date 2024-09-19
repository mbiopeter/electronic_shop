import axios from 'axios';
import { usersUrl } from '../../logical/consts/apiUrl';
export const users = [
    {
        id:1,
        img:'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        firstName:'Peter',
        secondName:'Mbio',
        userName:'Mbiopeter14448',
        idno:'12345678',
        phone:'0787654321',
    },
    {
        id:2,
        img:'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        firstName:'Peter',
        secondName:'Mbio',
        userName:'Mbiopeter14448',
        idno:'12345678',
        phone:'0787654321',
    },
    {
        id:3,
        img:'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        firstName:'Peter',
        secondName:'Mbio',
        userName:'Mbiopeter14448',
        idno:'12345678',
        phone:'0787654321',
    },
    {
        id:4,
        img:'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        firstName:'Peter',
        secondName:'Mbio',
        userName:'Mbiopeter14448',
        idno:'12345678',
        phone:'0787654321',
    },
    {
        id:5,
        img:'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        firstName:'Peter',
        secondName:'Mbio',
        userName:'Mbiopeter14448',
        idno:'12345678',
        phone:'0787654321',
    },
];
export const handleFetchUsers = async () => {
    try {
        const response = await axios.get(`${usersUrl}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
