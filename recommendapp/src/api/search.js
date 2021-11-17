import request from '@/utils/request'

export function SearchLists(params) {
  return request({
    url: '/canteen/searchBusiness',
    method: 'get',
    params
  })
}