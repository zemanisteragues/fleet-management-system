import React from 'react';
import { Pagination } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, getCustomersByQuery } from '../store/dataSlice';

const TablePagination = () => {
    const dispatch = useDispatch();

    const page = useSelector(
        (state) => state.dutySlipsList.data.filters.pageIndex
    );
    const pageSize = useSelector(
        (state) => state.dutySlipsList.data.filters.pageSize
    );
    const totalCount = useSelector((state) => state.dutySlipsList.data.total);

    console.log('page', page);
    const onPaginationChange = (value) => {
        dispatch(setFilters({ name: 'pageIndex', value }));
        //dispatch(getCustomersByQuery());
    };

    return (
        <div className="mt-4 ">
            {/* <div className="flex items-center justify-between mt-4"> */}
            <Pagination
                total={totalCount / pageSize}
                currentPage={page}
                onChange={onPaginationChange}
            />
            {/* </div> */}
        </div>
    );
};

export default TablePagination;
