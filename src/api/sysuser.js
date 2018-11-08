import axios from '@/libs/api.request'

export const addUser = (userInfo) => {
  return axios.request({
    url: '/sys/user/save',
    data: userInfo,
    method: 'post'
  })
}

export const getUserInfo = (userId) => {
  return axios.request({
    url: `/sys/user/info/${userId}`,
    method: 'get'
  })
}

export const updateUser = (userInfo) => {
  return axios.request({
    url: '/sys/user/update',
    data: userInfo,
    method: 'post'
  })
}

export const remove = (userId) => {
  return axios.request({
    url: `/sys/user/remove/${userId}`,
    method: 'get'
  })
}
