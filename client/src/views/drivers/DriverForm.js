import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setNewDriverFirstName,
    setNewDriverAddress,
    setNewDriverLastName,
    setNewDriverLicenseExpiry,
    setNewDriverPhone,
    setNewDriverLicenseNumber,
    setNewDriverLicenseImage,
} from './store/dataSlice';
import { Upload, Button, Avatar } from 'components/ui';
import { HiOutlineCloudUpload, HiOutlinePlus } from 'react-icons/hi';
import { FcImageFile } from 'react-icons/fc';
import moment from 'moment';
import { UPLOADS_URL } from 'constants/api.constant';
import CloseButton from 'components/ui/CloseButton';

const Uploader = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.drivers.data);
    const licenseImage = data.newDriver.licenseImage;
    const hasSubmit = data.newDriver.isSubmit;
    const error = hasSubmit && !licenseImage;

    const maxUpload = 1;

    const beforeUpload = (file, fileList) => {
        let valid = true;

        const allowedFileType = ['image/jpeg', 'image/png'];
        const maxFileSize = 500000;

        if (fileList.length >= maxUpload) {
            return `You can only upload ${maxUpload} file(s)`;
        }

        if (data?.newDriver?.licenseImage) {
            return `You can only upload 1 file(s)`;
        }

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!';
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 500kb!';
            }
        }

        return valid;
    };

    const onFileUpload = (file) => {
        dispatch(setNewDriverLicenseImage(file[0]));
    };

    const onFileRemove = (_) => {
        dispatch(setNewDriverLicenseImage(null));
    };

    return (
        <div>
            <div className="mb-4 mt-4">
                <Upload
                    beforeUpload={beforeUpload}
                    uploadLimit={maxUpload}
                    onChange={onFileUpload}
                    onFileRemove={onFileRemove}
                >
                    <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                        Upload license
                    </Button>
                    <div className="mt-2">{error && 'License is required'}</div>
                </Upload>

                {/* IN Edit Image Display */}
                {typeof data?.newDriver?.licenseImage === 'string' && (
                    <div className="upload-file-list">
                        <div className="upload-file">
                            <img
                                src={`${UPLOADS_URL}/${data?.newDriver?.licenseImage}`}
                                width={'100%'}
                            />
                            <CloseButton
                                onClick={() => onFileRemove()}
                                className="upload-file-remove"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const DriverForm = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.drivers.data);
    const firstName = data.newDriver.firstName;
    const lastName = data.newDriver.lastName;
    const phone = data.newDriver.phone;
    const address = data.newDriver.address;
    const licenseNumber = data.newDriver.licenseNumber;
    const licenseExpiry = moment(data.newDriver.licenseExpiry).format(
        'YYYY-MM-DD'
    );
    const licenseImage = data.newDriver.licenseImage;
    const driverId = data.newDriver.driverId;

    const hasSubmit = data.newDriver.isSubmit;

    return (
        <div className="grid grid-flow-row auto-rows-max gap-4">
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) =>
                    dispatch(setNewDriverFirstName(e.target.value))
                }
                error={hasSubmit && !firstName}
            />

            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => dispatch(setNewDriverLastName(e.target.value))}
                error={hasSubmit && !lastName}
            />

            <TextField
                type="number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => dispatch(setNewDriverPhone(e.target.value))}
                error={hasSubmit && !phone}
            />

            <TextField
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={address}
                onChange={(e) => dispatch(setNewDriverAddress(e.target.value))}
                error={hasSubmit && !address}
            />

            <TextField
                label="License Number"
                variant="outlined"
                fullWidth
                value={licenseNumber}
                onChange={(e) =>
                    dispatch(setNewDriverLicenseNumber(e.target.value))
                }
                error={hasSubmit && !licenseNumber}
            />

            <TextField
                type="date"
                label="License Expiry"
                variant="outlined"
                fullWidth
                value={licenseExpiry}
                onChange={(e) =>
                    dispatch(setNewDriverLicenseExpiry(e.target.value))
                }
            />

            {/* {
                driverId && licenseImage &&
                <div className="flex flex-col items-center">
                    <div className="mb-2">
                        <span className="text-black-500 text-bold">Current License</span>
                        <img
                            size="large"
                            src={UPLOADS_URL+licenseImage}
                            width='360px'
                            height='180px'
                        />
                    </div>
                </div>
            } */}
            <Uploader />
        </div>
    );
};

export default DriverForm;
