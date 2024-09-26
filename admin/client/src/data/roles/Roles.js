import axios from 'axios';
import { usersUrl } from '../../logical/consts/apiUrl'
export const addSystemVariables = [
    {
        id: 101,
        name: 'create products',
        allowed: false
    },
    {
        id: 102,
        name: 'create category',
        allowed: false
    },
    {
        id: 103,
        name: 'create sub category',
        allowed: true
    },
    {
        id: 104,
        name: 'create brands',
        allowed: true
    },
    {
        id: 105,
        name: 'create variant type',
        allowed: true
    },
    {
        id: 106,
        name: 'create variant',
        allowed: true
    },
    {
        id: 107,
        name: 'create coupon',
        allowed: true
    },
    {
        id: 108,
        name: 'create posters',
        allowed: true
    },
    {
        id: 109,
        name: 'send notifications',
        allowed: true
    },
    {
        id: 110,
        name: 'send emails',
        allowed: true
    },
    {
        id: 111,
        name: 'create users',
        allowed: true
    },
];

export const editSystemVariables = [
    {
        id: 201,
        name: 'edit products',
        allowed: true
    },
    {
        id: 202,
        name: 'edit category',
        allowed: true
    },
    {
        id: 203,
        name: 'edit sub category',
        allowed: true
    },
    {
        id: 204,
        name: 'edit brands',
        allowed: true
    },
    {
        id: 205,
        name: 'edit orders',
        allowed: true
    },
    {
        id: 206,
        name: 'edit users',
        allowed: true
    },
];

export const viewDetails = [
    {
        id: 301,
        name: 'all products',
        allowed: true
    },
    {
        id: 302,
        name: 'out of stock',
        allowed: true
    },
    {
        id: 303,
        name: 'limited stock',
        allowed: true
    },
    {
        id: 304,
        name: 'other stock',
        allowed: true
    },
    {
        id: 305,
        name: 'order percentage',
        allowed: true
    },
    {
        id: 306,
        name: 'all orders',
        allowed: true
    },
    {
        id: 307,
        name: 'pending orders',
        allowed: true
    },
    {
        id: 308,
        name: 'processed orders',
        allowed: true
    },
    {
        id: 309,
        name: 'cancelled orders',
        allowed: true
    },
    {
        id: 310,
        name: 'shipped orders',
        allowed: true
    },
    {
        id: 311,
        name: 'returned orders',
        allowed: true
    },
    {
        id: 312,
        name: 'all categories',
        allowed: true
    },
    {
        id: 313,
        name: 'all sub categories',
        allowed: true
    },
    {
        id: 314,
        name: 'all brands',
        allowed: true
    },
    {
        id: 315,
        name: 'all emails',
        allowed: true
    },
    {
        id: 316,
        name: 'product details',
        allowed: true
    },
    {
        id: 317,
        name: 'category details',
        allowed: true
    },
    {
        id: 318,
        name: 'sub category details',
        allowed: true
    },
    {
        id: 319,
        name: 'brand details',
        allowed: true
    },
    {
        id: 320,
        name: 'users details',
        allowed: true
    },
    {
        id: 321,
        name: 'all variant types',
        allowed: true
    },
    {
        id: 322,
        name: 'all variants',
        allowed: true
    },
    {
        id: 323,
        name: 'all orders',
        allowed: true
    },
    {
        id: 324,
        name: 'all coupon codes',
        allowed: true
    },
    {
        id: 325,
        name: 'all posters',
        allowed: true
    },
    {
        id: 326,
        name: 'all notifications',
        allowed: true
    },
    {
        id: 327,
        name: 'all users',
        allowed: true
    },
];

export const settings = [
    {
        id: 401,
        name: 'basic info',
        allowed: true
    },
    {
        id: 402,
        name: 'roles',
        allowed: true
    },
    {
        id: 403,
        name: 'notifications',
        allowed: true
    },
];

export const fetchUserRoles = async (
    userId
) => {
    const systemRoles = {
        addSystemVariables: addSystemVariables,
        editSystemVariables: editSystemVariables,
        viewDetails: viewDetails,
        settings: settings
    }
    try {

        const response = await axios.post(`http://localhost:4000/api/users/roles`, { userId, systemRoles }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response) {
            console.log('Failed to fetch user assigned roles')
        }
        return response.data;
    }
    catch (err) {
        throw err;
    }
};
