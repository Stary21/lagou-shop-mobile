import request from '@/utils/request'

export const getDefaultData = () => request({
  method: 'GET',
  url: '/v2/diy/get_diy/moren'
})


export const getLogo = () => request({
  method: 'GET',
  url: '/wechat/get_logo'
})