import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  Select,
  Button,
  DatePicker,
  FormItem,
  FormContainer,
  InputGroup,
} from 'components/ui';
import { set } from 'lodash';
import { setDutyTypes, setUserData, setValid } from '../store/stateSlice';

export default function AddUserContainer() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');


  const validate = () => {
    if (role === '') {
      return false;
    }
    if (userName === '') {
      return false;
    }
    if (firstName === '') {
      return false;
    }
    if (lastName === '') {
      return false;
    }
    if (email === '') {
      return false;
    }
    if(email.includes('@') === false || email.includes('.') === false) {
      return false;
    }
    if (password === '') {
      return false;
    }
    if (confirm === '') {
      return false;
    }
    if (password !== confirm) {
      return false;
    }
    return true;
  }


  useEffect(() => {
    if (validate()) {
      const data = {
        role: role,
        username: userName,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }
      console.log(data)
      dispatch(setUserData(data))
    }
  }, [role, userName, email, confirm, dispatch]);

  const roles = [
    {
      value: 'ADMIN',
      label: 'ADMIN',
    },
    {
      value: 'GUEST',
      label: 'GUEST',
    }
  ];

  return (
    <div className="grid grid-flow-row auto-rows-max gap-4">
      <FormContainer>
        <FormItem label="Role" asterisk>
          <Select
            placeholder={role ? role : 'Please Select Role'}
            options={roles}
            value={role}
            onChange={(e) =>
              setRole(e.value)
            }
          ></Select>
        </FormItem>

        <FormItem
          label="User Name"
        >
          <Input
            type="text"
            autoComplete="off"
            name="userName"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}

          />
        </FormItem>

        <FormItem
          label="First Name"
        >
          <Input
            type="text"
            autoComplete="off"
            name="userName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}

          />
        </FormItem>

        <FormItem
          label="Last Name"
        >
          <Input
            type="text"
            autoComplete="off"
            name="userName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}

          />
        </FormItem>

        <FormItem
          label="Email"
        >
          <Input
            type="email"
            invalid={email.includes('@') === false || email.includes('.') === false}
            autoComplete="off"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}

          />
        </FormItem>
        <FormItem
          label="Password"
        >
          <Input
            autoComplete="off"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            invalid={password.split('').length < 8}
          />
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          <Input
            autoComplete="off"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            invalid={password !== confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormItem>
      </FormContainer>
    </div>
  )
}
