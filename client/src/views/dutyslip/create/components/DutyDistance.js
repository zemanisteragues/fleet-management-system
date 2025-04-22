import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { BsSpeedometer2 } from 'react-icons/bs';

const DutyDistance = (props) => {
    const { values, errors, touched, disabled } = props;
    console.log(!(parseInt(values.dutyStartKm) >= 0));
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <FormItem
                    label="Duty Start KM"
                    asterisk
                    invalid={!(parseInt(values.dutyStartKm) >= 0)}
                    errorMessage={errors.dutyStartKm}
                >
                    <Field
                        type="text"
                        name="dutyStartKm"
                        placeholder="Duty Start KM"
                        component={Input}
                        disabled={disabled}
                        prefix={<BsSpeedometer2 className="text-lg" />}
                    />
                </FormItem>
            </div>
            <div>
                <FormItem
                    label="Duty End KM"
                    asterisk
                    invalid={errors.dutyEndKm && touched.dutyEndKm}
                    errorMessage={errors.dutyEndKm}
                >
                    <Field
                        type="text"
                        name="dutyEndKm"
                        placeholder="Duty End KM"
                        component={Input}
                        disabled={disabled}
                        prefix={<BsSpeedometer2 className="text-lg" />}
                    />
                </FormItem>
            </div>
        </div>
    );
};

export default DutyDistance;
