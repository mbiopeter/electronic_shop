import { fetchCurrentUserRoles } from "../../data/roles/Roles";

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
export const handleProtectedRoutes = async () => {
    const roles = [];
    const rolesObj = {};
    const apiRoles = await fetchCurrentUserRoles();

    // If apiRoles is null, return an empty object or a default value
    if (!apiRoles) {
        console.log('No roles available for the current user.');
        return {
            dashboard: false,
            category: false,
            subCategory: false,
            brand: false,
            variantType: false,
            variant: false,
            orders: false,
            coupon: false,
            poster: false,
            notification: false,
            users: false,
            userRoles: false,
            emails: false,
        };
    }

    console.log(apiRoles);
    const rolesCategories = [
        apiRoles.addSystemVariables,
        apiRoles.editSystemVariables,
        apiRoles.viewDetails,
        apiRoles.settings,
        apiRoles.deleteItems,
    ];

    // Push all the roles into one array
    for (let i = 0; i < rolesCategories.length; i++) {
        let categoryName = rolesCategories[i];
        if (categoryName) {
            for (let j = 0; j < categoryName.length; j++) {
                roles.push(categoryName[j]);
            }
        }
    }

    roles.forEach((permission) => {
        const formattedName = permission.name.replace(/\s+/g, '_').toLowerCase();
        rolesObj[formattedName] = permission.allowed;
    });

    const dashboardRole =
        rolesObj.all_products ||
            rolesObj.all_orders ||
            rolesObj.cancelled_orders ||
            rolesObj.limited_stock ||
            rolesObj.order_percentange ||
            rolesObj.other_stock ||
            rolesObj.out_of_stock ||
            rolesObj.pending_orders ||
            rolesObj.processed_orders ||
            rolesObj.shipped_orders ||
            rolesObj.returned_orders
            ? true
            : false;

    const categoryRole = rolesObj.all_categories || rolesObj.create_category ? true : false;
    const subCategoryRole = rolesObj.all_sub_categories || rolesObj.create_sub_category ? true : false;
    const brandRole = rolesObj.all_brands || rolesObj.create_brands ? true : false;
    const variantTypeRole = rolesObj.all_varient_types || rolesObj.create_variant_type ? true : false;
    const variantRole = rolesObj.all_varients || rolesObj.create_variant ? true : false;
    const ordersRole = rolesObj.all_orders;
    const couponRole = rolesObj.all_coupon_codes || rolesObj.create_coupon ? true : false;
    const posterRole = rolesObj.all_posters || rolesObj.create_posters ? true : false;
    const notificationRole = rolesObj.all_notifications || rolesObj.send_notifications ? true : false;
    const usersRole = rolesObj.all_users || rolesObj.create_users ? true : false;
    const editUserRoles = rolesObj.edit_users;
    const emails = rolesObj.send_emails;

    return {
        dashboard: dashboardRole,
        category: categoryRole,
        subCategory: subCategoryRole,
        brand: brandRole,
        variantType: variantTypeRole,
        variant: variantRole,
        orders: ordersRole,
        coupon: couponRole,
        poster: posterRole,
        notification: notificationRole,
        users: usersRole,
        userRoles: editUserRoles,
        emails: emails,
    };
};
