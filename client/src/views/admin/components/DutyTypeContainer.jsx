import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
import { setDutyTypes, setValid } from '../store/stateSlice';

export default function DutyTypeContainer() {
  const dispatch = useDispatch();
  const [time, setTime] = useState();
  const [hasSubmit, setHasSubmit] = useState(false);
  const [days, setDays] = useState(); // Set an initial value for days
  const [hours, setHours] = useState();
  const [kms, setKms] = useState(0);

  const validate = () => {
    if (time === 'HOURS') {
      if (hours === 0) {
        return false;
      }
    }
    if (kms === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if(validate()){
      let dutyType = '';
      if (time === 'PER DAY') {
        setDays(1);
        setHours(0);
        dutyType = `${kms} KMS ${time}`;
      } else {
        setDays(0);
        dutyType = `${hours} HRS ${kms} KMS`;
      }
      const dataSlice = {
        dutyType: dutyType,
        kms: kms,
        hours: hours,
        days: days,
        status : 'ACTIVE'
      };
  
      if ( kms !== 0 && (days === 1 || hours !== 0) && time !== '') {
        dispatch(setValid(true))
        dispatch(setDutyTypes(dataSlice));
      }
    }
  }, [days, hours, kms, time, dispatch]);

  const timeData = [
    {
      value: 'PER DAY',
      label: 'PER DAY',
    },
    {
      value: 'HOURS',
      label: 'HOURS',
    }
  ];

  return (
    <div className="grid grid-flow-row auto-rows-max gap-4">
      <FormContainer>
        <FormItem label="Time" asterisk>
          <Select
            placeholder={time ? time : 'Please Select Time'}
            options={timeData}
            value={time}
            onChange={(e) =>
              setTime(e.value)
            }
          ></Select>
        </FormItem>

        {
          time === 'HOURS' ? <>
            <FormItem label={`Hours`} asterisk>
              <Input
                placeholder={"Set Hours"}
                size="sm"
                onChange={(e) =>
                  setHours(parseInt(e.target.value))
                }
                invalid={hasSubmit && (hours === 0)}
              ></Input>
            </FormItem>
          </> : null
        }

        <FormItem label="Distance">
          <Input
            placeholder="Kms"
            size="sm"
            onChange={(e) =>
              setKms(parseInt(e.target.value))
            }
            invalid={hasSubmit && kms === 0}
          ></Input>
        </FormItem>
      </FormContainer>
    </div>
  )
}
