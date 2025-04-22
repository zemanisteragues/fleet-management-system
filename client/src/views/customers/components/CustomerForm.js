import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNewCustomer } from '../store/dataSlice';
import {
    Input,
    Select,
    Button,
    DatePicker,
    FormItem,
    FormContainer,
    InputGroup,
} from 'components/ui';
const CustomerForm = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.customers.data.newCustomer);
    const firstName = data.firstName;
    const lastName = data.lastName;
    const phone = data.phone;
    const address = data.address;
    const companyName = data.companyName;
    const gstNumber = data.gstNumber;
    const city = data.city;
    const state = data.state;
    const country = data.country;
    const customerType = data.customerType;
    const email = data.email;
    const remarks = data.remarks;

    const hasSubmit = data.isSubmit;
    const customerTypeOptions = [
        { label: 'Company', value: 1 },
        { label: 'Individual', value: 0 },
    ];
    const customerTypeOptionsIndex = customerTypeOptions.findIndex(
        (item) => item.value === customerType
    );

    return (
        <div className="grid grid-flow-row auto-rows-max gap-4">
            <FormContainer>
                <FormItem label="Customer Type" asterisk>
                    <Select
                        placeholder="Please Select"
                        options={customerTypeOptions}
                        value={customerTypeOptions[customerTypeOptionsIndex]}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'customerType',
                                    value: e.value,
                                })
                            )
                        }
                    ></Select>
                </FormItem>

                {customerType === 1 ? (
                    <>
                        <FormItem label="Company Name" asterisk>
                            <Input
                                placeholder="Company Name"
                                size="sm"
                                value={companyName}
                                onChange={(e) =>
                                    dispatch(
                                        setNewCustomer({
                                            key: 'companyName',
                                            value: e.target.value,
                                        })
                                    )
                                }
                                invalid={hasSubmit && !companyName}
                            ></Input>
                        </FormItem>
                        <FormItem label="GST Number">
                            <Input
                                placeholder="GST Number"
                                size="sm"
                                value={gstNumber}
                                onChange={(e) =>
                                    dispatch(
                                        setNewCustomer({
                                            key: 'gstNumber',
                                            value: e.target.value,
                                        })
                                    )
                                }
                                invalid={hasSubmit && !gstNumber}
                            ></Input>
                        </FormItem>
                    </>
                ) : (
                    <>
                        <FormItem label="First Name" asterisk>
                            <Input
                                placeholder="First Name"
                                size="sm"
                                value={firstName}
                                onChange={(e) =>
                                    dispatch(
                                        setNewCustomer({
                                            key: 'firstName',
                                            value: e.target.value,
                                        })
                                    )
                                }
                                invalid={hasSubmit && !firstName}
                            ></Input>
                        </FormItem>
                        <FormItem label="Last Name" asterisk>
                            <Input
                                placeholder="Last Name"
                                size="sm"
                                value={lastName}
                                onChange={(e) =>
                                    dispatch(
                                        setNewCustomer({
                                            key: 'lastName',
                                            value: e.target.value,
                                        })
                                    )
                                }
                                invalid={hasSubmit && !lastName}
                            ></Input>
                        </FormItem>
                    </>
                )}
                <FormItem label="Phone" asterisk>
                    <Input
                        placeholder="Phone"
                        size="sm"
                        value={phone}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'phone',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !phone}
                    ></Input>
                </FormItem>
                <FormItem label="Email" asterisk>
                    <Input
                        placeholder="Email"
                        size="sm"
                        value={email}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'email',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !email}
                    ></Input>
                </FormItem>
                <FormItem label="Address" asterisk>
                    <Input
                        placeholder="Address"
                        size="sm"
                        value={address}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'address',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !address}
                    ></Input>
                </FormItem>
                <FormItem label="City" asterisk>
                    <Input
                        placeholder="City"
                        size="sm"
                        value={city}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'city',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !city}
                    ></Input>
                </FormItem>
                <FormItem label="State" asterisk>
                    <Input
                        placeholder="State"
                        size="sm"
                        value={state}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'state',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !state}
                    ></Input>
                </FormItem>
                <FormItem label="Country" asterisk>
                    <Input
                        placeholder="Country"
                        size="sm"
                        value={country}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'country',
                                    value: e.target.value,
                                })
                            )
                        }
                        invalid={hasSubmit && !country}
                    ></Input>
                </FormItem>
                <FormItem label="Customer Notes">
                    <Input
                        placeholder="Enter customer notes here..."
                        size="sm"
                        value={remarks}
                        onChange={(e) =>
                            dispatch(
                                setNewCustomer({
                                    key: 'remarks',
                                    value: e.target.value,
                                })
                            )
                        }
                        textArea
                    ></Input>
                </FormItem>
            </FormContainer>
        </div>
    );
};

export default CustomerForm;
