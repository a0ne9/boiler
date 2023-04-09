import axios, {AxiosRequestConfig} from "axios";
import {ApiParams, FailedResult, SuccessResult} from "@/const/http";

export async function sendRequest<Result, Error>(
    options: ApiParams & AxiosRequestConfig = {},
): Promise<SuccessResult<Result> | FailedResult<Error>> {

    const axiosInstance = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const response = await axiosInstance.request({
            url: options.url,
            method: options.method,
            data: options.data,
        });
        return response.data;
    } catch (err: any) {
        const originalRequest = err.config;
        if (err.response.status === 401 && err.config && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                await axios.request({ url: originalRequest.url });
                const response = await axiosInstance.request(originalRequest);
                return response.data.success;
            } catch (e: any) {
                throw e?.response?.data?.errors;
            }

        }
        throw err?.response?.data?.errors;
    }
}
