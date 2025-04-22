import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { FormNumericInput } from 'components/shared';

const Price = (props) => {
    const { values, errors, touched, disabled } = props;
    return (
        <div>
            <FormItem
                label="Base Price"
                asterisk
                invalid={errors.basePrice && touched.basePrice}
                errorMessage={errors.basePrice}
            >
                <Field name="basePrice">
                    {({ field, form }) => {
                        return (
                            <FormNumericInput
                                thousandSeparator={true}
                                form={form}
                                field={field}
                                placeholder="Base Price"
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

export default Price;
