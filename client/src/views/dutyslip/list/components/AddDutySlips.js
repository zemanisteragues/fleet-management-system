import React from 'react';
import {Button} from 'components/ui';
import {HiPlusCircle} from 'react-icons/hi';
import {setIsOpen} from '../../create/store/dataSlice';
import {useDispatch} from 'react-redux';
const AddDutySlips = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Button
                block
                variant="solid"
                size="sm"
                onClick={() => {
                dispatch(setIsOpen(true));
            }}
                icon={< HiPlusCircle />}>
                Create Duty Slip
            </Button>
        </div>
    );
};

export default AddDutySlips;