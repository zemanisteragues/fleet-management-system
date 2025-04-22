import { Button } from 'components/ui'
import React , {useMemo}from 'react'
import DutyTypesList from './components/DutyTypesList'
import { injectReducer } from 'store'
import reducer from './store';
import AddDutyType from './components/AddDutyType';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from './store/stateSlice';
import { Card } from 'components/ui';
import { DoubleSidedImage } from 'components/shared';
import { Navigate, useNavigate } from 'react-router-dom';
injectReducer('admin', reducer);
const data = [
    { label: 'Duty Types', value: 'duty_types' },
    { label: 'Users', value: 'users' },
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

export default function AdminPanel() {
  const dispatch = useDispatch();
  const openDrawer = () => {
    dispatch(setDrawerOpen(true));
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            {data.map((cat, id) => (
                <Card clickable key={id} onClick={() => {
                  navigate(cat.value)
                }}>
                    <div className="mb-4 flex justify-center">
                        <CategoryIcon type={cat.id} />
                    </div>
                    <div className="text-center">
                        <h5 className="mb-1">{cat.label}</h5>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  )
}
