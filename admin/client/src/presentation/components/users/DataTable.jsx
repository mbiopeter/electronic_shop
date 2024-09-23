import React, { useEffect, useState  } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
import { editSystemVariables, viewDetails } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { usersUrl } from '../../../logical/consts/apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleDeleteApi } from '../../../logical/consts/delete';
import { handleFetchAllUsers } from '../../../logical/consts/fetch';

const DataTable = ({
    reload,
    setReload
}) => {

    const [users, setUsers] = useState([]);
    const [editUsersRole, setEditUsersRole] = useState(false);
    const [viewUsersDetailsRole, setViewUsersDetailsRole] = useState(false);

    const showEditIcon = editUsersRole || viewUsersDetailsRole;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await handleFetchAllUsers(usersUrl,'all'); 
                setUsers(usersData); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, [reload]);
    useEffect(() => {
        // Set roles
        setEditUsersRole(handleCheckRole(editSystemVariables, 'edit users'));
        setViewUsersDetailsRole(handleCheckRole(viewDetails, 'users details'));

        // Fetch users data        
    },[])


    const navigate = useNavigate();

    const handleEdit = (row) => {
        navigate(`/users/roles/${row.id}`);
    };

    const handleDelete = async (row) => {
        const userId= row.id;
        try {
            const response = handleDeleteApi(usersUrl,'remove',userId);
            setReload(!reload)
            toast.success('user sucessfully removed');
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
        }
    };
    const columns = [
        { id: 'firstName', label: 'First Name', minWidth: 170 },
        { id: 'secondName', label: 'Second Name', minWidth: 170 },
        { id: 'idNumber', label: 'Id No', minWidth: 170 },
        { id: 'phoneNumber', label: 'Phone No', minWidth: 170 },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];

    return (
        <div className="Users-datatable common-css">
            <span className='Users-datatable-title'>All Users</span>
            <StickyHeadTable columns={columns} rows={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default DataTable;
