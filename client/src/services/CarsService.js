import ApiService from './ApiService';

export async function apiGetCars(data) {
    return ApiService.fetchData({
        url: '/cars',
        method: 'post',
        data,
    });
}

export async function apiGetCarsQuery(data) {
    return ApiService.fetchData({
        url: '/carsQuery',
        method: 'post',
        data,
    });
}

export async function apiDeleteCarsQuery(data) {
    return ApiService.fetchData({
        url: '/cars',
        method: 'delete',
        data,
    });
}

export async function apiCreateNewCarQuery(data) {
    return ApiService.fetchData({
        url: '/addCar',
        method: 'post',
        data,
    });
}

export async function apiUpdateCarQuery(data) {
    return ApiService.fetchData({
        url: '/cars',
        method: 'put',
        data,
    });
}
