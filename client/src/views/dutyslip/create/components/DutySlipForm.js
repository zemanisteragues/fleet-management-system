import React, { useEffect } from 'react';
import { Button, FormItem, FormContainer } from 'components/ui';
import { Form, Formik } from 'formik';
import Customer from './Customer';
import Driver from './Driver';
import Vehicle from './Vehicle';
import BookedByDetails from './BookedByDetails';
import DutyTimings from './DutyTimings';
import DutyType from './DutyType';
import Price from './Price';
import ExtraCostDetails from './ExtraCostDetails';
import DutyDistance from './DutyDistance';
import CostDetails from './CostDetails';
import TollTax from './TollTax';
import NightHalt from './NightHalt'
import Locations from './Locations';
import DutySlipsUploader from './DutySlipUploader';
import { validationSchema } from '../constants/utils';
import { useDispatch, useSelector } from 'react-redux';
import { createDutySlip, updateDutySlip } from '../store/dataSlice';

const DutySlipForm = () => {
    const dispatch = useDispatch();

    const initialData = useSelector(
        (state) => state.dutySlipsCreate.data.dutySlipDetails
    );

    const isLoading = useSelector(
        (state) => state.dutySlipsCreate.data.loading
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const shouldButtonBeDisabled = initialData.id && initialData.status !== 'open';
    const isNewDutySlip = !initialData.id;
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    isNewDutySlip
                        ? dispatch(createDutySlip(values))
                        : dispatch(updateDutySlip(values));

                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <Customer
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Driver
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    disabled={shouldButtonBeDisabled}
                                />
                                <Vehicle
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    disabled={shouldButtonBeDisabled}
                                />
                            </div>

                            <BookedByDetails
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <Locations
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <DutyTimings
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <DutyDistance
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <DutyType
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    disabled={shouldButtonBeDisabled}
                                />
                                <Price
                                    errors={errors}
                                    touched={touched}
                                    values={values}
                                    disabled={shouldButtonBeDisabled}
                                />
                            </div>
                            <ExtraCostDetails
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <NightHalt
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <TollTax
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <CostDetails
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <DutySlipsUploader
                                errors={errors}
                                touched={touched}
                                values={values}
                                disabled={shouldButtonBeDisabled}
                            />
                            <div className="mt-4"></div>
                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    size="sm"
                                    disabled={shouldButtonBeDisabled}
                                    onClick={resetForm}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="solid"
                                    disabled={shouldButtonBeDisabled}
                                    size="sm"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </FormItem>
                            <div>
                                {shouldButtonBeDisabled && (
                                    <div className="text-red-500">
                                        You can't edit this duty slip because
                                        it's status is not open.
                                    </div>
                                )}
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DutySlipForm;
