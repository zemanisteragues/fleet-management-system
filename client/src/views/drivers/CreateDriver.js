import React, { useEffect, useState } from 'react';
import { Button, Drawer, Notification, toast } from 'components/ui';
import DriverForm from './DriverForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewRecord,
    setIsSubmit,
    resetNewDriverData,
    updateRecord,
} from './store/dataSlice';
import { setIsDrawerOpen } from './store/dataSlice';
import _ from 'lodash';

const CreateDriver = () => {
    const dispatch = useDispatch();
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const isOpen = useSelector((state) => state.drivers.data.isDrawerOpen);
    const driverId = useSelector(
        (state) => state.drivers.data.newDriver.driverId
    );
    const driverDetails = useSelector((state) => state.drivers.data.newDriver);
    const error = useSelector((state) => state?.drivers?.data?.error);
    const licenseImage = driverDetails.licenseImage;
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

    const openNotification = () => {
        toast.push(
            <Notification title={'Error'} type={'danger'}>
                {error?.error?.message || error?.message}
            </Notification>
        );
    };

    useEffect(() => {
        error && openNotification();
    }, [error]);

    useEffect(() => {
        if (
            driverDetails.firstName &&
            driverDetails.lastName &&
            driverDetails.phone &&
            driverDetails.address &&
            driverDetails.licenseNumber &&
            driverDetails.licenseExpiry &&
            licenseImage
        ) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [dispatch, driverDetails]);
    const Footer = (
        <div className="flex w-full items-start">
            <Button className="mx-2" block onClick={() => onDrawerClose()}>
                Cancel
            </Button>
            <Button
                className="mx-2"
                variant="solid"
                block
                disabled={!submitDisabled}
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
