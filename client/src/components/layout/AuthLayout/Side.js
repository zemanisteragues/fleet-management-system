import React, { cloneElement } from 'react';
import { Avatar } from 'components/ui';
import Logo from 'components/template/Logo';
import { APP_NAME } from 'constants/app.constant';

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid h-full">
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    );
};

export default Side;
