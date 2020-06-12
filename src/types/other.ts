// 松散的对象
export interface LooseObjType {
  [key: string]: any
}

// http
export type HttpStatusType =
  '200' | '201' | '202' |
  '400' | '401' | '403' | '404' |
  '500' | '501' | '502' | '503' | '504'
