import React from 'react';
import './ImgPicker.css';
import { Camera, Close } from '../../../../../logical/consts/icons';

const ImgPicker = ({ 
    id,
    label, 
    selectedImage,
    handleImageChange,
    handleCloseSelected
}) => {
    return (
        <div className="ImgPicker">
            <form style={{width: '100%', height: '100%'}}>
                
                    {selectedImage ? (
                        
                        <div className="img-picker-container">
                            <img src={selectedImage} alt="Selected" className="selected-image" />
                            <div>
                                <Close  onClick={() => handleCloseSelected(id)}  className='selected-img-close'/>
                            </div>
                        </div>
                    ) : (
                        <div className="img-else">
                            <label htmlFor={`img-${id}`}>
                                <Camera  style={{ fontSize: '50px', color: 'gray' }} />
                            </label>
                            <span className="img-input-label">{label}</span>
                        </div>
                    )}
                
                <input 
                    type="file" 
                    id={`img-${id}`} 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleImageChange(e, id)} 
                    accept="image/*" 
                />
            </form>
        </div>
    );
};

export default ImgPicker;
