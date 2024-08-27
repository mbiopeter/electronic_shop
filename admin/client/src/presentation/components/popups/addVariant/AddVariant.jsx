import React, { useEffect, useState } from 'react';
import './AddVariant.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import DropdownDemo from '../../global/select/Select';
import { variantType } from '../../../../data/variantType/table_data';
const AddVariant = ({
    handleHidePopUp,
    showAddVariant
}) => {
    const [selectedImages, setSelectedImages] = useState();
    //sub categories state
    const [variantTypeNames, setVariantTypeNames] = useState([]);
    const [variantValue,setvariantTypeValue] = useState('');
    const [variantItem,setVariantItem] = useState([]);
    //set Image
    const handleImageChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    //unset Image
    const handleCloseSelected = (id) => {
        setSelectedImages(null);
    }
    useEffect(()=> {
        //set sub categories Names
        variantType.map((variantName) =>{
            setVariantTypeNames(prevState => ([
                ...prevState,
                variantName.type
            ]));
        });
    },[])
    return (
        <>
            {showAddVariant && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddVariant popup-css ${showAddVariant ? 'show-brands' : 'hide'}`}>
                <div className="AddVariant-title">
                    <span>ADD VARIANT</span>
                </div>
                <div className="AddVariant-container">
                    <div className="AddVariant-container-img-container">
                        <ImgPicker 
                            label="Variant"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <div className="AddVariant-input-container">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {variantTypeNames}
                            placeholder={'Select Variant Type'}
                            value={variantValue}
                            setValue={setvariantTypeValue}
                            items={variantItem}
                            setItems={setVariantItem}
                        />
                        <input className='input-css' type="text" placeholder='Variant Name' />
                    </div>
                    
                    <div className="AddVariant-form-btn">
                        <button className="AddVariant-form-btn-item cancel">Cancel</button>
                        <button className="AddVariant-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddVariant