import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';

const Vehicle = (props) => {
    const dispatch = useDispatch();
    const vehicles = useSelector(
        (state) => state.dutySlipsCreate.data.vehicles
    );
    const { values, errors, touched, disabled } = props;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(vehicles);
    }, [setOptions, vehicles]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <FormItem
                label="Select Vehicle"
                asterisk
                invalid={errors.car && touched.car}
                errorMessage={errors.car}
            >
                <Field name="car">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={options}
                            isDisabled={disabled}
                            value={options.filter(
                                (option) => option.value === values.car
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </div>
    );
};

export default Vehicle;
