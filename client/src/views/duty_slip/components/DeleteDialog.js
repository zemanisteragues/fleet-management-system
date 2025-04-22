import React, { useState } from 'react';
import { Button, Dialog } from 'components/ui';
import { useDispatch } from 'react-redux';
import { deleteDutySlips } from '../store/dataSlice';
import { HiOutlineTrash } from 'react-icons/hi';
import { setIsSuccess } from '../store/dataSlice';

const DeleteDialog = (props) => {
    const id = props.id;
    const dispatch = useDispatch();
    const [dialogIsOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const onDialogClose = (e) => {
        setIsOpen(false);
    };

    const onDialogOk = (e) => {
        dispatch(setIsSuccess(false));
        dispatch(deleteDutySlips(id));
        setIsOpen(false);
    };

    return (
        <>
            <span
                className={`cursor-pointer p-2 hover:text-red-500`}
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
                <h5 className="mb-4">Are you sure you want to delete this?</h5>
                <p>Deleting this duty slip will deactivate it.</p>
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
