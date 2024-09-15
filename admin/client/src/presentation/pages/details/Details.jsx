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
import { handleCheckRole } from '../../../logical/settings/Roles';
import { editSystemVariables, viewDetails } from '../../../data/roles/Roles';

const Details = ({
    products
}) => {
    const numberOfcharts = [4];
    const [showAddNewProduct, setShowAddNewProduct] = useState(false);
    const[currentPage,setCurrentPage] = useState();
    const[currentId,setCurrentId] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');

    //roles usestate
    const[editProductRole,setEditproductRole] = useState(false);
    const[viewProductDetailsRole, setViewProductDetailsRole] = useState(false);

    const[editCategoryRole,setEditCategoryRole] = useState(false);
    const[viewCategoryDetailsRole, setViewCategoryDetailsRole] = useState(false);

    const[editSubCategoryRole,setEditSubCategoryRole] = useState(false);
    const[viewSubCategoryDetailsRole, setViewSubCategoryDetailsRole] = useState(false);

    const[editBrandsRole,setEditBrandsRole] = useState(false);
    const[viewBrandsDetailsRole, setViewBrandsDetailsRole] = useState(false);

    //roles state array
    const viewDetailsRolesArray = [
        {
            id:1,
            data:viewProductDetailsRole,
            currentPage:'details'
        },
        {
            id:2,
            data:viewCategoryDetailsRole,
            currentPage:'category'
        },
        {
            id:3,
            data:viewSubCategoryDetailsRole,
            currentPage:'subCategory'
        },
        {
            id:4,
            data:viewBrandsDetailsRole,
            currentPage:'brands'
        },
    ]
    
    useEffect(() => {
        if(pathSegments[1] === 'details'){
            setCurrentPage(pathSegments[1])
            setCurrentId(pathSegments[2]);
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

    //check and set user roles
    useEffect(() => {
        //product 
        setEditproductRole(handleCheckRole(editSystemVariables,'edit products'));
        setViewProductDetailsRole(handleCheckRole(viewDetails,'product details'));
        //category
        setEditCategoryRole(handleCheckRole(editSystemVariables,'edit category'));
        setViewCategoryDetailsRole(handleCheckRole(viewDetails,'category details'));
        //sub category
        setEditSubCategoryRole(handleCheckRole(editSystemVariables,'edit sub category'));
        setViewSubCategoryDetailsRole(handleCheckRole(viewDetails,'sub category details'));
        //Brands
        setEditBrandsRole(handleCheckRole(editSystemVariables,'edit brands'));
        setViewBrandsDetailsRole(handleCheckRole(viewDetails,'brand details'));
    },[]);
    return (
        <>
            {currentPage === 'details' &&  editProductRole &&(
                <AddNewProduct
                    handleHidePopUp={handleHidePopUp} 
                    showAddNewProduct={showAddNewProduct} 
                />
            )}
            {currentPage === 'category' && editCategoryRole && (
                <AddCategory 
                    handleHidePopUp={handleHidePopUp} 
                    showAddNewProduct={showAddNewProduct} 
                />
            )}
            {currentPage === 'subCategory' && editSubCategoryRole && (
                <AddSubCategory 
                    handleHidePopUp={handleHidePopUp} 
                    showAddSubCategory={showAddNewProduct} 
                />
            )}
            {currentPage === 'brands' && editBrandsRole &&(
                <AddBrands
                    handleHidePopUp={handleHidePopUp} 
                    showAddBrands={showAddNewProduct} 
                />
            )}
            <SubHeading 
                handleAddNew={handleAddNew}
                title={
                    currentPage === 'brands' 
                    ? `${brands[currentId - 1].name}  `
                    : currentPage === 'subCategory' 
                    ? `${subCategories[currentId - 1].name}  `
                    :  currentPage === 'category'
                    ? `${categories[currentId - 1].name}  `
                    :  currentPage === 'details' && products.length > 0
                    ? `${products[currentId - 1].name}  `
                    : null
                }
                assignedRole={
                    currentPage === 'details'
                    ? editProductRole
                    : currentPage === 'category'
                    ? editCategoryRole
                    : currentPage === 'subCategory'
                    ? editSubCategoryRole
                    : currentPage === 'brands'
                    ? editBrandsRole
                    : null
                }
            />
            {viewDetailsRolesArray.map((data) => (
                viewDetailsRolesArray[data.id -1].currentPage === currentPage && viewDetailsRolesArray[data.id -1].data &&(
                    <div className='Details' key={data.id}>
                        <div className="right-details">

                                <div className="right-details-description">
                                    {descriptionOverview.map((desc) =>(
                                        <DetailsDescription  name={desc.name} value={desc.value}/>
                                    ) )}
                                </div>
                                    {numberOfcharts.map((chart) => (
                                        <DetailsChart/>
                                    ))}
                        </div>
                        <div className="left-details">
                            {currentPage === 'details' && (
                                <EditProducts  products={products}/>
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
                )
            ))}
        </>
    )
}

export default Details