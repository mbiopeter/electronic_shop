import React, { useEffect } from 'react';
import './Details.css';
import '../../css/common.css';
import { useState } from 'react';
import DetailsChart from '../../components/details/detailsChart/DetailsChart';
import { descriptionOverview } from '../../../data/details/detailsData';
import DetailsDescription from '../../components/details/detailsDescription/DetailsDescription';
import EditProducts from '../../components/details/editProducts/EditProducts';
import SubHeading from '../../components/global/subheading/SubHeading';
import AddNewProduct from '../../components/popups/addnewproduct/AddNewProduct';
import { useLocation } from 'react-router-dom';
import EditCategory from '../../components/details/editCategory/EditCategory';
import AddCategory from '../../components/popups/addcategory/AddCategory';
import EditSubCategory from '../../components/details/editSubCategory/EditSubCategory';
import AddSubCategory from '../../components/popups/addSubCategory/AddSubCategory';
import EditBrand from '../../components/details/editBrand/EditBrand';
import AddBrands from '../../components/popups/addBrands/AddBrands';
import { brands } from '../../../data/brands/table_data';
import { subCategories } from '../../../data/subCategory/table_data';
import { categories } from '../../../data/category/table_data';

const Details = () => {
    const numberOfcharts = [4];
    const [showAddNewProduct, setShowAddNewProduct] = useState(false);
    const[currentPage,setCurrentPage] = useState();
    const[currentId,setCurrentId] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    
    useEffect(() => {
        if(pathSegments[1] === 'details'){
            setCurrentPage(pathSegments[1])
            setCurrentId(pathSegments[3]);
        }
        else if(pathSegments[1] === 'category' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[1])
            setCurrentId(pathSegments[3]);
        }
        else if(pathSegments[1] === 'subCategory' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[1])
            setCurrentId(pathSegments[3]);
        }
        else if(pathSegments[1] === 'brands' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[1])
            setCurrentId(pathSegments[3]);
        }
        
    },[])
    const handleAddNew = () => {
        setShowAddNewProduct(true);
    }

    const handleHidePopUp = () => {
        setShowAddNewProduct(false);
    }
    return (
        <>
            {currentPage === 'details' && (
                <AddNewProduct
                    handleHidePopUp={handleHidePopUp} 
                    showAddNewProduct={showAddNewProduct} 
                />
            )}
            {currentPage === 'category' && (
                <AddCategory 
                    handleHidePopUp={handleHidePopUp} 
                    showAddNewProduct={showAddNewProduct} 
                />
            )}
            {currentPage === 'subCategory' && (
                <AddSubCategory 
                    handleHidePopUp={handleHidePopUp} 
                    showAddSubCategory={showAddNewProduct} 
                />
            )}
            {currentPage === 'brands' && (
                <AddBrands
                    handleHidePopUp={handleHidePopUp} 
                    showAddBrands={showAddNewProduct} 
                />
            )}
            <SubHeading 
                handleAddNew={handleAddNew}
                title={
                    currentPage === 'brands' 
                    ? `${brands[currentId - 1].name} Analytical Details`
                    : currentPage === 'subCategory' 
                    ? `${subCategories[currentId - 1].name} Analytical Details`
                    :  currentPage === 'category'
                    ? `${categories[currentId - 1].name} Analytical Details`
                    : null
                }
            />        
            <div className='Details'>
                <div className="right-details">
                    <div className="right-details-description">
                        {descriptionOverview.map((desc) =>(
                            <DetailsDescription   name={desc.name} value={desc.value}/>
                        ) )}
                    </div>
                    {numberOfcharts.map((chart) => (
                        <DetailsChart/>
                    ))}

                </div>
                <div className="left-details">
                    {currentPage === 'details' && (
                        <EditProducts />
                    )}
                    {currentPage === 'category' && (
                        <EditCategory />
                    )}
                    {currentPage === 'subCategory' && (
                        <EditSubCategory />
                    )}
                    {currentPage === 'brands' && (
                        <EditBrand />
                    )}

                </div>
            </div>
        </>
    )
}

export default Details