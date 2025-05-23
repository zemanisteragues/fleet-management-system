import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant';

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'duty_slips',
        path: '/dutyslip',
        title: 'Duty Slips',
        translateKey: 'nav.dutyslip',
        icon: 'dutySlips',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'invoice',
        path: '/invoice',
        title: 'Invoice',
        translateKey: 'nav.invoice',
        icon: 'invoice',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'customers',
        path: '/customers',
        title: 'Customers',
        translateKey: 'nav.customers',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'reporting',
        path: '/reporting',
        title: 'Reporting',
        translateKey: 'nav.reporting',
        icon: 'reporting',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'cars',
        path: '/cars',
        title: 'Vehicles',
        translateKey: 'nav.cars',
        icon: 'cars',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'drivers',
        path: '/drivers',
        title: 'Drivers',
        translateKey: 'nav.drivers',
        icon: 'driver',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'editAdmin',
        path: '/admin',
        title: 'Edit Admin',
        translateKey: 'nav.edit_admin',
        icon: 'editAdmin',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    }

    /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'collapseMenu',
    //     path: '',
    //     title: 'Collapse Menu',
    //     translateKey: 'nav.collapseMenu.collapseMenu',
    //     icon: 'collapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'collapseMenu.item1',
    //             path: '/collapse-menu-item-view-1',
    //             title: 'Collapse menu item 1',
    //             translateKey: 'nav.collapseMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'collapseMenu.item2',
    //             path: '/collapse-menu-item-view-2',
    //             title: 'Collapse menu item 2',
    //             translateKey: 'nav.collapseMenu.item2',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //     ],
    // },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
];

export default navigationConfig;
