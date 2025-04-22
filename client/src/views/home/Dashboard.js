import React, { useMemo } from 'react';
import { Card } from 'components/ui';
import { DoubleSidedImage } from 'components/shared';

const data = [
    { label: 'Add Duty Slips', value: 'duty_slips' },
    { label: 'Drivers Info', value: 'driver_details' },
    { label: 'Cars Info', value: 'car_details' },
    { label: 'Customers Info', value: 'customers_info' },
    { label: 'Reports', value: 'reports' },
];

const CategoryIcon = ({ type }) => {
    const iconTypeProps = useMemo(() => {
        return {
            src: `/img/help-center-category-0.png`,
            darkModeSrc: `/img/help-center-category-0.png`,
        };
    }, [type]);

    return <DoubleSidedImage {...iconTypeProps} alt="" />;
};
const Dashboard = () => {
    return (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            {data.map((cat, id) => (
                <Card clickable key={id} onClick={() => {}}>
                    <div className="mb-4 flex justify-center">
                        <CategoryIcon type={cat.id} />
                    </div>
                    <div className="text-center">
                        <h5 className="mb-1">{cat.label}</h5>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Dashboard;
