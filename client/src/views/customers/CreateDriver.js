import React, { useState } from 'react';
import { Button, Drawer } from 'components/ui';
import DriverForm from './DriverForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewRecord,
    setIsSubmit,
    resetNewDriverData,
    updateRecord,
} from './store/dataSlice';
import { setIsDrawerOpen } from './store/dataSlice';

const CreateDriver = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.drivers.data.isDrawerOpen);
    const driverId = useSelector(
        (state) => state.drivers.data.newDriver.driverId
    );

    const isEdit = driverId === null ? false : true;
    const heading = isEdit ? 'Update the driver info' : 'Create a new driver';

    const openDrawer = () => {
        dispatch(resetNewDriverData());
        dispatch(setIsDrawerOpen(true));
    };

    const onDrawerClose = () => {
        dispatch(resetNewDriverData());
        dispatch(setIsDrawerOpen(false));
    };

    const onDrawerConfirm = () => {
        dispatch(setIsSubmit(true));
        isEdit ? dispatch(updateRecord()) : dispatch(createNewRecord());
    };

    const Footer = (
        <div className="flex w-full items-start">
            <Button className="mx-2" block onClick={() => onDrawerClose()}>
                Cancel
            </Button>
            <Button
                className="mx-2"
                variant="solid"
                block
                onClick={() => onDrawerConfirm()}
            >
                Confirm
            </Button>
        </div>
    );

    const Title = (
        <div>
            <h4 className="mb-2">{heading}</h4>
            <p>All fields are mandatory</p>
        </div>
    );

    return (
        <div className="mb-3">
            <Button
                variant="solid"
                color="blue-600"
                size="sm"
                onClick={() => openDrawer()}
            >
                Create a new driver
            </Button>
            <Drawer
                title={Title}
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                footer={Footer}
                headerClass="!items-start !bg-gray-100 dark:!bg-gray-700"
                footerClass="!border-t-0 !p-3"
                lockScroll={true}
                shouldCloseOnOverlayClick={false}
            >
                <DriverForm />
            </Drawer>
        </div>
    );
};

export default CreateDriver;
