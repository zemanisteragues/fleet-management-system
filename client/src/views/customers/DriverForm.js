import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setNewDriverFirstName,
    setNewDriverAddress,
    setNewDriverLastName,
    setNewDriverLicenseExpiry,
    setNewDriverPhone,
    setNewDriverLicenseNumber,
} from './store/dataSlice';
import moment from 'moment';

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
        </div>
    );
};

export default DriverForm;
