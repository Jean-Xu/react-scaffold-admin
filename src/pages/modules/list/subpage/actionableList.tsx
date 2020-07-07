/**
 * -------------------------------------------------------
 * 可操作性的列表
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from 'react'
import { Button, Table, Pagination, Tag, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import useRequest from '../../../../hooks/useRequest'
import PageWrap from '../../../../components/PageWrap/pageWrap'
import ModalAdd from './ListModal/modalAdd'
import ModalStatus from './ListModal/modalStatus'
import { ActionableListDataType, BaseListDataType } from '../../../../types/list'

import './style.scss'

const { Column } = Table

const ActionableList: React.FC = () => {
  const request = useRequest()
  const [ listData, setListData ] = useState<ActionableListDataType[]>()
  const [ loading, setLoading ] = useState(true)
  const cancelListFunc = useRef<Function>()
  // 分页
  const [ currentPageNum, setCurrentPageNum ] = useState(1)
  const [ totalPageNum, setTotalPageNum ] = useState(0)
  // 模态框相关
  const [ modalStatusVisible, setModalStatusVisible ] = useState(false)
  const [ modalAddVisible, setModalAddVisible ] = useState(false)
  const [ pendingRowData, setPendingRowData ] = useState<ActionableListDataType | null>(null)

  // 获取列表数据
  const fetchListData = (page: number = 1) => {
    setLoading(true)
    if (cancelListFunc.current) cancelListFunc.current()

    const { pro, cancelFunc } = request.get('/api/book/list', { page, row: 8 })
    cancelListFunc.current = cancelFunc

    // @ts-ignore
    pro.then(({ errorCode, message: msg, data }) => {
      if (errorCode === 0) {
        const info = data?.info
        if (Array.isArray(info)) {
          if (info.length > 0) {
            const _listData = info.map((item) => ({
              ...item,
              key: item.id,
              opts: {
                btnStatusLoading: false,
                btnStatusDisabled: false,
                btnDeleteLoading: false,
                btnDeleteDisabled: false,
              },
            }))
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

  // 显示修改状态模态框
  const showModalStatus = (rowData: ActionableListDataType) => {
    setPendingRowData(rowData)
    setModalStatusVisible(true)
  }

  // 修改列表行数据
  const onChangeRowData = (rowData: ActionableListDataType) => {
    setListData((prevListData) => {
      return prevListData?.map((item) => {
        if (item.id === rowData.id) {
          return rowData
        } else {
          return item
        }
      })
    })
  }

  // 显示删除行确认框
  const showModalConfirm = (id: string) => {
    Modal.confirm({
      title: '删除书籍',
      content: '确定删除此书籍？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        onDelete(id)
      }
    })
  }

  // 删除行操作
  const onDelete = (id: string) => {
    let newListData = _.cloneDeep(listData) || []
    const index = _.findIndex(newListData, { id })
    if (newListData[index].opts.btnDeleteDisabled) return

    newListData[index].opts.btnDeleteLoading = true
    newListData[index].opts.btnStatusDisabled = true
    setListData(newListData)

    const { pro } = request.post('/api/book/delete', { id })
    // @ts-ignore
    pro.then(({ errorCode, message: msg }) => {
      if (errorCode === 0) {
        fetchListData(currentPageNum)
        message.success('删除成功')
      } else if (errorCode !== -1) {
        message.error(msg)
      }

      newListData[index].opts.btnDeleteLoading = false
      newListData[index].opts.btnStatusDisabled = false
      setListData(newListData)
    }).catch(() => {
      newListData[index].opts.btnDeleteLoading = false
      newListData[index].opts.btnStatusDisabled = false
      setListData(newListData)
    })
  }

  // 新建成功
  const onCreateSuccess = () => {
    fetchListData()
  }

  useEffect(() => {
    fetchListData()
  }, [])

  return (
    <PageWrap className="list-subpage" isHeightOpen={false}>

      <div className="action-top clearfix">

        <Button
          className="fl"
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={() => setModalAddVisible(true)}
        >
          新建
        </Button>

        <Button
          className="fr"
          size="middle"
        >
          导出Excel
        </Button>

      </div>

      <Table
        className="book-list"
        dataSource={listData}
        loading={loading}
        pagination={false}
      >

        <Column title="封面" dataIndex="cover" key="cover" render={(text) => (
          <div className="book-cover">
            <img src={text} alt="" />
          </div>
        )} />

        <Column title="书名" dataIndex="bookName" key="bookName" />

        <Column title="摘录" dataIndex="summary" key="summary" width={300} render={(text) => (
          <div className="book-extract">{text}</div>
        )} />

        <Column title="作者" dataIndex="author" key="author" />

        <Column title="出版时间" dataIndex="date" key="date" />

        <Column title="创建人" dataIndex="creator" key="creator" />

        <Column title="状态" dataIndex="status" key="status" render={(text) => (
          <>{text === '1' ? <Tag color='success'>正常</Tag> : <Tag>下架</Tag>}</>
        )} />

        <Column title="操作" dataIndex="opts" key="opts" width={170} render={(opts: any, rowData: ActionableListDataType) => {
          const { btnStatusLoading, btnDeleteLoading } = opts
          return (
            <>
              <Button
                className="opt-btn"
                type="link"
                size="middle"
                loading={btnStatusLoading}
                onClick={() => showModalStatus(rowData)}
              >
                修改状态
              </Button>
              <Button
                className="opt-btn"
                type="link"
                size="middle"
                loading={btnDeleteLoading}
                onClick={() => showModalConfirm(rowData.id)}
              >
                删除
              </Button>
            </>
          )
        }} />

      </Table>

      {totalPageNum > 0 && (
        <Pagination
          defaultCurrent={1}
          current={currentPageNum}
          pageSize={8}
          total={totalPageNum}
          onChange={onPaginationChange}
        />
      )}

      <ModalAdd
        visible={modalAddVisible}
        onHide={() => setModalAddVisible(false)}
        onRefreshList={fetchListData}
      />

      <ModalStatus
        visible={modalStatusVisible}
        pendingRowData={pendingRowData}
        onHide={() => setModalStatusVisible(false)}
        onChangeRowData={onChangeRowData}
      />

    </PageWrap>
  )
}

export default ActionableList