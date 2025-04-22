import React from 'react';
import authRoute from './authRoute';

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/Dashboard')),
        authority: [],
    },
    {
        key: 'reporting',
        path: '/reporting',
        component: React.lazy(() => import('views/reporting/Dashboard')),
        authority: [],
    },
    {
        key: 'cars',
        path: '/cars',
        component: React.lazy(() => import('views/cars/Dashboard')),
        authority: [],
    },
    {
        key: 'drivers',
        path: '/drivers',
        component: React.lazy(() => import('views/drivers/Dashboard')),
        authority: [],
    },
    {
        key: 'customers',
        path: '/customers',
        component: React.lazy(() => import('views/customers/Dashboard')),
        authority: [],
    },
    {
        key: 'dutyslip',
        path: '/dutyslip',
        component: React.lazy(() => import('views/dutyslip/list/Dashboard')),
        authority: [],
    },
    {
        key: 'duty_slip',
        path: '/duty_slip',
        component: React.lazy(() => import('views/duty_slip/Dashboard')),
        authority: [],
    },
    {
        key: 'duty_slip.create',
        path: '/duty_slip/create',
        component: React.lazy(() => import('views/duty_slip/create/Dashboard')),
        authority: [],
    },
    {
        key: 'duty_slip.add',
        path: '/dutyslip/add',
        component: React.lazy(() =>
            import('views/duty_slip/create_new/Dashboard')
        ),
        authority: [],
    },
    {
        key: 'duty_slip.view',
        path: '/duty_slip/view/:id',
        component: React.lazy(() => import('views/duty_slip/create/View')),
        authority: [],
    },
    {
        key: 'invoice',
        path: '/invoice',
        component: React.lazy(() => import('views/invoice/list/Dashboard')),
        authority: [],
    },
    {
        key: 'invoice.create',
        path: '/invoice/create',
        component: React.lazy(() => import('views/invoice/create/Dashboard')),
        authority: [],
    },
    // {
    //     key: 'invoice.view',
    //     path: '/invoice/view',
    //     component: React.lazy(() => import('views/invoice/create/View')),
    //     authority: [],
    // },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: React.lazy(() => import('views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() =>
            import('views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },

];


export const adminRoutes = [
    {
        key: 'groupMenu.collapse.item2',
        path: '/admin',
        component: React.lazy(() =>
            import('views/admin/AdminPanel')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/admin/duty_types',
        component: React.lazy(() =>
            import('views/admin/DutyTypes')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/admin/users',
        component: React.lazy(() =>
            import('views/admin/User')
        ),
        authority: [],
    },
]