import React from 'react';
import { Pagination } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setPageIndex, getCustomersByQuery } from '../store/dataSlice';

const TablePagination = () => {
    const dispatch = useDispatch();

    const page = useSelector((state) => state.customers.data.pageIndex);
    const totalCount = useSelector((state) => state.customers.data.totalCount);

    const onPaginationChange = (val) => {
        dispatch(setPageIndex(val));
        dispatch(getCustomersByQuery());
    };

    return (
        <div>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    total={totalCount / 10}
                    currentPage={page}
                    onChange={onPaginationChange}
                />
            </div>
        </div>
    );
};

export default TablePagination;
