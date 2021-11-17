import request from '@/utils/request'

export function CategoryBusinessList(params) {
  return request({
    url: '/canteen/categoryBusinessList',
    method: 'get',
    params
  })
}