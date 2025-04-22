import React, { useState } from 'react';
import { Button, Dialog } from 'components/ui';
import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '../store/dataSlice';

const DeleteDialog = ({ row }) => {
    const dispatch = useDispatch();

    // const id = props.id;
    const [dialogIsOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        // dispatch(setIsSuccess(false));
        setIsOpen(true);
    };

    const onDialogClose = (e) => {
        // console.log('onDialogClose', e)
        setIsOpen(false);
    };

    const onDialogOk = (e) => {
        // console.log('onDialogOk', e)
        dispatch(deleteCustomer({ id: row.id }));
        setIsOpen(false);
    };

    return (
        <>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={openDialog}
            >
                <HiOutlineTrash />
            </span>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                bodyOpenClassName="overflow-hidden"
            >
                <h5 className="mb-4">Delete Customer</h5>
                <p>Are you sure you want to delete this customer</p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default DeleteDialog;
