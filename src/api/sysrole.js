import axios from '@/libs/api.request'

export const getRoleList = (page) => {
  return axios.request({
    url: '/sys/role/list',
     data: page,
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
