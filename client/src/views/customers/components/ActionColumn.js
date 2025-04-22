import React from 'react';
import { useDispatch } from 'react-redux';
import useThemeClass from 'utils/hooks/useThemeClass';
import {
    HiOutlinePencil,
    HiOutlineRefresh,
    HiOutlineTrash,
} from 'react-icons/hi';
import { deleteCustomer, restoreCustomer } from '../store/dataSlice';
import { setIsDrawerOpen, setNewCustomerRecord } from '../store/dataSlice';
import DeleteDialog from './DeleteDialog';

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const { textTheme } = useThemeClass();
    //const navigate = useNavigate()

    const onEdit = () => {
        //open Drawer with ID
        const data = {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            phone: row.phone,
            address: row.address,
            customerType: row.isCompany,
            companyName: row.companyName,
            gstNumber: row.gstNumber,
            city: row.city,
            state: row.state,
            country: row.country,
            remarks: row.remarks,
            isSubmit: false,
            customerId: row.id,
            isEdit: true,
        };
        dispatch(setNewCustomerRecord(data));
        dispatch(setIsDrawerOpen(true));
    };

    // const onDelete = () => {
    //    dispatch(deleteCustomer({id: row.id}));
    // };

    const onRefresh = () => {
        dispatch(restoreCustomer({ id: row.id }));
    };

    if (!row.isActive) {
        return (
            <div className="flex text-lg">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onRefresh}
                >
                    <HiOutlineRefresh />
                </span>
            </div>
        );
    }
    return (
        <div className="flex text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <DeleteDialog row={row} />
        </div>
    );
};

export default ActionColumn;
