import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function selectUser(pageInfo) {
  return request({
    url: '/user?page='+pageInfo.page+'&size='+pageInfo.size,
    method: 'GET'
  })
}

