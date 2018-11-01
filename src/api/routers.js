import axios from '@/libs/api.request'

export const getRouterReq = (access) => {
  return axios.request({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}

export const getMenu = (params) => {
  return axios.request({
    url: '/sys/menu/user',
    params: {
      params
    },
    method: 'post'
  })
}
