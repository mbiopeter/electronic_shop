import axios from 'axios';
import { productsUrl } from '../consts/apiUrl';
export const addNewProducts = async (
    userInputs,
    productCategory,
    productSubCategory,
    productBrand,
    productVariant,
    productVariantType,
    productImages,
) => {
    const formData = new FormData();

    // Append all the products details to the form data
    formData.append('name', userInputs.productName);
    formData.append('description', userInputs.productDescription);
    formData.append('category', productCategory);
    formData.append('subCategory', productSubCategory);
    formData.append('brand', productBrand);
    formData.append('price', userInputs.productPrice);
    formData.append('offerPrice', userInputs.productOfferPrice);
    formData.append('quantity', userInputs.productQuantity);
    formData.append('variantType', productVariantType);
    formData.append('variant', JSON.stringify(productVariant));

    // Append product images to the form data
    Object.keys(productImages).forEach((key) => {
        const imageData = productImages[key];
        if (imageData) {
            // Convert base64 to Blob to append it as a file
            const byteString = atob(imageData.split(',')[1]);
            const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            formData.append('images', blob, `image_${key}.jpg`);
        }
    });
    let resp = {
        message: '',
        type: ''
    };

    try {
        const response = await axios.post(`${productsUrl}/addNew`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        resp.message = response.data.message;
        resp.type = 'success';
    } catch (error) {
        resp.message = error.response?.data?.error || 'An error occurred';
        resp.type = 'error';
    }

    return resp;
};

