import React from 'react';
import Side from './Side';
import View from 'views';
import { useSelector } from 'react-redux';
import { LAYOUT_TYPE_BLANK } from 'constants/theme.constant';

const AuthLayout = (props) => {
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            <Side>
                <View {...props} />
            </Side>
        </div>
    );
};

export default AuthLayout;
