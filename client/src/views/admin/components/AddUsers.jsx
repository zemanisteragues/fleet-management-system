import React, { useState } from 'react';
import { Alert, Button, Drawer, Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';
import { setDrawerClose, setDrawerOpen } from '../store/stateSlice';
import { createUser } from '../store/dataSlice';
import AddUserContainer from './AddUserContainer';


const AddUsers = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.admin.state.drawer);
  const userData = useSelector((state) => state.admin.state.userData);
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


  const validate = () => {
    if (userData.role === '') {
      opneNotification('Please select a role', 'danger', 'Error');
      return false;
    }
    if (userData.userName === '') {
      opneNotification('Please enter a username', 'danger', 'Error');
      return false;
    }
    if (userData.firstName === '') {
      opneNotification('Please enter a first name', 'danger', 'Error');
      return false;
    }
    if (userData.lastName === '') {
      opneNotification('Please enter a last name', 'danger', 'Error');
      return false;
    }
    if (userData.email === '' || userData.email.includes('@') === false || userData.email.includes('.') === false) {
      opneNotification('Please enter an email', 'danger', 'Error');
      return false;
    }
    if (userData.password === '') {
      opneNotification('Please enter a password', 'danger', 'Error');
      return false;
    }
    return true;
  }

  const onDrawerConfirm = () => {
    if (validate()) {
      dispatch(createUser(userData)).then(()=>{
        if (isCreated && isCreated.message.includes('created')) {
          onDrawerClose();
          opneNotification('User created successfully', 'success', 'Success');
        }else{
          opneNotification('User creation failed', 'danger', 'Error');
        }
      })
    }
  };

  console.log(isCreated);

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
          onClick={() => onDrawerOpen()}
          icon={<HiPlusCircle />}
        >
          Add User
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
          <AddUserContainer />
        </Drawer>

      </div>
    </>
  );
};

export default AddUsers;
