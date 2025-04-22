import React from 'react';
import { DatePicker } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import { FormItem, Checkbox } from 'components/ui';
import { TbCalendarStats } from 'react-icons/tb';
import dayjs from 'dayjs';

const { DateTimepicker } = DatePicker;

const DutyTimings = (props) => {
    const { values, errors, touched, disabled } = props;

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <FormItem
                        asterisk
                        errorMessage={errors.dutyStartDateAndTime}
                        invalid={
                            errors.dutyStartDateAndTime &&
                            touched.dutyStartDateAndTime
                        }
                        label="Duty Start Date & Time"
                    >
                        <Field name="dutyStartDateAndTime" placeholder="Date">
                            {({ field, form }) => (
                                <DateTimepicker
                                    field={field}
                                    form={form}
                                    inputPrefix={
                                        <TbCalendarStats className="text-xl" />
                                    }
                                    inputSuffix={null}
                                    maxDate={dayjs(new Date()).toDate()}
                                    value={field.value}
                                    disabled={disabled}
                                    onChange={(date) => {
                                        form.setFieldValue(field.name, date);
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        asterisk
                        errorMessage={errors.dutyEndDateAndTime}
                        invalid={
                            errors.dutyEndDateAndTime &&
                            touched.dutyEndDateAndTime
                        }
                        label="Duty End Date & Time"
                    >
                        <Field name="dutyEndDateAndTime" placeholder="Date">
                            {({ field, form }) => (
                                <DateTimepicker
                                    field={field}
                                    form={form}
                                    inputPrefix={
                                        <TbCalendarStats className="text-xl" />
                                    }
                                    inputSuffix={null}
                                    maxDate={dayjs(new Date()).toDate()}
                                    minDate={dayjs(
                                        values.dutyStartDateAndTime
                                    ).toDate()}
                                    value={field.value}
                                    disabled={disabled}
                                    onChange={(date) => {
                                        form.setFieldValue(field.name, date);
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                    <FormItem>
                        <Field
                            name="ignoreLastDay"
                            component={Checkbox}
                            disabled={disabled}
                            children="Ignore last day?"
                        />
                    </FormItem>
                </div>
            </div>
        </div>
    );
};

export default DutyTimings;
