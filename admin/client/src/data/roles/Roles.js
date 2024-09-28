import axios from 'axios';
export const addSystemVariables = [
    {
        id: 101,
        name: 'create products',
    },
    {
        id: 102,
        name: 'create category',
    },
    {
        id: 103,
        name: 'create sub category',
    },
    {
        id: 104,
        name: 'create brands',
    },
    {
        id: 105,
        name: 'create variant type',
    },
    {
        id: 106,
        name: 'create variant',
    },
    {
        id: 107,
        name: 'create coupon',
    },
    {
        id: 108,
        name: 'create posters',
    },
    {
        id: 109,
        name: 'send notifications',
    },
    {
        id: 110,
        name: 'send emails',
    },
    {
        id: 111,
        name: 'create users',
    },
];

export const editSystemVariables = [
    {
        id: 201,
        name: 'edit products',
    },
    {
        id: 202,
        name: 'edit category',
    },
    {
        id: 203,
        name: 'edit sub category',
    },
    {
        id: 204,
        name: 'edit brands',
    },
    {
        id: 205,
        name: 'edit orders',
    },
    {
        id: 206,
        name: 'edit users',
    },
];

export const viewDetails = [
    {
        id: 301,
        name: 'all products',
    },
    {
        id: 302,
        name: 'out of stock',
    },
    {
        id: 303,
        name: 'limited stock',
    },
    {
        id: 304,
        name: 'other stock',
    },
    {
        id: 305,
        name: 'order percentage',
    },
    {
        id: 306,
        name: 'all orders',
    },
    {
        id: 307,
        name: 'pending orders',
    },
    {
        id: 308,
        name: 'processed orders',
    },
    {
        id: 309,
        name: 'cancelled orders',
    },
    {
        id: 310,
        name: 'shipped orders',
    },
    {
        id: 311,
        name: 'returned orders',
    },
    {
        id: 312,
        name: 'all categories',
    },
    {
        id: 313,
        name: 'all sub categories',
    },
    {
        id: 314,
        name: 'all brands',
    },
    {
        id: 315,
        name: 'all emails',
    },
    {
        id: 316,
        name: 'product details',
    },
    {
        id: 317,
        name: 'category details',
    },
    {
        id: 318,
        name: 'sub category details',
    },
    {
        id: 319,
        name: 'brand details',
    },
    {
        id: 320,
        name: 'users details',
    },
    {
        id: 321,
        name: 'all variant types',
    },
    {
        id: 322,
        name: 'all variants',
    },
    {
        id: 323,
        name: 'all orders',
    },
    {
        id: 324,
        name: 'all coupon codes',
    },
    {
        id: 325,
        name: 'all posters',
    },
    {
        id: 326,
        name: 'all notifications',
    },
    {
        id: 327,
        name: 'all users',
    },
];

export const settings = [
    {
        id: 401,
        name: 'basic info',
    },
    {
        id: 402,
        name: 'roles',
    },
    {
        id: 403,
        name: 'notifications',
    },
];

export const deleteItems = [
    {
        id: 501,
        name: 'remove products'
    },
    {
        id: 502,
        name: 'remove categories'
    },
    {
        id: 503,
        name: 'remove sub categories'
    },
    {
        id: 504,
        name: 'remove brands',//
    },
    {
        id: 505,
        name: 'remove variant type',
    },
    {
        id: 506,
        name: 'remove variant',
    },
    {
        id: 507,
        name: 'remove order',//
    },
    {
        id: 508,
        name: 'remove coupon',//
    },
    {
        id: 509,
        name: 'remove poster',//
    },
    {
        id: 510,
        name: 'remove notification',
    },
    {
        id: 511,
        name: 'remove user',//
    },
];


export const fetchUserRoles = async (userId) => {
    if (!userId) {
        console.log('Error: User ID is not provided.');
        return null; // Or you can throw an error or handle it based on your use case
    }

    const systemRoles = {
        addSystemVariables: addSystemVariables,
        editSystemVariables: editSystemVariables,
        viewDetails: viewDetails,
        settings: settings,
        deleteItems: deleteItems,
    };

    try {
        const response = await axios.post(
            `http://localhost:4000/api/users/roles`,
            { userId, systemRoles },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response) {
            console.log('Failed to fetch user assigned roles');
            return null; // Ensure null is returned if response is not valid
        }

        return response.data;
    } catch (err) {
        console.error('Error while fetching user roles:', err);
        throw err;
    }
};
export const fetchCurrentUserRoles = async () => {
    try {

        const userId = localStorage.getItem('userId');
        if (!userId) {

            console.log('User is not logged in');
            return null;
        }

        const userRoles = await fetchUserRoles(userId);
        return userRoles;
    } catch (err) {
        console.error('Error while fetching current user roles:', err);
        throw err;
    }
};
