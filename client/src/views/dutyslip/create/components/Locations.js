import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { ImLocation } from 'react-icons/im';

const Locations = (props) => {
    const { values, errors, touched, disabled } = props;
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <FormItem
                    label="Start From"
                    invalid={errors.startFrom && touched.startFrom}
                    asterisk
                    errorMessage={errors.startFrom}
                >
                    <Field
                        type="text"
                        name="startFrom"
                        placeholder="Start From"
                        component={Input}
                        disabled={disabled}
                        prefix={<ImLocation className="text-lg" />}
                    />
                </FormItem>
            </div>
            <div>
                <FormItem
                    label="End To"
                    asterisk
                    invalid={errors.endTo && touched.endTo}
                    errorMessage={errors.endTo}
                >
                    <Field
                        type="text"
                        name="endTo"
                        placeholder="End To"
                        component={Input}
                        disabled={disabled}
                        prefix={<ImLocation className="text-lg" />}
                    />
                </FormItem>
            </div>
        </div>
    );
};

export default Locations;
