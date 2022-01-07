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

export function JoinBusiness(data) {
  return request({
    url: '/canteen/join',
    method: 'post',
    data
  })
}

export function ConfirmJoinBusiness(data) {
  return request({
    url: '/canteen/join/confirm',
    method: 'post',
    data
  })
}