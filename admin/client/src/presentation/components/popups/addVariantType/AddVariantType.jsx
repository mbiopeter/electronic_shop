import React, { useState } from 'react';
import './AddVariantType.css';
import '../../../css/common.css';
import Layer from '../Layer';
import { ToastContainer, toast } from 'react-toastify';
import { handleAddVariantType } from '../../../../logical/variantType/AddVariantType';
const AddVariantType = ({
    handleHidePopUp,
    showAddVariantType,
    reload,
    setReload
}) => {
    const [variantType,setAddVariantType] = useState(null);
    const uploadNewVariantType = async () => {
        try{
            const newResponse = await handleAddVariantType(
                variantType
            );
            console.log(newResponse);
            if(newResponse.type === 'error'){
                toast.error(newResponse.message); 
            }
            else{
                toast.success(newResponse.message); 
                setReload(!reload);
            }
        }catch(err) {
            toast.error(err);
        }
    };

    return (
        <>
            <ToastContainer />
            {showAddVariantType && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddVariantType popup-css ${showAddVariantType ? 'show-variant' : 'hide'}`}>
                <div className="AddVariantType-title">
                    <span>ADD VARIANT TYPE</span>
                </div>
                <div className="AddVariantType-container">
                    <input className='input-css' type="text" placeholder='Variant Type' onChange={(e) => setAddVariantType(e.target.value)} value={variantType}/>
                    <div className="AddVariantType-form-btn">
                        <button className="AddVariantType-form-btn-item cancel">Cancel</button>
                        <button className="AddVariantType-form-btn-item submit" onClick={uploadNewVariantType}>Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddVariantType