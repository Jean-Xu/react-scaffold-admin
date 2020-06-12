/**
 * -------------------------------------------------------
 * 基础表单
 * @description 使用ant-design的<Form />
 * 校验规则使用async-validator：
 * https://github.com/yiminghe/async-validator
 * -------------------------------------------------------
 */

import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, DatePicker, Radio, Checkbox, Select, Switch, message } from 'antd'
import moment from 'moment'
import useRequest from '../../../hooks/useRequest'
import PageWrap from '../../../components/PageWrap/pageWrap'

import './base-form.scss'

const { TextArea } = Input
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { sm: { span: 4 }, lg: { span: 6 }, xl: { span: 7 }, xxl: { span: 8 } },
  wrapperCol: { sm: { span: 16 }, lg: { span: 12 }, xl: { span: 10 }, xxl: { span: 8 } },
}

const formTailLayout = {
  wrapperCol: {
    sm: { offset: 4, span: 16 },
    lg: { offset: 6, span: 12 },
    xl: { offset: 7, span: 10 },
    xxl: { offset: 8, span: 8 }
  }
}

const BaseForm: React.FC = () => {
  const [ baseForm ] = Form.useForm()
  const request = useRequest()
  const [ loading, setLoading ] = useState(false)

  // 验证成功时
  const onFinish = (values: any) => {
    setLoading(true)
    const { title, dateRange, gender, project, number, mediaType, receiveMsg, desc } = values
    const timeBegin = moment(dateRange[0]).format('YYYY-MM-DD')
    const timeEnd = moment(dateRange[1]).format('YYYY-MM-DD')
    const projects = project ? project.join(',') : ''

    const { pro } = request.post(
      '/api/form/submit',
      { title, timeBegin, timeEnd, gender, projects, number, mediaType, receiveMsg, desc }
    )
    // @ts-ignore
    pro.then(({ errorCode, message: msg }) => {
      if (errorCode === 0) {
        message.success('提交成功')
        onReset()
      } else if (errorCode !== -1) {
        message.success(msg)
      }

      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  // 验证失败时
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 重置
  const onReset = () => {
    baseForm.resetFields()
  }

  return (
    <PageWrap>
      <div className="page-container base-form-page">

        <h1 className="page-title">基础表单</h1>
        <p className="page-desc">带内置验证功能的简单表单</p>

        <Form
          {...formItemLayout}
          className="main-form base-form"
          form={baseForm}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            label="标题"
            name='title'
            rules={[{ required: true, message: '请输入标题!' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="日期范围"
            name='dateRange'
            rules={[{ required: true, message: '请输入日期范围!' }]}
          >
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item name="gender" label="性别">
            <Radio.Group>
              <Radio value="a">男</Radio>
              <Radio value="b">女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="project" label="多选">
            <Checkbox.Group>
              <Checkbox value="a">项目A</Checkbox>
              <Checkbox value="b">项目B</Checkbox>
              <Checkbox value="c">项目C</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="number" label="数量">
            <InputNumber min={0} />
          </Form.Item>

          {/* Form中组件属性defaultValue不能使用 */}
          <Form.Item name="mediaType" label="类型" initialValue="video">
            <Select>
              <Select.Option value="video">视频</Select.Option>
              <Select.Option value="img">图片</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="详细描述"
            name='desc'
          >
            <TextArea rows={4} autoComplete="off" style={{ resize: 'none' }} />
          </Form.Item>

          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>

        </Form>

      </div>
    </PageWrap>
  )
}

export default BaseForm