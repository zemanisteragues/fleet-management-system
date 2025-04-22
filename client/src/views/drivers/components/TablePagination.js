import React from 'react';
import { Pagination } from 'components/ui';
import { Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/dataSlice';

const TablePagination = () => {
    const dispatch = useDispatch();

    const page = useSelector((state) => state.drivers.data.filters.currentPage);
    const totalCount = useSelector((state) => state.drivers.data.totalSize);
    const onPaginationChange = (val) => {
        dispatch(setFilters({ key: 'currentPage', value: val }));
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
