import React from 'react';
import { Input, DatePicker } from 'components/ui';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineCalendar } from 'react-icons/hi';
import { updateDetails } from '../store/dataSlice';

const BasicInformation = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.invoiceCreate.data);

    console.log('data', data);
    
    const details = data.details;
    const { billedTo, gstin, address, shippedTo } = details;

    return (
        <div>
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic client information</p>
            <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                    <label className="form-label">Invoice #</label>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Invoice #"
                        value={details.invoiceNumber}
                        disabled
                    />
                </div>
                <div>
                    <label className="form-label">Invoice Date</label>
                    <DatePicker
                        defaultValue={new Date()}
                        clearable={false}
                        maxDate={new Date()}
                        inputFormat="DD MMM, YYYY"
                        inputPrefix={<HiOutlineCalendar className="text-lg" />}
                        onChange={(date) =>
                            dispatch(
                                updateDetails({
                                    key: 'invoiceDate',
                                    value: date,
                                })
                            )
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="form-label">Billed To</label>
                    <Input
                        type="text"
                        placeholder="Billed To"
                        value={billedTo}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'billedTo',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
                <div>
                    <label className="form-label">GSTIN</label>
                    <Input
                        type="text"
                        placeholder="GSTIN"
                        value={gstin || 'NOT AVAILABLE'}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'gstin',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <label className="form-label">Address</label>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'address',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
                <div>
                    <label className="form-label">Shipped To</label>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Shipped To"
                        value={shippedTo}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'shippedTo',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <label className="form-label">Representative</label>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Representative"
                        value={details.representative}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'representative',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
                <div>
                    <label className="form-label">Place of Service</label>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Place of Service"
                        value={details.placeOfService}
                        onChange={(e) =>
                            dispatch(
                                updateDetails({
                                    key: 'placeOfService',
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicInformation;
