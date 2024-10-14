import React, { useEffect, useState } from 'react';
import './AddVariant.css';
import '../../../css/common.css';
import Layer from '../Layer';
import DropdownDemo from '../../global/select/Select';
import { variantTypeUrl } from '../../../../logical/consts/apiUrl';
import { handleFetchAllVariantTypes } from '../../../../logical/variantType/fetch';
import { handleAddVariant } from '../../../../logical/variant/AddVariant';
import { ToastContainer, toast } from 'react-toastify';
const AddVariant = ({
    handleHidePopUp,
    showAddVariant,
    reload,
    setReload
}) => {
    //sub categories state
    const [variantTypeNames, setVariantTypeNames] = useState([]);
    const [variantValue,setvariantTypeValue] = useState('');
    const [variantItem,setVariantItem] = useState([]);

    const[variantType,setVariantType] = useState([]);
    useEffect(() => {
        // Get categories data
        const getAllVariantType = async () => {
            try {
                const variantTypeData = await handleFetchAllVariantTypes(variantTypeUrl, 'all');
                setVariantType(variantTypeData); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getAllVariantType();
    }, []);

    useEffect(()=> {
        variantType.map((variantName) =>{
            setVariantTypeNames(prevState => ([
                ...prevState,
                variantName.name
            ]));
        });
    },[variantType]);


    const [variant,setVariant] = useState(null);
    const uploadNewVariant = async () => {
        try{
            const newResponse = await handleAddVariant(
                variant,
                variantValue
            );
            if(newResponse.type === 'error'){
                toast.error(newResponse.message); 
            }
            else{
                setReload(!reload);
                toast.success(newResponse.message); 
                
            }
        }catch(err) {
            toast.error(err);
        }
    };

    return (
        <>
            {showAddVariant && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddVariant popup-css ${showAddVariant ? 'show-variant-type' : 'hide'}`}>
                <div className="AddVariant-title">
                    <span>ADD VARIANT</span>
                </div>
                <div className="AddVariant-container">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {variantTypeNames}
                            placeholder={'Select Variant Type'}
                            value={variantValue}
                            setValue={setvariantTypeValue}
                            items={variantItem}
                            setItems={setVariantItem}
                        />
                        <input className='input-css' type="text" placeholder='Variant Name' onChange={(e) => setVariant(e.target.value)} value={variant}/>
                    <div className="AddVariant-form-btn">
                        <button className="AddVariant-form-btn-item cancel">Cancel</button>
                        <button className="AddVariant-form-btn-item submit" onClick={uploadNewVariant}>Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddVariant