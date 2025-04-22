import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Select } from 'components/ui';
import { dutyTypeOptions, dutyTypes } from '../constants/utils';

const DutyType = (props) => {
    const { values, errors, touched, disabled } = props;

    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const data = await dutyTypes();
                const formattedOptions = data.map((item) => ({
                    value: item.dutyType,
                    label: item.dutyType,
                }));
                setOptions(formattedOptions);
            } catch (error) {
                console.error('Error fetching duty types:', error);
            }
        }

        fetchOptions();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4">
            <FormItem
                label="Select Duty Type"
                asterisk
                invalid={errors.dutyType && touched.dutyType}
                errorMessage={errors.dutyType}
            >
                <Field name="dutyType">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={options}
                            isDisabled={disabled}
                            value={options.filter(
                                (option) => option.value === values.dutyType
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

export default DutyType;
