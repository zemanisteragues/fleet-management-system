import React, { useState } from 'react';
import { Button, Drawer, Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsDrawerOpen,
    resetNewCustomer,
    setNewCustomer,
    createNewRecord,
    updateRecord,
} from '../store/dataSlice';
import { HiPlusCircle } from 'react-icons/hi';
import CustomerForm from './CustomerForm';

const AddCustomer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.customers.data.isDrawerOpen);
    const data = useSelector((state) => state.customers.data.newCustomer);

    const customerId = useSelector(
        (state) => state.customers.data.newCustomer.customerId
    );

    const isEdit = customerId === null ? false : true;
    const heading = isEdit
        ? 'Update the customer info'
        : 'Create a new customer';

    const openDrawer = () => {
        dispatch(resetNewCustomer());
        dispatch(setIsDrawerOpen(true));
    };

    const onDrawerClose = () => {
        dispatch(resetNewCustomer());
        dispatch(setIsDrawerOpen(false));
    };

    const opneNotification = (msg, type, title) => {
        toast.push(
            <Notification title={title} type={type}>
                {msg}
            </Notification>
        );
    };

    const validateData = () => {
        let isValid = true;
        if (data.customerType == 0) {
            if (!data.firstName || !data.lastName || !data.address || !data.city || !data.state || !data.email || !data.phone || !data.country) {
                isValid = false;
            }
        } else if (data.customerType == 1) {
            if (!data.companyName || !data.address || !data.city || !data.state || !data.email || !data.phone || !data.country) {
                isValid = false;
            }
        }
        return isValid;
    }

    const onDrawerConfirm = () => {
        if(!validateData()){
            opneNotification("All fields are mandatory", "danger", "Error");
        }
        else {
            dispatch(setNewCustomer({ key: 'isSubmit', value: true }));
            dispatch(resetNewCustomer());
            // // dispatch(createNewRecord());
            isEdit ? dispatch(updateRecord()) : dispatch(createNewRecord());
        }
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
        <>
            <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                <Button
                    block
                    variant="solid"
                    size="sm"
                    onClick={() => dispatch(setIsDrawerOpen(true))}
                    icon={<HiPlusCircle />}
                >
                    Add Customer
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
                    <CustomerForm />
                </Drawer>
            </div>
        </>
    );
};

export default AddCustomer;
