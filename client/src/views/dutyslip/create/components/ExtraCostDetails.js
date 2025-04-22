import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { FormNumericInput } from 'components/shared';

const ExtraCostDetails = (props) => {
    const { values, errors, touched, disabled } = props;

    return (
        <div className="grid grid-cols-2 gap-4">
            <FormItem
                label="Per Extra KM Price"
                asterisk
                invalid={errors.perExtraKmPrice && touched.perExtraKmPrice}
                errorMessage={errors.perExtraKmPrice}
            >
                <Field name="perExtraKmPrice">
                    {({ field, form }) => {
                        return (
                            <FormNumericInput
                                thousandSeparator={true}
                                form={form}
                                field={field}
                                placeholder="Per Extra KM Price"
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
            <FormItem
                label="Per Extra Hr Price"
                asterisk
                invalid={errors.perExtraHrPrice && touched.perExtraHrPrice}
                errorMessage={errors.perExtraHrPrice}
            >
                <Field name="perExtraHrPrice">
                    {({ field, form }) => {
                        return (
                            <FormNumericInput
                                thousandSeparator={true}
                                form={form}
                                field={field}
                                placeholder="Per Extra Hr Price"
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
    );
};

export default ExtraCostDetails;
