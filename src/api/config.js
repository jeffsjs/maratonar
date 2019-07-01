import axios from 'axios';
import config from '../config';

const instance = axios.create({
	baseURL: config.baseURL,
	timeout: 60000,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});

const instanceOMBD = axios.create({
	baseURL: config.baseURLOMBD,
	timeout: 60000,
	headers: {}
});

instanceOMBD.interceptors.request.use(configs => ({
	...configs,
	params: {
		apikey: config.keyOMBD,
		...configs.params
	}
}));

instance.interceptors.request.use(configs => ({
	...configs,
	params: {
		mockDate: '2019-03-01',
		...configs.params
	}
}));

export default { instance, instanceOMBD };
