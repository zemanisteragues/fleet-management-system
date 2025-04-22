import ApiService from './ApiService';

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/login',
        method: 'post',
        data,
    });
}

export async function apiSignUp(data) {
    console.log("apiSignUp");
    return ApiService.fetchData({
        url: '/register',
        method: 'post',
        data,
    });
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/logout',
        method: 'post',
        data,
    });
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    });
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    });
}


export async function apiGetAllUsers () {
    return ApiService.fetchData({
        url: '/admins',
        method: 'get',
    });
}

export async function apiChangeRole(data){
    return ApiService.fetchData({
        url: '/updateAdminRole',
        method: 'put',
        data,
    });
}

export async function apiDeleteUser(data){
    return ApiService.fetchData({
        url: '/delete-user',
        method: 'delete',
        data,
    });
}
