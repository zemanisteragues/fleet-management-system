import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../store/dataSlice';

const Driver = (props) => {
    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.dutySlipsCreate.data.drivers);
    const { values, errors, touched, disabled } = props;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(drivers);
    }, [setOptions, drivers]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <FormItem
                label="Select Driver"
                asterisk
                invalid={errors.driver && touched.driver}
                errorMessage={errors.driver}
            >
                <Field name="driver">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={options}
                            value={options.filter(
                                (option) => option.value === values.driver
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

export default Driver;
