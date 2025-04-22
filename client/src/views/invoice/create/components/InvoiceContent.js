import React, { useEffect, useState } from 'react';
import { Button } from 'components/ui';
import { Loading } from 'components/shared';
import Logo from 'components/template/Logo';
import ContentTable from './ContentTable';
import { useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { HiLocationMarker, HiPhone } from 'react-icons/hi';
import useThemeClass from 'utils/hooks/useThemeClass';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { calculateTaxesAndTotal } from './AmountInfo';

const InvoiceContent = () => {
    const { textTheme } = useThemeClass();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.invoiceCreate.data.details);
    const details = useSelector((state) => state.invoiceCreate.data.dutySlips);
    const [taxDetails, setTaxDetails] = useState({});
    useEffect(() => {
        //fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTaxDetails(calculateTaxesAndTotal(details));
    }, [details]);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 mt-10">
                <div>
                    <address className="not-italic">
                        <div>
                            <h5>Dream Cars Tours & Travels </h5>
                            <br />
                            <span>
                                Jibagiri Path, Ashram Road, Near Ulubari Post
                                Office
                            </span>
                            <br />
                            <span>Ulubari, Guwahati - 781007, Assam</span>
                            <br />
                            <abbr title="Phone">Phone:</abbr>
                            <span> 9101 223 904</span>
                            <br />
                            <abbr title="E-Mail">Email:</abbr>
                            <span> dreamcars1978@gmail.com</span>
                        </div>
                    </address>
                </div>
                <div className="my-4">
                    <div className="mb-2">
                        <h4>Invoice #{data.invoiceNumber}</h4>
                        <span>
                            Date:{' '}
                            {moment(data.invoiceDate).format('DD MMM, YYYY')}
                        </span>
                    </div>
                    <h6>{data.billedTo}</h6>
                    <div className="mt-4 flex">
                        <HiLocationMarker className={`text-xl ${textTheme}`} />
                        <div className="ltr:ml-3 rtl:mr-3">
                            <div className="mb-1">{data.address}</div>
                        </div>
                    </div>
                    <div className="mt-4 flex">
                        <HiPhone className={`text-xl ${textTheme}`} />
                        <div className="ltr:ml-3 rtl:mr-3">
                            {data.customerPhone}
                        </div>
                    </div>
                </div>
            </div>
            <ContentTable 
            grandTotal={taxDetails.grandTotal}
            subTotal={taxDetails.subTotal}
            igst={taxDetails.igst}
            trips={details}
            />
            <div className="print:hidden mt-16 flex items-center justify-between">
                <small className="italic">
                    Invoice was created on a computer and is valid without the
                    signature and seal.
                </small>
            </div>
        </>
    );
};

export default InvoiceContent;
