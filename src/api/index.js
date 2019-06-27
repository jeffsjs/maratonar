import instance from './config';

const DATE_DEFAULT = '?mockDate=2019-03-01'

export const getSeries = () => {
	return instance.get('/series'+DATE_DEFAULT);
};


// export const postUser = params => {
// 	return instance.post('/users/create', params);
// };
// export const getUserId = params => {
// 	return instance.get(`/users/${params}`);
// };
// export const putUser = params => {
// 	return instance.put(`/users/${params._id}`, params);
// };
// export const deleteUser = params => {
// 	return instance.delete(`/users/${params._id}`);
// };
// export const deleteCampaing = params => {
// 	return instance.delete(`/campaign/${params._id}/${params.userId}`);
// };