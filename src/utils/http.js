import axios from 'axios'

/**
 * 请求成功处理
 * @param res 响应体
 * @param successCallback 成功回调函数
 * @param errorCallback 错误回调函数
 */
function success (res, successCallback, errorCallback) {
    if (res.data.code === 0) {
      successCallback(res.data)
    } else {
      let msg
      if (res.data.msg) {
        msg = res.data.msg
      } else {
        msg = '请求数据失败，请重试！'
      }
      errorCallback(msg, res)
    }
  }
  /**
   * 请求失败处理
   * @param err 错误消息
   * @param successCallback 成功回调函数
   * @param errorCallback 错误回调函数
   */
  function error (err, successCallback, errorCallback) {
    if (err.response) {
        errorCallback('请求数据失败， 错误码：' + err.response.status)
    } else {
      if (startWith(err.message, 'timeout')) {
        errorCallback('请求服务器超时！')
      } else {
        errorCallback(err.message)
      }
    }
  }
  
  /**
   * POST 请求
   * @param url 地址
   * @param param 参数
   * @param successCallback 成功回调函数
   * @param errorCallback 失败回调函数
   */
  export function post (url, param, successCallback, errorCallback, config) {
    let confHeader = config ? config : {}
    axios.post(url, param, confHeader).then(function (res) {
      success(res, successCallback, errorCallback)
    }).catch(function (err) {
      error(err, successCallback, errorCallback)
    })
  }
  
  /**
   * GET 请求
   * @param url 地址
   * @param param 参数
   * @param successCallback 成功回调函数
   * @param errorCallback 失败回调函数
   */
  export function get (url, param, successCallback, errorCallback, config) {
    let confHeader = config ? config : {}
    confHeader.params = param
    axios.get(url, confHeader).then(function (res) {
      success(res, successCallback, errorCallback)
    }).catch(function (err) {
      error(err, successCallback, errorCallback)
    })
  }