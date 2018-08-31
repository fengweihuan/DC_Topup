import request from '@/utils/request'

export function login(account_name, account_password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account_name,
      account_password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
