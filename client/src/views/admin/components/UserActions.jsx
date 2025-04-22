import React, { useEffect, useState } from 'react';
import { Select } from 'components/ui';
import { ConfirmDialog } from 'components/shared';
import { useDispatch } from 'react-redux';
import { updateDutyTyperole, getDutyTypes } from '../store/dataSlice';
import { use } from 'i18next';
import { changeRole, getAllUsers } from '../store/usersSlice';

// CREATED','SENT','PAID','PARTIALLY_PAID','OVERDUE','CANCELLED
const selectOptions = [
    { value: 'ADMIN', label: 'ADMIN' },
    { value: 'GUEST', label: 'GUEST' },
];

const UserActions = ({ currentRole, id, disable }) => {
    const [role, setrole] = useState('');
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onHandleChange = (e) => {
        setrole(e.value);
        setOpen(true);
    };

    const onConfirmUpdate = () => {
        const payload = {
          id: id,
          role: role,
        };
      
        dispatch(changeRole(payload))
          .then(() => {
            setOpen(false);
            dispatch(getAllUsers());
          })
          .catch((error) => {
            console.error('Error updating user role:', error);
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
                    Warning! You are about to change the role of duty type to <b>{role}</b>. Are you sure you want to continue?
                </p>
            </ConfirmDialog>
            <Select
                disabled={disable}
                placeholder="Please Select"
                options={selectOptions}
                value={selectOptions.find((obj) => obj.value === currentRole)}
                onChange={onHandleChange}
                size="sm"
            ></Select>
        </div>
    );
};

export default UserActions;
