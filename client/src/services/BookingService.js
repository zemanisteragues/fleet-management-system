import ApiService from './ApiService';

export async function apiGetDutySlips(data) {
    return ApiService.fetchData({
        url: '/bookings',
        method: 'post',
        data,
    });
}

export async function apiCancelDutySlip(data) {
    return ApiService.fetchData({
        url: '/cancelDutySlip',
        method: 'post',
        data,
    });
}

export async function apiGetDropdownData() {
    return ApiService.fetchData({
        url: '/getDropDowns',
        method: 'get',
    });
}

export async function apiCreateDutySlip(data) {
    return ApiService.fetchData({
        url: '/createBooking',
        method: 'post',
        data,
    });
}

export async function apiFetchDutySlip(id) {
    return ApiService.fetchData({
        url: `/bookings/${id}`,
        method: 'get',
    });
}

export async function apiUpdateDutySlip(data) {
    return ApiService.fetchData({
        url: '/updateBooking',
        method: 'post',
        data,
    });
}
