import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FormItem } from 'components/ui';
import { Input } from 'components/ui';
import { HiOutlineUser, HiPhone } from 'react-icons/hi';
import { FormNumericInput } from 'components/shared';

import { Upload } from 'components/ui';
const MIN_UPLOAD = 0;
const MAX_UPLOAD = 10;

const TollTax = (props) => {
    const { values, errors, touched, disabled } = props;
    const onSetFormFile = (form, field, files) => {
        form.setFieldValue(field.name, files);
    };

    const beforeUpload = (file, fileList) => {
        let valid = true;

        const allowedFileType = ['image/jpeg', 'image/png'];
        const MAX_FILE_SIZE = 500000;

        if (fileList.length >= MAX_UPLOAD) {
            return `You can only upload ${MAX_UPLOAD} file(s)`;
        }

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!';
            }

            if (f.size >= MAX_FILE_SIZE) {
                valid = 'Upload image cannot more then 500kb!';
            }
        }

        return valid;
    };
    
    let getFileData = values.tollUpload;
    if (typeof values.tollUpload === 'string'){
        getFileData = values.tollUpload.split(",");
    }
    
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormItem
                label="Total Toll Tax"
                invalid={errors.tollTax && touched.tollTax}
                errorMessage={errors.tollTax}
            >
                <Field name="tollTax">
                    {({ field, form }) => {
                        return (
                            <FormNumericInput
                                thousandSeparator={true}
                                form={form}
                                field={field}
                                placeholder="Total Toll Tax"
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
                label="Toll Receipts"
                invalid={Boolean(errors.tollUpload && touched.tollUpload)}
                errorMessage={errors.tollUpload}
            >
                <Field name="tollUpload">
                    {({ field, form }) => (
                        <Upload
                            onChange={(files) =>
                                onSetFormFile(form, field, files)
                            }
                            onFileRemove={(files) =>
                                onSetFormFile(form, field, files)
                            }
                            beforeUpload={beforeUpload}
                            fileList={getFileData || []}
                            multiple={true}
                            tip={<p className="mt-2">jpeg or png only (max 500kb)</p>}
                        />
                    )}
                </Field>
            </FormItem>
        </div>
    );
};

export default TollTax;
