import React, { useState } from 'react';
import { Alert, Button, Drawer, Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';
import DutyTypeContainer from './DutyTypeContainer';
import { setDrawerClose, setDrawerOpen } from '../store/stateSlice';
import { set } from 'lodash';
import { createDutyType, getDutyTypes } from '../store/dataSlice';


const AddDutyType = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.admin.state.drawer);
    const dataSlice = useSelector((state) => state.admin.state.dutyTypesData);
    const isCreated = useSelector((state) => state.admin.data.createMsg);
    const [isOpen, setIsOpen] = useState(isDrawerOpen);
    const heading = 'Add Duty Type';

    const onDrawerClose = () => {
        setIsOpen(false);
        dispatch(setDrawerClose());
    };

    const onDrawerOpen = () => {
        dispatch(setDrawerOpen());
        setIsOpen(true);
    };

    const opneNotification = (msg, type, title) => {
        toast.push(
            <Notification title={title} type={type}>
                {msg}
            </Notification>
        );
    };

    const onDrawerConfirm = () => {
        if (!dataSlice.dutyType) {
            opneNotification('Please fill all the fields', 'danger', 'Error');
        } else if (dataSlice.dutyType.includes('HRS') && dataSlice.hours === 0 || !dataSlice.kms) {
            opneNotification('Please fill all the fields', 'danger', 'Error');
        } else if (dataSlice.dutyType.includes('PER DAY') && (dataSlice.kms == 0 || !dataSlice.days)) {
            opneNotification('Please fill all the fields', 'danger', 'Error');
        }
        else {
            dispatch(createDutyType(dataSlice)).then(() => {
                if (isCreated && isCreated.message.includes('successfully')) {
                    opneNotification(isCreated.message, 'success', 'Success');
                    dispatch(setDrawerClose());
                    dispatch(getDutyTypes());
                    setIsOpen(false);
                } else {
                    opneNotification(isCreated.message, 'danger', 'Error');
                    dispatch(getDutyTypes());
                    setIsOpen(false);
                }
            })
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
                    onClick={() => dispatch(onDrawerOpen())}
                    icon={<HiPlusCircle />}
                >
                    Add Duty Type
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
                    <DutyTypeContainer />
                </Drawer>

            </div>
        </>
    );
};

export default AddDutyType;
