import ApiService from './ApiService';

export async function apiGetCustomers(data) {
    return ApiService.fetchData({
        url: '/customers',
        method: 'get',
        data,
    });
}

export async function apiCreateCustomer(data) {
    return ApiService.fetchData({
        url: '/customers',
        method: 'post',
        data,
    });
}

export async function apiGetCustomersQuery(data) {
    return ApiService.fetchData({
        url: '/customersQuery',
        method: 'post',
        data,
    });
}

export async function apiDeleteCustomer(data) {
    return ApiService.fetchData({
        url: '/customers',
        method: 'delete',
        data,
    });
}

export async function apiGetCustomersByQuery(data) {
    return ApiService.fetchData({
        url: '/searchCustomer',
        method: 'post',
        data,
    });
}

export async function apiUpdateCustomer(data) {
    return ApiService.fetchData({
        url: '/customers',
        method: 'put',
        data,
    });
}

export async function apiRestoreCustomer(data) {
    return ApiService.fetchData({
        url: '/restoreCustomer',
        method: 'put',
        data,
    });
}
