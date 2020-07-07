/**
 * -------------------------------------------------------
 * 判断是否为json
 * @description 描述
 * -------------------------------------------------------
 */

module.exports = function (str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch(e) {}

  return false
}
