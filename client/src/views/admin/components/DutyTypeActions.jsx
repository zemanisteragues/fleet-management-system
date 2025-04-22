import React, { useEffect, useState } from 'react';
import { Select } from 'components/ui';
import { ConfirmDialog } from 'components/shared';
import { useDispatch } from 'react-redux';
import { updateDutyTypeStatus, getDutyTypes } from '../store/dataSlice';
import { use } from 'i18next';

// CREATED','SENT','PAID','PARTIALLY_PAID','OVERDUE','CANCELLED
const selectOptions = [
    { value: 'ACTIVE', label: 'ACTIVE' },
    { value: 'INACTIVE', label: 'INACTIVE' },
];

const DutyTypeActions = ({ currentStatus, dutyType }) => {
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onHandleChange = (e) => {
        setStatus(e.value);
        setOpen(true);
    };

    const onConfirmUpdate = () => {
        const payload = {
          dutyType: dutyType,
          status: status,
        };
      
        dispatch(updateDutyTypeStatus(payload))
          .then(() => {
            setOpen(false);
            dispatch(getDutyTypes());
          })
          .catch((error) => {
            console.error('Error updating duty type status:', error);
          });
      };


    return (
        <div
            className="flex items-center space-x-2"
        >
            <ConfirmDialog
                isOpen={open}
                onClose={() => setOpen(false)}
                onRequestClose={() => setOpen(false)}
                type={'warning'}
                title={'Warning'}
                onCancel={() => setOpen(false)}
                onConfirm={()=>onConfirmUpdate()}
                confirmButtonColor={'amber-600'}
            >
                <p>
                    Warning! You are about to change the status of duty type to <b>{status}</b>. Are you sure you want to continue?
                </p>
            </ConfirmDialog>
            <Select
                placeholder="Please Select"
                options={selectOptions}
                value={selectOptions.find((obj) => obj.value === currentStatus)}
                onChange={onHandleChange}
                size="sm"
            ></Select>
        </div>
    );
};

export default DutyTypeActions;
