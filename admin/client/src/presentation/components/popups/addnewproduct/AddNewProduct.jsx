import React, { useEffect, useState } from 'react'
import './AddNewProduct.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import ImgPicker from './imgPicker/ImgPicker';
import { add_new_product_data } from '../../../../data/popup/newProduct';
import { categories } from '../../../../data/category/table_data';
import DropdownDemo from '../../global/select/Select';
import { subCategories } from '../../../../data/subCategory/table_data';
import { brands } from '../../../../data/brands/table_data';
import { addNewProducts } from '../../../../logical/dashboard/addNewProduct';
import { variantType } from '../../../../data/variantType/table_data';
import { varient } from '../../../../data/varient/table_data';
const AddNewProduct = ({
    handleHidePopUp,
    showAddNewProduct
}) => {

    const [selectedImages, setSelectedImages] = useState({});
    //categories state
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [categoryValue,setCategoriesValue] = useState('');
    const [categoryItem,setCategoryItem] = useState([]);
    //sub categories state
    const [subCategoriesNames, setSubCategoriesNames] = useState([]);
    const [subCategoryValue,setSubCategoriesValue] = useState('');
    const [subCategoryItem,setSubCategoryItem] = useState([]);
    //Brand state
    const [brandsNames, setBrandNames] = useState([]);
    const [brandValue,setBrandsValue] = useState('');
    const [brandItem,setBrandItem] = useState([]);
    //Varient type state
    const [variantName, setVarientType] = useState([]);
    const [varientValue,setVarientsValue] = useState('');
    const [varientItem,setVarientItem] = useState([]);
    //Varient item state
    const [varientItemsNames, setVarientItemNames] = useState([]);
    const [varientItemValue,setVarientItemsValue] = useState('');
    const [varientItemItem,setVarientItemItem] = useState([]);
    


    //set images
    const handleImageChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(prevState => ({
                    ...prevState,
                    [id]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    //close the selected Image
    const handleCloseSelected = (id) => {
        setSelectedImages(prevState => ({
            ...prevState,
            [id]: null,
        }));
    }

    useEffect(()=>{
        //set categories Names
        categories.map((categoryName) =>{
                return setCategoriesNames(prevState => ([
                    ...prevState,
                    categoryName.name
                ]));
            }
        );
        //set sub categories Names
        subCategories.map((subCategoryName) =>{
            return setSubCategoriesNames(prevState => ([
                ...prevState,
                subCategoryName.name
            ]));
        });
        //set Brands
        brands.map((brand) =>{
            return setBrandNames(prevState => ([
                ...prevState,
                brand.name
            ]));
        });
        //set Varient Type
        variantType.map((varient) =>{
            return setVarientType(prevState => ([
                ...prevState,
                varient.type
            ]));
        });
        //set Varient item
        varient.map((varientValueName) =>{
            return setVarientItemNames(prevState => ([
                ...prevState,
                varientValueName.name
            ]));
        });
    },[])


    //use state to store use input
    const [userInputs, setUserInputs] = useState({
        productName: "",
        productDescription: "",
        productPrice:0,
        productOfferPrice:0,
        productQuantity: 0,
    });
    const inputOnchange = (e,productDetail) => {
        setUserInputs(prevState => ({
                ...prevState,
                [productDetail]:e.target.value.trim(),
                
            })
        ); 
        
    }
    const[response,setResponse] = useState(null);
    //addnew product
    const uploadNewProduct = () => {
        const newResponse = addNewProducts(
            userInputs,
            categoryValue,
            subCategoryValue,
            brandValue,
            varientValue,
            varientItemValue,
            selectedImages
        );
        
        
        setResponse(newResponse);
    };
    console.log(selectedImages);
    return (
        <>
            {showAddNewProduct && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddNewProducts popup-css ${showAddNewProduct ? 'show-addProduct' : 'hide'}`}>
                <div className="AddNewProducts-title">
                    <span>ADD PRODUCT</span>
                </div>
                <div className="AddNewProducts-container">
                    <div className="AddNewProducts-container-img-container">
                        {add_new_product_data.map((input) => (
                            <ImgPicker 
                                error ={selectedImages === null ? false:true}
                                key={input.id}
                                id = {input.id}
                                label={input.label}
                                selectedImage={selectedImages[input.id]}
                                handleImageChange={handleImageChange}
                                handleCloseSelected = {handleCloseSelected}
                            />
                        ))}
                    </div>
                    <div className="AddNewProducts-form-one">
                        <input style={response  && response[0].status === false ? {borderColor:'var(--error-color)'}:null}  onChange={(e) => inputOnchange(e,'productName')} className='input-css' type="text" placeholder='Product Name'/>
                        <textarea style={response  && response[1].status === false ? {borderColor:'var(--error-color)'}:null}    onChange={(e) => inputOnchange(e,'productDescription')}  rows={4} placeholder='Product Name'></textarea>
                    </div>
                    <div className="AddNewProducts-form-two">
                        <DropdownDemo
                            error={response  && response[5].status === false }
                            width={'100%'}
                            allItems = {categoriesNames}
                            placeholder={'Select Category'}
                            value={categoryValue}
                            setValue={setCategoriesValue}
                            items={categoryItem}
                            setItems={setCategoryItem}
                        />
                        <DropdownDemo
                                error={response  && response[6].status === false }
                                width={'100%'}
                                allItems = {subCategoriesNames}
                                placeholder={'Select Sub Category'}
                                value={subCategoryValue}
                                setValue={setSubCategoriesValue}
                                items={subCategoryItem}
                                setItems={setSubCategoryItem}
                            />
                            <DropdownDemo
                                error={response  && response[7].status === false }
                                width={'100%'}
                                allItems = {brandsNames}
                                placeholder={'Select Brand'}
                                value={brandValue}
                                setValue={setBrandsValue}
                                items={brandItem}
                                setItems={setBrandItem}
                            />
                        <input  style={response  && response[2].status === false ? {borderColor:'var(--error-color)'}:null} onChange={(e) => inputOnchange(e,'productPrice')} className='input-css' type="text" placeholder='Price' />
                        <input style={response  && response[3].status === false ? {borderColor:'var(--error-color)'}:null} onChange={(e) => inputOnchange(e,'productOfferPrice')}  className='input-css' type="text" placeholder='Offer Price' />
                        <input style={response  && response[4].status === false ? {borderColor:'var(--error-color)'}:null} onChange={(e) => inputOnchange(e,'productQuantity')}  className='input-css' type="text" placeholder='Quantity' />
                    </div>
                    <div className="AddNewProducts-form-three">
                            <DropdownDemo
                                error={response  && response[8].status === false }
                                width={'100%'}
                                allItems = {variantName}
                                placeholder={'Select Varient Type'}
                                value={varientValue}
                                setValue={setVarientsValue}
                                items={varientItem}
                                setItems={setVarientItem}
                            />
                            <DropdownDemo
                                error={response  && response[9].status === false }
                                width={'100%'}
                                allItems = {varientItemsNames}
                                placeholder={'Select Item'}
                                value={varientItemValue}
                                setValue={setVarientItemsValue}
                                items={varientItemItem}
                                setItems={setVarientItemItem}
                            />
                    </div>
                    <div className="AddNewProducts-form-btn">
                        <button className="AddNewProducts-form-btn-item cancel">Cancel</button>
                        <button onClick={uploadNewProduct} className="AddNewProducts-form-btn-item submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewProduct