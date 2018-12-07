import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'bg/get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'bg/get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'bg/error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'bg/save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'bg/image/upload',
    data: formData
  })
}

export const getUserInfoData = openid => {
  return axios.request({
    url: 'wx_mine',
    data: openid,
    method: 'post'
  })
}

export const getUserOpenidList = () => {
  return axios.request({
    url: 'wx_mine/openid_list',
    method: 'get'
  })
}
