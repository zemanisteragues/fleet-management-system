import React from 'react'
import AddDutyType from './components/AddDutyType';
import DutyTypesList from './components/DutyTypesList'
import reducer from './store';
import { injectReducer } from 'store'

injectReducer('admin', reducer);

export default function DutyTypes() {
  return (
    <div className="p-2">
      <div
        className="flex justify-between items-center mb-4 lg:mb-2 "
      >
        <h2
          className="mb-4 lg:mb-0"
        >Duty Types</h2>
        <AddDutyType />
      </div>
      <DutyTypesList />
    </div>
  )
}
