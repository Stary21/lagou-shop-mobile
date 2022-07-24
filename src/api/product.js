import request from '@/utils/request'

export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})

export const getProductDetails = productId => request({
  method: 'GET',
  url: `/product/detail/${productId}`
})

export const getCommentCount = productId => request({
  method: 'GET',
  url: `/reply/config/${productId}`
})

export const getCommentByTag = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${productId}`,
  params
})
