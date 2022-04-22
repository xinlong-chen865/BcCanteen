import request from '@/utils/request'

export function RecommendList(data) {
    return request({
      url: '/canteen/recommend',
      method: 'post',
      data
    })
}
