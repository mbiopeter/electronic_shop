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