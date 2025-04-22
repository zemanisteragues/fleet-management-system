import React from 'react'
import AddUsers from './components/AddUsers'
import DutyTypesList from './components/DutyTypesList'
import reducer from './store';
import { injectReducer } from 'store'
import UsersList from './components/UsersList';
injectReducer('admin', reducer);

export default function User() {
  return (
    <div className="p-2">
      <div
        className="flex justify-between items-center mb-4 lg:mb-2 "
      >
        <h2
          className="mb-4 lg:mb-0"
        >Users</h2>
        <AddUsers />
      </div>
      <UsersList />
    </div>
  )
}
