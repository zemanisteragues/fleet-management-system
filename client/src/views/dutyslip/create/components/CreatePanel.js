import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../store/dataSlice';
import { HiPlusCircle } from 'react-icons/hi';
import DutySlipForm from './DutySlipForm';
import { resetDutySlipDetails } from '../store/dataSlice';

const CreatePanel = () => {
    const dispatch = useDispatch();

    const title = 'Duty Slip Wizard';

    const isOpen = useSelector((state) => state.dutySlipsCreate.data.isOpen);

    const openDrawer = () => {
        dispatch(setIsOpen(true));
    };

    const onDrawerClose = () => {
        dispatch(resetDutySlipDetails());
        dispatch(setIsOpen(false));
    };

    const Title = (
        <div>
            <h4 className="mb-2">{title}</h4>
        </div>
    );

    return (
        <div>
            <Button
                block
                variant="solid"
                size="sm"
                onClick={() => {
                    dispatch(setIsOpen(true));
                }}
                icon={<HiPlusCircle />}
            >
                Create Duty Slip
            </Button>
            <Drawer
                title={Title}
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                shouldCloseOnEsc={false}
                lockScroll={true}
                shouldCloseOnOverlayClick={false}
                width={1000}
                headerClass="!items-start !bg-gray-100 dark:!bg-gray-700"
                footerClass="!border-t-0 !p-3"
            >
                <DutySlipForm />
            </Drawer>
        </div>
    );
};

export default CreatePanel;
