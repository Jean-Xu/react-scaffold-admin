/**
 * -------------------------------------------------------
 * 列表页相关类型
 * @description 描述
 * -------------------------------------------------------
 */

// 状态
export type BookStatus = '1' | '2'

// 基础列表
export interface BaseListDataType {
  readonly id: string
  key: string | number
  cover: string     // 封面图
  bookName: string  // 书名
  summary: string   // 摘要
  author: string    // 作者
  date: string      // 出版日期
  creator: string   // 信息创建人
  status: BookStatus // 状态
}

// 可操作性的列表
export interface ActionableListDataType extends BaseListDataType {
  // 操作按钮的状态
  opts: {
    btnStatusLoading: boolean
    btnStatusDisabled: boolean
    btnDeleteLoading: boolean
    btnDeleteDisabled: boolean
  }
}