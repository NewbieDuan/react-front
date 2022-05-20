
import axios, { AxiosRequestConfig } from "axios"
import apiList from "./apiList";

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 30 * 1000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    }
    return Promise.reject(response)
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const Http = {
    get(url: string, params?: Record<string, any>) {
        url = apiList[url]
        return this.ajax({
            method: 'get',
            url,
            params: params
        })
    },
    post(url: string, params?: Record<string, any>) {
        url = apiList[url]
        return this.ajax({
            method: 'post',
            url,
            data: params
        })
    },
    ajax(params: AxiosRequestConfig) {
        return axios(params).then((res): any => {
            return res.data
        })
    },
    download(params: Record<string, any>) {
        return axios.post(apiList['download'], params, { responseType: 'blob' }).then(res => {
            // new Blob([data])用来创建URL的file对象或者blob对象
            let url = window.URL.createObjectURL(new Blob([res.data]));
            let disposition = res.headers['content-disposition']
            // 生成一个a标签
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            // 生成时间戳
            let match = res.headers['content-disposition'].match(/filename="(.+\..+)"/)
            link.download = match ? match[1] : '123';
            document.body.appendChild(link);
            link.click();
        })
    }
}
export default Http;