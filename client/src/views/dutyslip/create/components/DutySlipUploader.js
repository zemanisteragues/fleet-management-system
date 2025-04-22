import React, {useEffect} from 'react';
import {Field, Form, Formik} from 'formik';
import {FormItem} from 'components/ui';
import {UPLOADS_URL} from 'constants/api.constant';
import {Upload} from 'components/ui';
import CloseButton from 'components/ui/CloseButton';
import {saveAs} from "file-saver";

const MIN_UPLOAD = 0;
const MAX_UPLOAD = 1;

const DutySlipsUploader = (props) => {
    const {values, errors, touched, disabled} = props;
    const [fileList,
        setFileList] = React.useState([]);

    useEffect(() => {
        if (values.dutySlipsUpload) {
            setFileList([values.dutySlipsUpload]);
        }
    }, [values.dutySlipsUpload]);

    const onSetFormFile = (form, field, files) => {
        form.setFieldValue(field.name, files);
    };

    const beforeUpload = (file, fileList) => {
        let valid = true;

        const allowedFileType = ['image/jpeg', 'image/png', 'application/pdf'];
        const MAX_FILE_SIZE = 500000;

        if (fileList.length >= MAX_UPLOAD) {
            return `You can only upload ${MAX_UPLOAD} file(s)`;
        }

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg, .png or pdf file!';
            }

            if (f.size >= MAX_FILE_SIZE) {
                valid = 'Upload image cannot more then 500kb!';
            }
        }

        return valid;
    };

    const handleClick = (data)=>{
        const split = data.split("/");
        const findName = split[5].split(".");
        let url = data;
        saveAs(url, `${findName[0]}.${findName[1]}`);
       }
    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            <FormItem
                label="Attach duty slips"
                invalid={Boolean(errors.dutySlipsUpload && touched.dutySlipsUpload)}
                errorMessage={errors.dutySlipsUpload}>
                <Field name="dutySlipsUpload">
                    {({field, form}) => (<Upload
                        onChange={(files) => onSetFormFile(form, field, files)}
                        onFileRemove={(files) => onSetFormFile(form, field, files)}
                        beforeUpload={beforeUpload}
                        tip={<p className="mt-2">jpeg or png only(max 500 kb)</p>}/>)}
                </Field>
            </FormItem>

            {/* display images */}
            {typeof fileList?.[0] === 'string' && (
                    <div className="upload-file-list">
                        <div className="upload-file">
                            <img
                                src={`${UPLOADS_URL}/${fileList[0]}`}
                                width={'50%'}
                            />
                            <div style={{display: "grid", padding: "10px"}}>
                                <CloseButton
                                    onClick={() => ({})}
                                    className="upload-file-remove"
                                />
                                <a
                                    style={{cursor: "pointer"}}                                
                                    download
                                    onClick={() => handleClick(`${UPLOADS_URL}/${fileList[0]}`)}
                                >
                                    <i className="fa fa-download" />
                                    download
                                </a>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default DutySlipsUploader;
