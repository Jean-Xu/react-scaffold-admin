/**
 * -------------------------------------------------------
 * 延迟返回结果
 * @description 描述
 * -------------------------------------------------------
 */

module.exports = function (res, delay = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res)
    }, delay)
  })
}
