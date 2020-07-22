import Vue from 'vue';
import axios from 'axios';

/**
 * [config description]
 * @type {Object}
 */
const config = {
  baseURL: 'https://www.xinyingtong.cn/api/',
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "application/json"
  }
};


//dev与prod环境baseURL配置
if (process.env.NODE_ENV === 'development') {
  //开发环境
  config.baseURL = '/api';
} else if (process.env.NODE_ENV === 'production') {
  //生产环境 //test
  config.baseURL = 'https://www.xinyingtong.cn/api/'; // 'http://192.168.2.103:3000/';
}

const CancelToken = axios.CancelToken;
// let source = CancelToken.source();


const instance = axios.create(config);

/**
 * [description]请求拦截器
 * @param  {[type]} config){                 return   config;    }    [description]
 * @param  {[type]} function(error){                                                      return Promise.reject(error); } [description]
 * @return {[type]}                       [description]
 */
let interceptors = instance.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (config.isLoading) {
    console.log('loading')
    GlobalVue.$toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
      loadingType: 'spinner'
    });
  }
  let token = localStorage.getItem("userInfo");
  if (!config.headers.hasOwnProperty('Authorization') && token) {
    config.headers.Authorization = token;
  } else {
    config.headers.Authorization = '';
  }

  // config.cancelToken = source.token;
  config.cancelToken = new CancelToken(cancel => {
    //传入当前所有请求状态，由切换路由时处理
    if (window.GlobalVue) {
      window.GlobalVue.$store.commit("setCancelToken", cancel);
    }
  });

  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


/**
 * [description]响应拦截器
 * @param  {[type]} res)          {          return    res;}                 [description]
 * @param  {[type]} function(err) {          return    Promise.reject(err);} [description]
 * @return {[type]}               [description]
 */
instance.interceptors.response.use(function(res) {
  // 对响应数据做点什么
  if (res.config.isLoading) {
    GlobalVue.$toast.clear();
  }
  return res;
}, function(error) {
  if (typeof error == "string") {
    error = {
      message: error
    }
  }
  if (error && error.config && error.config.isLoading) {
    GlobalVue.$toast.clear();
  }

  // 对响应错误做点什么
  switch (error && error.response && error.response.status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = '未找到访问地址'
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
  }
  return Promise.reject(error);
});

/**
 * 
 */
export default {

  cmpName: 'axios',

  axios: function(options) {

    // options = Object.assign({}, config, options);
    return instance(options);
  },

  //无需返回promise对象时使用
  axiosBackCall: function(options) {
    let me = this;
    // options = Object.assign({}, config, options);

    return instance(options).then((res) => {
      if (typeof options.onSuccess == "function") {
        options.onSuccess.call(null, res);
      }
    }).catch((err) => {

      if (typeof options.onError == "function") {
        options.onError.call(null, err);
      }
      me.handlerError(err);

    }).finally(function() {

      if (typeof options.onCallBack == "function") {
        options.onCallBack.call(null, null);
      }
    });
  },

  handlerError(err) {
    let codeState = err.response.data.code;
    if (codeState == 401) {
      //清空本地缓存并返回登录页
      localStorage.removeItem("userInfo");
      location.hash = "/";
    }
  },

  setInterceptors() {

  },
  /**
   * [cancelInterceptors description]移除拦截器
   * @return {[type]} [description]
   */
  cancelInterceptors() {

    instance.interceptors.request.eject(interceptors);
  }
};
