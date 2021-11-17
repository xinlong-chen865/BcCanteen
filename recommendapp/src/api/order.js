import request from '@/utils/request'

export function getOrder(params) {
  return request({
    url: '/canteen/getOrder',
    method: 'get',
    params
  })
}