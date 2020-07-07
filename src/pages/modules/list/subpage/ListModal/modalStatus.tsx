/**
 * -------------------------------------------------------
 * 修改书籍状态-模态框
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react'
import { Modal, Radio, message } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import useRequest from '../../../../../hooks/useRequest'
import { ActionableListDataType, BookStatus } from '../../../../../types/list'

import './style.scss'

interface ModalStatusProps {
  visible: boolean
  pendingRowData: ActionableListDataType | null // 待操作的数据行
  onHide: () => void
  onChangeRowData: (rowData: ActionableListDataType) => void
}

const ModalStatus: React.FC<ModalStatusProps> = (props) => {
  const { visible, pendingRowData, onHide, onChangeRowData } = props
  const request = useRequest()

  const [ currentStatus, setCurrentStatus ] = useState<BookStatus>('1')
  const currentRowData = useRef<ActionableListDataType | null>(null)

  // 修改状态操作
  const onChangeStatus = (e: RadioChangeEvent) => {
    setCurrentStatus(e.target.value)
  }

  // 提交并更新状态
  const updateStatus = () => {
    let newData = (currentRowData.current as ActionableListDataType)
    newData.opts.btnDeleteDisabled = true
    newData.opts.btnStatusLoading = true
    onChangeRowData(newData)

    const { pro } = request.post('/api/book/update-status', {
      id: newData.id,
      status: currentStatus,
    })
    // @ts-ignore
    pro.then(({ errorCode, message: msg }) => {
      if (errorCode === 0) {
        newData.status = currentStatus
        message.success('修改成功')
      } else if (errorCode !== -1) {
        message.error(msg)
      }

      newData.opts.btnDeleteDisabled = false
      newData.opts.btnStatusLoading = false
      onChangeRowData(newData)
    }).catch(() => {
      newData.opts.btnDeleteDisabled = false
      newData.opts.btnStatusLoading = false
      onChangeRowData(newData)
    })

    onHide()
  }

  useEffect(() => {
    if (pendingRowData) {
      currentRowData.current = pendingRowData
      setCurrentStatus(pendingRowData.status)
    }
  }, [pendingRowData])

  return (
    <Modal
      title="修改书籍状态"
      visible={visible}
      onOk={updateStatus}
      onCancel={onHide}
    >
      {pendingRowData && (
        <Radio.Group onChange={onChangeStatus} value={currentStatus}>
          <Radio value="1">上架</Radio>
          <Radio value="2">下架</Radio>
        </Radio.Group>
      )}
    </Modal>
  )
}

export default ModalStatus