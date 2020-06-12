/**
 * -------------------------------------------------------
 * 简单对象和base6互转
 * @description 只能转换基础数据类型 数组要转字符串arr.join(',')
 * -------------------------------------------------------
 */

import { Base64 } from 'js-base64'
import _ from 'lodash'
import { LooseObjType } from '../types/other'

// 编码-将对象转为base64字符串
export function encodeObj(obj: LooseObjType): string {
  let newObj: LooseObjType = {}
  let vTypes: string[] = []

  _.forEach(obj, (v, k) => {
    newObj[Base64.encode(k)] = Base64.encode(v)
    vTypes.push(typeof v)
  })
  newObj[Base64.encode('vTypes')] = Base64.encode(vTypes.join(','))

  return Base64.encode(JSON.stringify(newObj))
}

// 解码-将特定的base64字符串转为对象
export function decodeObj(str: string): LooseObjType {
  const base64Obj: LooseObjType = JSON.parse(Base64.decode(str))
  let result: LooseObjType = {}
  let vtObj: LooseObjType = {}

  _.forEach(base64Obj, (v, k) => {
    result[Base64.decode(k)] = Base64.decode(v)
  })

  const vtArr = [...result['vTypes'].split(',')]
  result = _.omit(result, ['vTypes'])
  vtObj = _.zipObject(Object.keys(result), vtArr) // 例子：['a', 'b'], [1, 2] => {a: 1, b: 2}

  _.forEach(result, (v, k) => {
    switch (vtObj[k]) {
      case 'number':
        result[k] = v - 0
        break
      case 'object':
        if (result[k] === 'null') result[k] = null
        break
      case 'boolean':
        result[k] = result[k] === 'true'
        break
    }
  })

  return result
}