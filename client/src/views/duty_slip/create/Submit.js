import React, { useEffect } from 'react';
import { FormContainer, Button, hooks } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { createNewRecord, setHasSubmit } from './store/dataSlice';
import { StickyFooter, ConfirmDialog } from 'components/shared';
import { AiOutlineSave } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { resetData } from './store/dataSlice';

const Submit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.createDutySlip.data.loading);

    const handleSubmit = () => {
        dispatch(setHasSubmit(true));
        dispatch(createNewRecord());
    };

    const onDiscard = () => {
        dispatch(resetData());
        navigate('/duty_slip');
    };
    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;
    const hasSuccess = useSelector(
        (state) => state.createDutySlip.data.hasSuccess
    );

    useEffect(() => {
        if (hasSuccess) {
            navigate('/duty_slip');
        }
    }, [hasSuccess, navigate]);

    if (isDisabled) {
        return null;
    }

    return (
        <>
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div>
                    {/* {type === 'edit' && (
                    <DeleteProductButton
                        onDelete={onDelete}
                    />
                )} */}
                </div>
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        className="ltr:mr-3 rtl:ml-3"
                        onClick={() => onDiscard()}
                        type="button"
                    >
                        Discard
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        loading={isLoading}
                        onClick={() => handleSubmit()}
                        icon={<AiOutlineSave />}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </StickyFooter>
        </>
    );
};

export default Submit;
