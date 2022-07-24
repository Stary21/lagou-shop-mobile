const resetUrl = function (url) {
  let item = url
  if (!/lagounews/.test(item)) {
    item = item.replace('lagou', 'lagounews')
  }
  return item

}



export default resetUrl