/**
 * -------------------------------------------------------
 * 基础列表
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Pagination, Form, Input, DatePicker, Button, message } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import useRequest from '../../../../hooks/useRequest'
import PageWrap from '../../../../components/PageWrap/pageWrap'
import { BaseListDataType } from '../../../../types/list'

import './style.scss'

interface QueryValuesType {
  bookName?: string
  date?: string
}

// 表格列
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
      <>{text === '1' ? <Tag color='success'>正常</Tag> : <Tag>下架</Tag>}</>
    ) },
]

const BaseList: React.FC = () => {
  const request = useRequest()
  const [ listData, setListData ] = useState<BaseListDataType[]>()
  const [ loading, setLoading ] = useState(true)
  const cancelListFunc = useRef<Function>()
  // 分页
  const [ currentPageNum, setCurrentPageNum ] = useState(1)
  const [ totalPageNum, setTotalPageNum ] = useState(0)

  const [ queryForm ] = Form.useForm()

  // 获取列表数据
  const fetchListData = (page: number = 1, queryValues?: QueryValuesType) => {
    setLoading(true)
    if (cancelListFunc.current) cancelListFunc.current()

    let params: any = { page, row: 8 }
    if (queryValues && _.size(queryValues)) params.queryValues = queryValues

    const { pro, cancelFunc } = request.get('/api/book/list', params)
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

  // 列表查询
  const onQueryFinish = (values: any) => {
    let { bookName, date } = values
    let queryValues: QueryValuesType = {}

    if (bookName) queryValues.bookName = bookName
    if (date) queryValues.date = moment(date).format('YYYY-MM-DD')

    fetchListData(1, queryValues)
  }

  const onQueryReset = () => {
    fetchListData()
    setCurrentPageNum(1)
    queryForm.resetFields()
  }

  useEffect(() => {
    fetchListData()
  }, [])

  return (
    <PageWrap className="list-subpage" isHeightOpen={false}>

      <Form className="query-form" form={queryForm} layout="inline" onFinish={onQueryFinish}>
        <Form.Item name="bookName">
          <Input placeholder="输入书名" size="middle" autoComplete="off" />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker placeholder="选择出版日期" size="middle" />
        </Form.Item>
        <Form.Item>
          <Button size="middle" htmlType="button" onClick={onQueryReset}>
            重置
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="middle" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>

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