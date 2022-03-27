import request from '@/utils/request'

export function GoodsDesc(params) {
  return request({
    url: '/canteen/goodsDesc',
    method: 'get',
    params
  })
}

export function InsertOrder(params) {
  return request({
    url: '/canteen/insertOrder',
    method: 'get',
    params
  })
}

export function PayingItem(params) {
  return request({
    url: '/pay/paying',
    method: 'get',
    params
  })
}

export function IdToBusiness(params) {
  return request({
    url: '/canteen/idToBusiness',
    method: 'get',
    params
  })
}

export function GoodsLists(params) {
  return request({
    url: '/canteen/goodsLists',
    method: 'get',
    params
  })
}

export function PayingConfirm(params) {
  return request({
    url: '/pay/confirm',
    method: 'get',
    params
  })
}

export function InsertFootprint(data) {
  return request({
    url: '/business_admin/traffic-view/insert',
    method: 'post',
    data
  })
}