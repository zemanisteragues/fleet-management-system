import React, {useState} from 'react';
import {Button, Tooltip} from 'components/ui';
import {ConfirmDialog} from 'components/shared';
import {cancelDutySlip} from '../store/dataSlice';
import {useDispatch} from 'react-redux';

const CancelDutySlip = (props) => {
    const dispatch = useDispatch();

    const {status, id} = props;

    const [dialogIsOpen,
        setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const onDialogClose = (e) => {
        setIsOpen(false);
    };

    const onDialogOk = (e) => {
        dispatch(cancelDutySlip({id: id}));
        setIsOpen(false);
    };

    if (status !== 'open') {
        return (
        <Tooltip title="Only open duty slips can be cancelled." placement="top">
            <Button size="xs" disabled={true} onClick={() => openDialog()}>
                Cancel duty slip
            </Button>
        </Tooltip>
        );
    }
    
    return (
        <div>
            <Button size="xs" variant="solid" onClick={() => openDialog()}>
                Cancel duty slip
            </Button>

            <ConfirmDialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                type="danger"
                title="Delete duty slip"
                onCancel={onDialogClose}
                onConfirm={onDialogOk}
                confirmButtonColor="red-600">
                <p>
                    Are you sure you want to delete this duty slip? This action cannot be undone.
                </p>
            </ConfirmDialog>
        </div>
    );
};

export default CancelDutySlip;
