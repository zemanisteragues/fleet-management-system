import React, { useState, useEffect } from 'react';
import { Button, Drawer, Notification, toast } from 'components/ui';
import CarForm from './CarForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewRecord,
    setIsSubmit,
    resetNewCarData,
    updateRecord,
} from '../store/dataSlice';
import { setIsDrawerOpen } from '../store/dataSlice';

const CreateCar = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.cars.data.isDrawerOpen);
    const carId = useSelector((state) => state.cars.data.newCar.carId);
    const error = useSelector((state) => state.cars.data.error);
    const isEdit = carId === null ? false : true;
    const heading = isEdit ? 'Update the car info' : 'Create a new car';

    const openDrawer = () => {
        dispatch(resetNewCarData());
        dispatch(setIsDrawerOpen(true));
    };

    const onDrawerClose = () => {
        dispatch(resetNewCarData());
        dispatch(setIsDrawerOpen(false));
    };

    const onDrawerConfirm = () => {
        dispatch(setIsSubmit(true));
        isEdit ? dispatch(updateRecord()) : dispatch(createNewRecord());
    };

    const openNotification = () => {
        toast.push(
            <Notification title={'Error'} type={'danger'}>
                {error?.message}
            </Notification>
        );
    };

    useEffect(() => {
        error && openNotification();
    }, [error]);

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
        <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
            <Button
                variant="solid"
                color="blue-600"
                size="sm"
                onClick={() => openDrawer()}
            >
                Add a new vehicle
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
                <CarForm />
            </Drawer>
        </div>
    );
};

export default CreateCar;
