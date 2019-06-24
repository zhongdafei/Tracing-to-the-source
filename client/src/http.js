import axios from "axios";
import router from "./router"
import qs from "querystring";
import { Message, Loading } from "element-ui";
let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中....',
        background: 'rgba(0,0,0,.7)'
    });
}

function endLoading() {
    loading.close();
}
// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    if (config.method != "get") {
        config.data = qs.stringify(config.data);
    }
    config.baseURL = "http://119.23.243.252:8080";
    if (localStorage.eleToken) {
        // 设置统一的请求头header
        config.headers.Authorization = localStorage.eleToken;
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, error => {
    return Promise.reject(error);
})
// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
}, error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);

    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
        Message.error('token是想，请重新登入');
        // 清除token
        localStorage.removeItem('eleToken');
        // 跳转到登入页面
        router.push("/login");
    }
    return Promise.reject(error);
})

export default axios;