import { addSystemVariables,editSystemVariables,viewDetails,settings } from "../../data/roles/Roles";

//FUNCTION FOR API REQUEST
export const handleRoleChange = (data) => {
    const roles = []
    const updateRoles = [];
    const modifiedRoles = [];
    const rolesCategories = [
        addSystemVariables,
        editSystemVariables,
        viewDetails,
        settings
    ];
    //push all the roles into one array
    for(let i = 0; i < rolesCategories.length; i++){
        let categoryName = rolesCategories[i];
        for(let j = 0; j < categoryName.length; j++){
            roles.push(
                categoryName[j]
            )
        }
    }
    //track roles changes
    for(let obj of roles){
        if(obj.id in data){
            updateRoles.push({
                id:obj.id,
                name:obj.name,
                allowed:data[obj.id]
            })
        }
    }
    //filter to remain with changed roles
    for(let i = 0; i < roles.length; i++){
        for(let j = 0; j < updateRoles.length; j++){
            if(roles[i].allowed !== updateRoles[j].allowed && roles[i].id === updateRoles[j].id){
                modifiedRoles.push(
                    updateRoles[j]
                );
            }
        }
    }
    //Api request to update changed roles
    if(modifiedRoles.length > 0){
        //API REQUEST TO UPDATE ROLES
    }
}

//FUNCTION TO CHECK ASSIGNED ROLES
export const handleCheckRole = (rolesCategory, itemCheck) => {
    let roleAssigned = false;
    const cleanedItemCheck = itemCheck.toLowerCase().replace(/\s+/g, ' ');
    //check if role is assigned
    for(let i = 0; i < rolesCategory.length; i++) {
        if(rolesCategory[i].name.toLowerCase().replace(/\s+/g, ' ') === cleanedItemCheck ){
            roleAssigned = rolesCategory[i].allowed;
        }
    }
    return roleAssigned;
}

// FUNCTION TO PROTECT ROLES ROUTES
export const handleProtectedRoutes = () => {
    const roles = [];
    const rolesObj = {};
    const rolesCategories = [
        addSystemVariables,
        editSystemVariables,
        viewDetails,
        settings
    ];
    //push all the roles into one array
    for(let i = 0; i < rolesCategories.length; i++){
        let categoryName = rolesCategories[i];
        for(let j = 0; j < categoryName.length; j++){
            roles.push(
                categoryName[j]
            )
        }
    }
    roles.forEach(permission => {
        const formattedName = permission.name.replace(/\s+/g, '_').toLowerCase();
        rolesObj[formattedName] = permission.allowed;
    });

    const dashboardRole = rolesObj.all_products || rolesObj.all_orders || rolesObj.cancelled_orders  || rolesObj.limited_stock || rolesObj.order_percentange || rolesObj.other_stock || rolesObj.out_of_stock || rolesObj.pending_orders || rolesObj.processed_orders  || rolesObj.shipped_orders || rolesObj.returned_orders ? true : false;
    const categoryRole =rolesObj.all_categories || rolesObj.create_category ? true : false;
    const subCategoryRole = rolesObj.all_sub_categories || rolesObj.create_sub_category ?true :false;
    const brandRole = rolesObj.all_brands || rolesObj.create_brands ? true: false;
    const variantTypeRole = rolesObj.all_varient_types || rolesObj.create_variant_type ? true: false;
    const variantRole = rolesObj.all_varients || rolesObj.create_variant ? true:false;
    const ordersRole = rolesObj.all_orders;
    const couponRole = rolesObj.all_coupon_codes || rolesObj.create_coupon ? true:false;
    const posterRole = rolesObj.all_posters || rolesObj.create_posters ? true:false;
    const notificationRole = rolesObj.all_notifications || rolesObj.send_notifications ? true:false;


    return {
        dashboard:dashboardRole,
        category:categoryRole,
        subCategory:subCategoryRole,
        brand:brandRole,
        variantType:variantTypeRole,
        variant:variantRole,
        orders:ordersRole,
        coupon:couponRole,
        poster:posterRole,
        notification:notificationRole
    }
}