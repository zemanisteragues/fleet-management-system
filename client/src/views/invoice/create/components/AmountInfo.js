import React, { useEffect } from 'react';
import { Input } from 'components/ui';
import { FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
//import toWords from 'number-to-words';
import { ToWords } from 'to-words';

const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: {
            // can be used to override defaults for the selected locale
            name: 'Rupee',
            plural: 'Rupees',
            symbol: '₹',
            fractionalUnit: {
                name: 'Paisa',
                plural: 'Paise',
                symbol: '',
            },
        },
    },
});

const PriceInput = (props) => {
    return (
        <Input
            {...props}
            value={props.value}
            autoComplete="off"
            prefix={<FaRupeeSign />}
            size="sm"
        />
    );
};

export const calculateTaxesAndTotal = (details) => {
   let subTotal = calculateTotal(details);
    let cgst = calculatetax(subTotal);
    let sgst = calculatetax(subTotal);
    let igst = cgst + sgst;
    let grandTotal = subTotal + igst;
    let words = toWords.convert(grandTotal);
    return {
        "subTotal": subTotal,
        "cgst": cgst,
        "sgst": sgst,
        "igst": igst,
        "grandTotal": grandTotal,
        "words": words
    }
};

const calculateTotal = (array) => {
    console.log(array);
    let total = 0;
    array.forEach((item) => {
        total += item.subTotal;
    });
    return total;
}

const calculatetax = (cost) => {
    return cost * 0.05;
}

const AmountInfo = () => {
    const details = useSelector((state) => state.invoiceCreate.data.dutySlips);
    const [data, setdata] = React.useState({});
    useEffect(() => {
        setdata(calculateTaxesAndTotal(details));
    }, [details]);

    //  toWords.convert(data.grandTotal || 0);
    return (
        <div className="mt-12">
            <h5 className="mt-6">Pricing Information</h5>
            <p className="mb-6">Please confirm pricing once!</p>

            <div className="grid grid-cols-5 gap-4 ">
                <div>
                    <label className="form-label">Sub-total</label>
                    <NumberFormat
                        value={data.subTotal}
                        customInput={PriceInput}
                        disabled
                        thousandsGroupStyle="lakh"
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                    />
                </div>
                <div>
                    <label className="form-label">CGST (5%)</label>
                    <NumberFormat
                        value={data.cgst}
                        customInput={PriceInput}
                        disabled
                        thousandsGroupStyle="lakh"
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                    />
                </div>
                <div>
                    <label className="form-label">SGST (5%)</label>
                    <NumberFormat
                        value={data.sgst}
                        customInput={PriceInput}
                        disabled
                        thousandsGroupStyle="lakh"
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                    />
                </div>
                <div>
                    <label className="form-label">
                        IGST (5%) = CGST (5%) + SGST (5%)
                    </label>
                    <NumberFormat
                        value={data.igst}
                        customInput={PriceInput}
                        disabled
                        thousandsGroupStyle="lakh"
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                    />
                </div>
                <div>
                    <label className="form-label">
                        Grand Total (inclusive of all taxes)
                    </label>
                    <NumberFormat
                        value={data.grandTotal}
                        customInput={PriceInput}
                        disabled
                        thousandsGroupStyle="lakh"
                        thousandSeparator={true}
                        allowNegative={false}
                        decimalScale={2}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="flex items-end justify-end">
                    <p className="capitalize font-bold text-right heading-text">
                        Rupees {data.words} /-
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AmountInfo;
