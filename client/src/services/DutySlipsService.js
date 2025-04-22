import ApiService from './ApiService';

export async function apiCreateNewDutySlip(data) {
    return ApiService.fetchData({
        url: '/duty_slips',
        method: 'post',
        data,
    });
}

export async function apiGetDutySlips(data) {
    return ApiService.fetchData({
        url: '/duty_slips',
        method: 'get',
        data,
    });
}

export async function apiGetDutySlipsQuery(data) {
    return ApiService.fetchData({
        url: '/dutySlipsQuery',
        method: 'post',
        data,
    });
}

export async function apiUpdateDutySlipsQuery(data) {
    return ApiService.fetchData({
        url: '/duty_slips',
        method: 'put',
        data,
    });
}

export async function apiUpdateDutySlipsByCustomerIdQuery(data) {
    return ApiService.fetchData({
        url: '/duty_slips/customer',
        method: 'post',
        data,
    });
}

export async function apiDeleteDutySlip(data) {
    return ApiService.fetchData({
        url: '/duty_slips',
        method: 'delete',
        data,
    });
}

export async function apiGetDutySlipById(data) {
    return ApiService.fetchData({
        url: '/duty_slips/id',
        method: 'post',
        data,
    });
}

export async function apiUpdateDutySlip(data) {
    return ApiService.fetchData({
        url: '/duty_slips',
        method: 'put',
        data,
    });
}
