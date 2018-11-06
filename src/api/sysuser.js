import axios from '@/libs/api.request'

export const addUser = (userInfo) => {
  return axios.request({
    url: '/sys/user/save',
     data: userInfo,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    // url: 'save_error_logger',
    // data: info,
    // method: 'post'
  })
}
