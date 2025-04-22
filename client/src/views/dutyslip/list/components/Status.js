import React from 'react';
import {Tag, Tooltip} from 'components/ui';

const Status = ({status}) => {
    const openText = 'Open duty slips are not attached to an invoice. They can be edited and cancelled.'
    const closedText = 'Closed duty slips are attached to an invoice. They cannot be edited or cancelled.'
    const cancelledText = 'Cancelled duty slips are cancelled by the administrator. They cannot be edited.';

    switch (status) {
        case 'open':
            return (
                <Tooltip title={openText} placement="top">
                    <Tag
                        className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0">
                        Open
                    </Tag>
                </Tooltip>
            );
        case 'close':
            return (
                <Tooltip title={closedText} placement="top">
                    <Tag
                        className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100 border-0">
                        Closed
                    </Tag>
                </Tooltip>

            );
        case 'cancel':
            return (
                <Tooltip title={cancelledText} placement="top">
                    <Tag
                        className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0">
                        Cancelled
                    </Tag>
                </Tooltip>
            );
    }
};

export default Status;
