import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNewCarRegistrationNumber, setNewCarType } from '../store/dataSlice';

const CarForm = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cars.data);
    const registrationNumber = data.newCar.registrationNumber;
    const carType = data.newCar.carType;

    const hasSubmit = data.newCar.isSubmit;

    return (
        <div className="grid grid-flow-row auto-rows-max gap-4">
            <TextField
                label="Registration Number"
                variant="outlined"
                fullWidth
                value={registrationNumber}
                onChange={(e) =>
                    dispatch(setNewCarRegistrationNumber(e.target.value))
                }
                error={hasSubmit && !registrationNumber}
            />

            <TextField
                label="Vehicle Type(Car, Color, Seating Capacity)"
                variant="outlined"
                fullWidth
                value={carType}
                onChange={(e) => dispatch(setNewCarType(e.target.value))}
                error={hasSubmit && !carType}
            />
        </div>
    );
};

export default CarForm;
