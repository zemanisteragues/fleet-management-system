import React from 'react';
import { Field } from 'formik';
import { FormItem } from 'components/ui';
import dayjs from 'dayjs';
import { FormNumericInput } from 'components/shared';
import { calculateNightHalt } from '../constants/utils';

const DutyTimings = (props) => {
    const { values, errors, touched, disabled } = props;

    const {
        dutyStartDateAndTime,
        dutyEndDateAndTime,
        // dutyType,
    } = values;
    const { ignoreLastDay } = values;

    const startDate = dayjs(dutyStartDateAndTime);
    const endDate = ignoreLastDay
        ? dayjs(dutyEndDateAndTime).subtract(1, 'day')
        : dayjs(dutyEndDateAndTime);
    const duration = endDate.diff(startDate);
    const hours = Math.floor(duration / 3600000);

    const nightHalt =  calculateNightHalt(values.dutyType, hours);
    let days = Math.floor(hours / 24);
    // solves the multiple click of ignore last day
    (ignoreLastDay)?days=days-1: days=days+1;
    return (

            <div className="grid grid-cols-2 gap-4">
                    <FormItem
                        asterisk
                        errorMessage={errors.nightHalt}
                        invalid={
                            errors.nightHalt &&
                            touched.nightHalt
                        }
                        label="Total Night halts"
                    >
                        <Field name="nightHalt">
                            {({ field, form }) => (
                                <FormNumericInput
                                    thousandSeparator={true}
                                    form={form}
                                    field={field}
                                    placeholder="Night halt"
                                    onValueChange={(e) => {
                                        form.setFieldValue(
                                            field.name,
                                         e.floatValue 
                                        );
                                    }}
                                    value={nightHalt || field.value}
                                    disabled={disabled}
                                />
                            )}
                        </Field>
                    </FormItem>
                    <div>
            <FormItem
                label="Night halt charges"
                asterisk
                invalid={errors.nightHaltCharges && touched.nightHaltCharges}
                errorMessage={errors.nightHaltCharges}
            >
                <Field name="nightHaltCharges">
                    {({ field, form }) => {
                        return (
                            <FormNumericInput
                                thousandSeparator={true}
                                form={form}
                                field={field}
                                placeholder="Night halt charges"
                                decimalScale={2}
                                onValueChange={(e) => {
                                    form.setFieldValue(
                                        field.name,
                                        e.floatValue
                                    );
                                }}
                                disabled={disabled}
                                value={field.value}
                                inputPrefix={
                                    <span className="font-semibold">INR</span>
                                }
                            />
                        );
                    }}
                </Field>
            </FormItem>
        </div>
            </div>
            
    );
};

export default DutyTimings;
