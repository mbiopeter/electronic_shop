export const addNewProducts = (
    userInputs,
    productCategory,
    productSubCategory,
    productBrand,
    productVariant,
    productVariantType,
    productImages,
) => {
    //create a response object
    const response = [
        {
            id:1,
            fieldName:'product name',
            status:true,
            message:'',
        },
        {
            id:2,
            fieldName:'product description',
            status:true,
            message:'',
        },
        {
            id:3,
            fieldName:'product price',
            status:true,
            message:'',
        },
        {
            id:4,
            fieldName:'product offer price',
            status:true,
            message:'',
        },
        {
            id:5,
            fieldName:'product quantity',
            status:true,
            message:'',
        },
        {
            id:6,
            fieldName:'product category',
            status:true,
            message:'',
        },
        {
            id:7,
            fieldName:'product sub category',
            status:true,
            message:'',
        },
        {
            id:8,
            fieldName:'product brand',
            status:true,
            message:'',
        },
        {
            id:9,
            fieldName:'product varient',
            status:true,
            message:'',
        },
        {
            id:10,
            fieldName:'product varient value',
            status:true,
            message:'',
        }
    ];
   //user inputs array
    const userInputsArray = [
        userInputs.productName,
        userInputs.productDescription,
        userInputs.productPrice,
        userInputs.productOfferPrice,
        userInputs.productQuantity,
        productCategory,
        productSubCategory,
        productBrand,
        productVariant,
        productVariantType,
    ];
    //verifiy the user inputs
    for(var i = 0; i < userInputsArray.length; i++) {
        if(userInputsArray[i] === '' ||  userInputsArray[i] === 0){
            response[i].status=false;
            response[i].message = 'Input field cannot be empty';
        }
        else if(i >= 2 && i <=4 &&  isNaN(userInputsArray[i])  ) {
            response[i].status=false;
            response[i].message = 'Input field cannot be a string'; 
        }
        else{
            response[i].status=true;
            response[i].message = 'Success';
        }
    }
    
    
    return response;
};
