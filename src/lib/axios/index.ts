import { axiosInstance } from './config';
import { setupInterceptors } from './interceptors';

setupInterceptors(axiosInstance);

export { axiosInstance };
export { createAxiosInstance } from './config';
export { setupInterceptors } from './interceptors';
