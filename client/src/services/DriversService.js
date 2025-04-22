import ApiService from './ApiService';

export async function apiGetDrivers(data) {
    return ApiService.fetchData({
        url: '/drivers',
        method: 'get',
        data,
    });
}

export async function apiGetDriversOnDashboard(data) {
    return ApiService.fetchData({
        url: '/driversOnDashboard',
        method: 'post',
        data,
    });
}
export async function apiGetDriversQuery(data) {
    return ApiService.fetchData({
        url: '/driversQuery',
        method: 'post',
        data,
    });
}

export async function apiCreateNewDriverQuery(data) {
    return ApiService.fetchData({
        url: '/driversWithImage',
        method: 'post',
        data,
    });
}

export async function apiUpdateDriverQuery(data) {
    return ApiService.fetchData({
        url: '/drivers',
        method: 'put',
        data,
    });
}

export async function apiDeleteDriverQuery(data) {
    return ApiService.fetchData({
        url: '/drivers',
        method: 'delete',
        data,
    });
}
