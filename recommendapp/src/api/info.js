import request from '@/utils/request'

export function GetInfo(params) {
  return request({
    url: '/canteen/info',
    method: 'get',
    params
  })
}

export function UpdateInfo(data) {
    return request({
      url: '/canteen/info/update',
      method: 'post',
      data
    })
  }