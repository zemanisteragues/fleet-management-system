import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { HiOutlineUser, HiPhone } from 'react-icons/hi';

const BookedByDetails = (props) => {
    const { values, errors, touched, disabled } = props;
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <FormItem label="Booked By">
                    <Field
                        type="text"
                        name="bookedByPassengerName"
                        placeholder="Passenger Name"
                        component={Input}
                        disabled={disabled}
                        prefix={<HiOutlineUser className="text-lg" />}
                    />
                </FormItem>
            </div>
            <div>
                <FormItem
                    label="Phone Number"
                    invalid={
                        errors.bookedByPassengerPhone &&
                        touched.bookedByPassengerPhone
                    }
                    errorMessage={errors.bookedByPassengerPhone}
                >
                    <Field
                        type="text"
                        name="bookedByPassengerPhone"
                        placeholder="Passenger Phone"
                        component={Input}
                        disabled={disabled}
                        prefix={<HiPhone className="text-lg" />}
                    />
                </FormItem>
            </div>
        </div>
    );
};

export default BookedByDetails;
