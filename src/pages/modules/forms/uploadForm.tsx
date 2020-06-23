import React, { useState } from 'react'
import { Row, Col, Upload, Button, message } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface'
import useRequest from '../../../hooks/useRequest'
import PageWrap from '../../../components/PageWrap/pageWrap'

import './upload-form.scss'

const TEST_PATH = 'https://jsonplaceholder.typicode.com/posts/'

const UploadForm: React.FC = () => {
  const request = useRequest()
  const [ fileList, setFileList ] = useState<UploadFile[]>([])
  const [ uploading, setUploading ] = useState(false)

  // 自定义上传—上传前
  const beforeUpload = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return [ ...prevFileList, file ]
    })
    return false
  }

  // 自定义上传—点击删除文件时
  const onRemoveFile = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return prevFileList.filter(item => item !== file)
    })
  }

  // 自定义上传—上传操作
  const handleUpload = () => {
    if (fileList.length) {
      setUploading(true)
      let reqArr: any[] = []
      fileList.forEach(() => {
        // @ts-ignore
        const { pro } = request.upload(TEST_PATH, { file: fileList[0], type: 'img' })
        reqArr.push(pro)
      })

      Promise.all(reqArr).then((resArr) => {
        let isOk = true
        for (let i = 0; i < resArr.length; i++) {
          if (!resArr[i].id) {
            isOk = false
            break
          }
        }

        if (isOk) {
          setFileList([])
          message.success('上传成功')
        } else {
          message.error('上传失败，请重新上传')
        }

        setUploading(false)
      })
    } else {
      message.warning('请先选择图片')
    }
  }

  // 拖拽上传—上传进程改变时
  const onDragUploadChange = (info: UploadChangeParam) => {
    const { status } = info.file
    console.log('[Upload status]:', status)

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }

    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`)
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  }

  return (
    <PageWrap>
      <div className="page-container upload-form-page">

        <h1 className="page-title">上传文件</h1>

        <div className="main-form upload-form">
          <Row>
            <Col offset={8} span={8}>

              <div className="upload-form-group">

                <p style={{ fontSize: 18 }}><strong>1</strong>.手动上传</p>

                <Upload
                  className="upload"
                  fileList={fileList}
                  accept="image/*"
                  beforeUpload={beforeUpload}
                  onRemove={onRemoveFile}
                >
                  <Button icon={<UploadOutlined />}>选择图片</Button>
                </Upload>

                <Button
                  className="btn-upload"
                  type="primary"
                  loading={uploading}
                  onClick={handleUpload}
                >
                  开始上传
                </Button>

              </div>

              <div className="upload-form-group">

                <p style={{ fontSize: 18 }}><strong>2</strong>.拖拽上传</p>

                <Upload.Dragger
                  className="upload-dragger"
                  name="file"
                  multiple={true}
                  action={TEST_PATH}
                  onChange={onDragUploadChange}
                >
                  <InboxOutlined className="icon-dragger" />
                  <p className="text-guide">点击上传，或将文件拖拽至此</p>
                </Upload.Dragger>

              </div>

            </Col>
          </Row>
        </div>

      </div>
    </PageWrap>
  )
}

export default UploadForm