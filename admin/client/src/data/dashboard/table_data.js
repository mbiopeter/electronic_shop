import axios from "axios";
import { productsUrl } from "../../logical/consts/apiUrl";

export const all_products = [
    {
        id:1,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
        ],
        name:'Samsung A53 Mobbile',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:2,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
        ],
        name:'Tecno Camon 20',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:3,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
        ],
        name:'Iphone 15 Pro Max',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:4,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Infinix Note 40 I',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:5,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Oppo A53',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
];

export const out_of_stock_products = [
    {
        id:1,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Samsung A53 Mobbile',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:2,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Tecno Camon 20',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    }
];

export const limited_stock_product = [
    {
        id:1,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Infinix Note 40 I',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    }  
];

export const other_stock_product = [
    {
        id:1,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Tecno Camon 20',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:2,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Iphone 15 Pro Max',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    },
    {
        id:3,
        img: 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/54/5806261/1.jpg?0708',
        imgs:[
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/11/5656471/1.jpg?5312',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/51/2570761/1.jpg?1728',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/28/8520362/1.jpg?7364',
            'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/8673732/1.jpg?3912',
        ],
        name:'Infinix Note 40 I',
        category:'Electronics',
        sub_category:'Mobile',
        brand:'Samsang',
        desc:'ROM: 128GB, RAM: 4GB+4GB, C to C 15 watts charger, 85GZ CPU, 52mpx Main camera, 12mpx Utra wide camera, 5mpx macro camera, Android 15 os',
        price:1500.0, 
        offerPrice:1200.0,
        quantity:10,
        variantType:[
            {
                id:1,
                name:'Color',
                values:['Red','Black','Yelow','Wite','Blue']
            }
        ],
    }
];

export const fetchProducts = async (category) => {
    let categoryUrl = '';
    try {
        const categories = [
            'allProducts',
            'outOfStockProducts',
            'limitedProducts',
            'otherProducts'
        ];
        const urls = [
            '/products',
            '/outofstock',
            '/limited',
            '/otherproducts'
        ];
        for (var i = 0; i < categories.length; i++) {
            if (category === categories[i]) {
                categoryUrl = `${productsUrl}${urls[i]}`;
                break;
            }
        }
        if (!categoryUrl) {
            throw new Error('Invalid category provided');
        }
        console.log(`Fetching data from: ${categoryUrl}`);

        // Fetch data 
        const response = await axios.get(categoryUrl);
        return response.data;

    } catch (error) {
        throw error;
    }
}