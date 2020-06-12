import React, { useState } from 'react'
import { Row, Col, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'
import useRequest from '../../../hooks/useRequest'
import PageWrap from '../../../components/PageWrap/pageWrap'

import './upload-form.scss'

const UploadForm: React.FC = () => {
  const request = useRequest()
  const [ fileList, setFileList ] = useState<UploadFile[]>([])
  const [ uploading, setUploading ] = useState(false)

  const beforeUpload = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return [ ...prevFileList, file ]
    })
    return false
  }

  const onRemoveFile = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return prevFileList.filter(item => item !== file)
    })
  }

  const handleUpload = () => {
    if (fileList.length) {
      setUploading(true)
      let reqArr: any[] = []
      fileList.forEach(() => {
        // @ts-ignore
        const { pro } = request.upload('https://jsonplaceholder.typicode.com/posts/', { file: fileList[0], type: 'img' })
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
          message.error('上传失败')
        }

        setUploading(false)
      })
    } else {
      message.warning('请先选择图片')
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

                <p style={{ fontSize: 18 }}><strong>2</strong>.拖拽上传 带进度条</p>
                <p>待开发…</p>

              </div>

            </Col>
          </Row>
        </div>

      </div>
    </PageWrap>
  )
}

export default UploadForm