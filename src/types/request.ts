import { UploadFile } from 'antd/lib/upload/interface'

// 请求返回数据
export interface ResType {
  errorCode: number
  message: string
  data: any
}

// 上传文件的data
export interface UploadDataType {
  file: File
  [key: string]: any
}

// 上传进度回调函数
export type OnProgressFnType = (percentage: number, file: File) => void