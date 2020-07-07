/**
 * -------------------------------------------------------
 * Antd 多文件拖拽上传
 * @description 描述
 * -------------------------------------------------------
 */

import React, {  } from 'react'
import { message, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/es/upload/interface'
import { TEST_UPLOAD_URL } from '../../../../utils/constant'

const DraggerUploadForm: React.FC = () => {
  // 上传进程改变时
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
    <div className="upload-form-group">

      <p style={{ fontSize: 18 }}>多文件拖拽上传</p>

      <Upload.Dragger
        className="upload-dragger"
        name="file"
        multiple={true}
        action={TEST_UPLOAD_URL}
        onChange={onDragUploadChange}
      >
        <InboxOutlined className="icon-dragger" />
        <p className="text-guide">点击上传，或将文件拖拽至此</p>
      </Upload.Dragger>

    </div>
  )
}

export default DraggerUploadForm