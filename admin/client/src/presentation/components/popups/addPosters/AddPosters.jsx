import React, { useState } from 'react';
import './AddPosters.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { ToastContainer, toast } from 'react-toastify';
import { addPoster } from '../../../../logical/posters/AddPosters';
const AddPosters = ({
    handleHidePopUp,
    showAddPosters,
    reload,
    setReload
}) => {
    const [selectedImages, setSelectedImages] = useState();
    const [posterName,setPosterName] = useState();

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

    const handleCloseSelected = (id) => {
        setSelectedImages(null);
    }
    const uploadnewPoster = async () => {
        try{
            const newResponse = await addPoster(
                posterName,
                selectedImages
            );
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
            {showAddPosters && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddPosters popup-css ${showAddPosters ? 'show-posters' : 'hide'}`}>
                <div className="AddPosters-title">
                    <span>ADD POSTER</span>
                </div>
                <div className="AddPosters-container">
                    <div className="AddPosters-container-img-container">
                        <ImgPicker 
                            label="Poster"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <input onChange={(e) => setPosterName(e.target.value)} value={posterName} className='input-css' type="text" placeholder='Poster Category' />
                    <div className="AddPosters-form-btn">
                        <button className="AddPosters-form-btn-item cancel">Cancel</button>
                        <button className="AddPosters-form-btn-item submit" onClick={uploadnewPoster}>Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddPosters