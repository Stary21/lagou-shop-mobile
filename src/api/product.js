import request from '@/utils/request'

export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})