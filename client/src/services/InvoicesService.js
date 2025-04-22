import ApiService from './ApiService';

export async function apiGetInvoices(data) {
    return ApiService.fetchData({
        url: '/invoices',
        method: 'get',
        data,
    });
}

export async function apiDeleteInvoices(data) {
    return ApiService.fetchData({
        url: '/invoice',
        method: 'delete',
        data,
    });
}

export async function apiGetInvoicesDetails(data) {
    return ApiService.fetchData({
        url: '/fetchInvoiceDetails',
        method: 'post',
        data,
    });
}

export async function apiCreateInvoices(data) {
    return ApiService.fetchData({
        url: '/invoice',
        method: 'post',
        data,
    });
}

// for invoice creation this api is being used
export async function apiSubmitInvoice(data) {
    return ApiService.fetchData({
        url: '/submitInvoice',
        method: 'post',
        data,
    });
}

export async function apiUpdateStatusOfInvoices(data) {
    return ApiService.fetchData({
        url: '/invoiceStatus',
        method: 'post',
        data,
    });
}
