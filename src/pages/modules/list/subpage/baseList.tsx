/**
 * -------------------------------------------------------
 * 基础列表
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Pagination,  message } from 'antd'
import useRequest from '../../../../hooks/useRequest'
import PageWrap from '../../../../components/PageWrap/pageWrap'

import './style.scss'

interface ListDataType {
  readonly id: string
  key: string | number
  cover: string     // 封面图
  bookName: string  // 书名
  summary: string   // 摘要
  author: string    // 作者
  date: string      // 出版日期
  creator: string   // 信息创建人
  status: '1' | '2' // 状态
}

// 列
const listColumns = [
  { title: '封面', dataIndex: 'cover', key: 'cover', render: (text: string) => (
      <div className="book-cover">
        <img src={text} alt="" />
      </div>
    ) },
  { title: '书名', dataIndex: 'bookName', key: 'bookName' },
  { title: '摘录', dataIndex: 'summary', key: 'summary', width: 300, render: (text: string) => (
      <div className="book-extract">{text}</div>
    ) },
  { title: '作者', dataIndex: 'author', key: 'author' },
  { title: '出版时间', dataIndex: 'date', key: 'date' },
  { title: '创建人', dataIndex: 'creator', key: 'creator' },
  { title: '状态', dataIndex: 'status', key: 'status', render: (text: string) => (
      <div>{text === '1' ? <Tag color='success'>正常</Tag> : <Tag>下架</Tag>}</div>
    ) },
]

const BaseList: React.FC = () => {
  const request = useRequest()
  const [ listData, setListData ] = useState<ListDataType[]>()
  const [ loading, setLoading ] = useState(true)
  const cancelListFunc = useRef<Function>()
  // 分页
  const [ currentPageNum, setCurrentPageNum ] = useState(1)
  const [ totalPageNum, setTotalPageNum ] = useState(0)

  // 获取列表数据
  const fetchListData = (page: number = 1, row: number = 8) => {
    setLoading(true)
    if (cancelListFunc.current) cancelListFunc.current()

    const { pro, cancelFunc } = request.get('/api/book/list', { page, row })
    cancelListFunc.current = cancelFunc

    // @ts-ignore
    pro.then(({ errorCode, message: msg, data }) => {
      if (errorCode === 0) {
        const info = data?.info
        if (Array.isArray(info)) {
          if (info.length > 0) {
            const _listData = info.map((item) => ({ ...item, key: item.id }))
            setListData(_listData)
          } else {
            setListData([])
          }
        }

        setTotalPageNum(data.page.total_count)
      } else if (errorCode !== -1) {
        message.error(msg)
      }

      setLoading(false)
    }).catch((err) => {
      if (err?.response?.status) {
        setLoading(false)
      }
    })
  }

  // 页码改变的回调
  const onPaginationChange = (page: number) => {
    fetchListData(page)
    setCurrentPageNum(page)
  }

  useEffect(() => {
    fetchListData()
  }, [])

  return (
    <PageWrap className="list-subpage" isHeightOpen={false}>

      <Table
        className="book-list"
        columns={listColumns}
        dataSource={listData}
        loading={loading}
        pagination={false}
      />

      {totalPageNum > 0 && (
        <Pagination
          defaultCurrent={1}
          current={currentPageNum}
          pageSize={8}
          total={totalPageNum}
          onChange={onPaginationChange}
        />
      )}

    </PageWrap>
  )
}

export default BaseList