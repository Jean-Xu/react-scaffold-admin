/**
 * -------------------------------------------------------
 * 新增书籍-模态框
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState, useRef } from 'react'
import { Modal, Form, Input, DatePicker, message } from 'antd'
import moment from 'moment'
import useRequest from '../../../../../hooks/useRequest'
import { TEST_UPLOAD_URL } from '../../../../../utils/constant'
import MediaUpload from '../../../../../components/MediaUpload/mediaUpload'

import './style.scss'

interface ModelAddProps {
  visible: boolean
  onHide: () => void
  onRefreshList: () => void
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const ModalAdd: React.FC<ModelAddProps> = (props) => {
  const { visible, onHide, onRefreshList } = props
  const request = useRequest()
  const [ bookForm ] = Form.useForm()
  const cancelSubmitFunc = useRef<Function>()

  const [ summaryCount, setSummaryCount ] = useState(0) // 摘要字数
  const [ timeOfUploading, setTimeOfUploading ] = useState(0)
  const [ loading, setLoading ] = useState(false)
  const formData = useRef<{ [key: string]: any }>()

  const onSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummaryCount(e.target.value.length)
  }

  const onUploadStart = () => {
    setLoading(true)
  }

  const onUploadError = () => {
    setLoading(false)
  }

  // 提交新增书籍
  const submitAddBook = (filePath: string) => {
    const { pro, cancelFunc } = request.post('/api/book/add', { ...formData.current, cover: filePath })
    cancelSubmitFunc.current = cancelFunc

    // @ts-ignore
    pro.then(({ errorCode, message: msg }) => {
      if (errorCode === 0) {
        onRefreshList()
        message.success('新建成功')
      } else if (errorCode !== -1) {
        message.error(msg)
      }

      onHide()
      setLoading(false)
      bookForm.resetFields()
    }).catch(() => {
      setLoading(false)
    })
  }

  // 点击"完成"按钮时
  const onOk = () => {
    bookForm.validateFields().then((fieldsValue) => {
      setTimeOfUploading(Date.now())
      let { bookName, author, date, summary } = fieldsValue
      date = moment(date).format('YYYY-MM-DD')
      formData.current = { bookName, author, date, summary }
    }).catch(() => {})
  }

  // 点击"取消"按钮时
  const onCancel = () => {
    onHide()
    if (cancelSubmitFunc.current) {
      cancelSubmitFunc.current()
    }
  }

  return (
    <Modal
      title="新增书籍"
      visible={visible}
      okText="完成"
      cancelText="取消"
      confirmLoading={loading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        className="add-book-form"
        form={bookForm}
        {...layout}
      >

        <Form.Item
          name="bookName"
          label="书名"
          rules={[{ required: true, message: '书名必填' }]}
        >
          <Input allowClear autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="author"
          label="作者"
          rules={[{ required: true, message: '作者必填' }]}
        >
          <Input allowClear autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="date"
          label="出版日期"
          rules={[{ required: true, message: '出版日期必填' }]}
        >
          <DatePicker />
        </Form.Item>

        <div className="posr">
          <Form.Item
            name="summary"
            label="摘要"
            rules={[{ required: true, message: '摘要必填' }]}
          >
            <Input.TextArea allowClear maxLength={100} autoComplete="off" onChange={onSummaryChange} />
          </Form.Item>
          <div className="textarea-num">{summaryCount}/100</div>
        </div>

        <Form.Item
          label="封面"
          style={{ marginBottom: 0 }}
        >
          <MediaUpload
            action={TEST_UPLOAD_URL}
            timeOfUploading={timeOfUploading}
            onUploadStart={onUploadStart}
            onUploadSuccess={(filePath) => submitAddBook(filePath)}
            onUploadError={onUploadError}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}

export default ModalAdd