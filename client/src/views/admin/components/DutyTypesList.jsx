import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag, Button} from 'components/ui';
import Table from 'components/ui/Table';
import DutyTypeActions from './DutyTypeActions';
import { ConfirmDialog } from 'components/shared';
import { getDutyTypes, deleteDutyType } from '../store/dataSlice';

export default function DutyTypesList() {
  const { Tr, Th, Td, THead, TBody } = Table;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const dutyTypesList = useSelector((state) => state.admin.data.dutyTypesList);
  const dataLoading = useSelector((state) => state.admin.data.loading);
  const [filteredDutyTypes, setFilteredDutyTypes] = useState([]);

  useEffect(() => {
    dispatch(getDutyTypes());
  }, [dispatch]);

  useEffect(() => {
    if (dutyTypesList?.dutyTypes) {
      setFilteredDutyTypes(dutyTypesList.dutyTypes);
    }
  }, [dutyTypesList]);

  const onDelete = (id) => {
    setOpen(true);
  };

  const onDeleteConfirm = (id) => {
    const payload = {
      dutyType: id,
    };
  
    dispatch(deleteDutyType(payload))
      .then(() => {
        setOpen(false);
        dispatch(getDutyTypes());
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
      {filteredDutyTypes?.length ? (
        <Table compact>
          <THead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
              <Th>Remove</Th>
            </Tr>
          </THead>
          <TBody>
            {filteredDutyTypes.map((duty, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{duty.dutyType}</Td>
                <Td>
                  <Tag
                    className={
                      duty.status === 'INACTIVE'
                        ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded'
                    }
                  >
                    {duty.status}
                  </Tag>
                </Td>
                <Td>
                  <DutyTypeActions currentStatus={duty.status} dutyType={duty.dutyType} />
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
                      onDeleteConfirm(duty.dutyType);
                    }}
                  >
                    <p>Warning! You are about to delete the duty type {duty.dutyType}</p>
                  </ConfirmDialog>

                  <Button onClick={() => onDelete(duty.dutyType)} variant="solid" size="sm" color="red">
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p>No Duty Types Found</p>
        </div>
      )}
    </div>
  );
}
