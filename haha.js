let haha = "https://shop.fed.lagou.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg"
const reg = /lagounews/

console.log(haha)
if (!/lagounews/.test(haha)) {
  haha = haha.replace('lagou', 'lagounews')
}
console.log(haha)