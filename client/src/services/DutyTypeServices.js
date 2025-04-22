import ApiService from './ApiService';

export async function apiCreateNewDutyType(data) {
  try {
    const response = await ApiService.fetchData({
      url: '/createDutyType',
      method: 'post',
      data,
    });
    return response.data;
  }
  catch (error) {
    console.error('Error creating duty type:', error);
    throw error;
  }
}

export async function apiGetDutyTypes() {
  try {
    const response = await ApiService.fetchData({
      url: '/getDutyTypes',
      method: 'get',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching duty types:', error);
    throw error;
  }
}
export async function apiDeleteDutyType(data) {
  try {
    const response = await ApiService.fetchData({
      url: '/deleteDutyType',
      method: 'delete',
      data,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting duty type:', error);
    throw error;
  }
}


export async function apiUpdateDutyTypeStatus(data) {
  try {
    const response = await ApiService.fetchData({
      url: '/updateDutyTypeStatus',
      method: 'put',
      data,
    });
    return response.data;
  } catch(error) {
    console.error('Error updating duty type status:', error);
    throw error;
  }
}