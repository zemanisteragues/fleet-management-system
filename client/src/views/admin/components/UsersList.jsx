import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag, Button, Notification, toast } from 'components/ui';
import Table from 'components/ui/Table';
import DutyTypeActions from './DutyTypeActions';
import { ConfirmDialog } from 'components/shared';
import { deleteUser, getAllUsers } from '../store/usersSlice';
import UserActions from './UserActions';

export default function UsersList() {
  const { Tr, Th, Td, THead, TBody } = Table;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.admin.userData);
  const dataLoading = useSelector((state) => state.admin.userData.loading);
  const userInfo = useSelector((state) => state.auth.user.username);
  const success = useSelector((state) => state.admin.userData.success);
  const [filteredusers, setFilteredusers] = useState([]);


  const opneNotification = (msg, type, title) => {
    toast.push(
      <Notification title={title} type={type}>
        {msg}
      </Notification>
    );
  };


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    if (usersList?.users) {
      setFilteredusers(usersList.users);
    }
  }, [usersList]);

  const onDelete = (id) => {
    setOpen(true);
  };

  const onDeleteConfirm = (id) => {
    const payload = {
      id: id,
    };
    console.log(payload);

    dispatch(deleteUser(payload))
      .then(() => {
        setOpen(false);
        if(success && success.message.includes('deleted')){
          opneNotification('User deleted successfully', 'success', 'Success');
        }else{
          opneNotification('User deletion failed', 'danger', 'Error');
        }
        dispatch(getAllUsers());
      })
      .catch((error) => {
        console.error('Error deleting duty type:', error);
      });
  };

  if (dataLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {filteredusers?.length ? (
        <Table compact>
          <THead>
            <Tr>
              <Th>#</Th>
              <Th>Full Name</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>change Role</Th>
              <Th>Remove</Th>
            </Tr>
          </THead>
          <TBody>
            {filteredusers.map((data, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{data.firstname + ' ' + data.lastname}</Td>
                <Td>{data.username}</Td>
                <Td>
                  <Tag
                    className={
                      data.role === 'GUEST'
                        ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100 border-0 rounded'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded'
                    }
                  >
                    {data.role}
                  </Tag>
                </Td>
                <Td>
                 {
                  userInfo !== data.username ? <UserActions currentRole={data.role} id={data.id} disable={data.username == userInfo} /> : <p
                  className='text-center text-lg'
                  >-</p>
                 }
                </Td>
                <Td>
                  <ConfirmDialog
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    onRequestClose={() => setOpen(false)}
                    type="warning"
                    title="Warning"
                    onCancel={() => setOpen(false)}
                    confirmButtonColor="amber-600"
                    onConfirm={() => {
                      onDeleteConfirm(data.id);
                    }}
                  >
                    <p>Warning! You are about to delete the duty type {data.dutyType}</p>
                  </ConfirmDialog>

                  <Button onClick={() => onDelete(data.id)} disabled={data.username == userInfo} variant="solid" size="sm" color="red">
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p>No User Types Found</p>
        </div>
      )}
    </div>
  );
}
