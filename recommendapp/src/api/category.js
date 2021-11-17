import request from '@/utils/request'

export function FloorBusinessLists(params) {
  return request({
    url: '/canteen/floorBusinessLists',
    method: 'get',
    params
  })
}

export function FloorLists() {
    return request({
      url: '/canteen/floorLists',
      method: 'get',
    })
  }