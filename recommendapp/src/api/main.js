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

export function GetChooseUserProfile(data) {
  return request({
    url: '/canteen/newUserEnter',
    method: 'post',
    data,
  })
}

export function UpdateChooseUserProfile(data) {
  return request({
    url: '/canteen/newUserEnter/update',
    method: 'post',
    data,
  })
}

export function RecommendUserProfile(data) {
  return request({
    url: '/canteen/userProfile/recommend',
    method: 'post',
    data,
  })
}