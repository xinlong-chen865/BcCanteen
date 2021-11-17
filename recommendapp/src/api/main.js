import request from '@/utils/request'

export function NewBusinessList() {
  return request({
    url: '/canteen/newBusinessList',
    method: 'get',
  })
}

export function HotBusinessList() {
    return request({
      url: '/canteen/hotBusinessList',
      method: 'get',
    })
  }