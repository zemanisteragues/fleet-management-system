import React from 'react';
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineUser,
    HiOutlineDocumentText
} from 'react-icons/hi';

import { AiFillCar } from 'react-icons/ai';
import { FaFileInvoice, FaEdit } from 'react-icons/fa';
import { BsFileBarGraph } from 'react-icons/bs';

const navigationIcon = {
    home: <HiOutlineHome />,
    reporting: <FaFileInvoice />,
    cars: <AiFillCar />,
    invoice: <BsFileBarGraph />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    editAdmin: <FaEdit />,
    driver : <HiOutlineUser/>,
    dutySlips: <HiOutlineDocumentText/>
};

export default navigationIcon;
