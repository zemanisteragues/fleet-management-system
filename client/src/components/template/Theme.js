import React from 'react';
import { ConfigProvider } from 'components/ui';
import { themeConfig } from 'configs/theme.config';

const Theme = (props) => {
    return (
        <ConfigProvider value={themeConfig}>{props.children}</ConfigProvider>
    );
};

export default Theme;
