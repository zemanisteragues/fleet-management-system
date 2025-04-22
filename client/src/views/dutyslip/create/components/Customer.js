import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../store/dataSlice';
const Customer = (props) => {
    const dispatch = useDispatch();
    const customers = useSelector(
        (state) => state.dutySlipsCreate.data.customers
    );
    const { values, errors, touched, disabled } = props;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(customers);
    }, [setOptions, customers]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <FormItem
                label="Select Customer"
                asterisk
                invalid={errors.customer && touched.customer}
                errorMessage={errors.customer}
            >
                <Field name="customer">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={options}
                            value={options.filter(
                                (option) => option.value === values.customer
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                            isDisabled={disabled}
                        />
                    )}
                </Field>
            </FormItem>
        </div>
    );
};

export default Customer;
