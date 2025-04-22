import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Card } from 'components/ui';
import { Avatar } from 'components/ui';
import { HiMinus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setTrips } from './store/dataSlice';

const DutySlipRows = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.createDutySlip.data);
    const trips = useSelector((state) => state.createDutySlip.data.trips);
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );
    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;

    const initialData = {
        reportDate: '',
        reportingTime: '',
        releaseDate: '',
        releaseTime: '',
        startingKm: '',
        closingKm: '',
        pickupLocation: '',
        dropLocation: '',
    };

    const [rows, setRows] = useState(
        currentPage === 'view' ? trips : [initialData]
    );

    useEffect(() => {
        setRows(trips);
    }, [trips]);

    const addRow = () => {
        setRows([
            ...rows,
            {
                reportDate: '',
                reportingTime: '',
                releaseDate: '',
                releaseTime: '',
                startingKm: '',
                closingKm: '',
                pickupLocation: '',
                dropLocation: '',
            },
        ]);
    };

    const removeRow = (index) => {
        if (rows.length === 1) return;
        setRows(rows.filter((_, i) => i !== index));
    };

    const handleRowChange = (index, field, value) => {
        const newRow = { ...rows[index], [field]: value };
        setRows(rows.map((row, i) => (i === index ? newRow : row)));
    };

    useEffect(() => {
        hasSubmit && dispatch(setTrips(rows));
    }, [dispatch, hasSubmit]);

    console.log('rows', rows);
    console.log('trips', trips);

    return (
        <>
            <Grid item xs={12} className="mt-4">
                <Card
                    header={<span>Entries</span>}
                    headerClass="font-semibold text-lg"
                >
                    <Grid container spacing={2}>
                        {rows.map((row, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        id={`pickupLocation-${index}`}
                                        name="pickupLocation"
                                        label="From"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.pickupLocation}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'pickupLocation',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.pickupLocation}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        id={`dropLocation-${index}`}
                                        name="dropLocation"
                                        label="Drop Location"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.dropLocation}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'dropLocation',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.dropLocation}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        id={`reportDate-${index}`}
                                        name="reportDate"
                                        label="Report Date"
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.reportDate}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'reportDate',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.reportDate}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={1}>
                                    <TextField
                                        fullWidth
                                        id={`reportingTime-${index}`}
                                        name="reportingTime"
                                        label="Report Time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.reportingTime}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'reportingTime',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.reportingTime}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        id={`releaseDate-${index}`}
                                        name="releaseDate"
                                        label="Release Date"
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.releaseDate}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'releaseDate',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.releaseDate}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={1}>
                                    <TextField
                                        fullWidth
                                        id={`releaseTime-${index}`}
                                        name="releaseTime"
                                        label="Release time"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.releaseTime}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'releaseTime',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.releaseTime}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={1}>
                                    <TextField
                                        fullWidth
                                        id={`startingKm-${index}`}
                                        name="startingKm"
                                        label="Starting KM"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.startingKm}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'startingKm',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.startingKm}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <TextField
                                        fullWidth
                                        id={`closingKm-${index}`}
                                        name="closingKm"
                                        label="Closing KM"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={row.closingKm}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                'closingKm',
                                                e.target.value
                                            )
                                        }
                                        disabled={isDisabled}
                                        error={hasSubmit && !row.closingKm}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <div className="flex items-center justify-center">
                                        {/* <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={<GrClose />}
                                            onClick={() => removeRow(index)}
                                            disabled={isDisabled}
                                        /> */}
                                        <Avatar
                                            shape="circle"
                                            className="mr-4"
                                            onClick={() => removeRow(index)}
                                            icon={<HiMinus />}
                                        />
                                    </div>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addRow}
                                disabled={isDisabled}
                            >
                                Add Row
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    );
};

export default DutySlipRows;
