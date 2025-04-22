import React, { useState } from 'react';
import { Button, Dialog } from 'components/ui';
import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deleteCar, setIsSuccess } from '../store/dataSlice';

const DeleteDialog = (props) => {
    const dispatch = useDispatch();

    const id = props.id;
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
        dispatch(setIsSuccess(false));
        dispatch(deleteCar(id));
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
                <h5 className="mb-4">Delete Vehicle</h5>
                <p>Once deleted, you cannot re-activate the Vehicle.</p>
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
