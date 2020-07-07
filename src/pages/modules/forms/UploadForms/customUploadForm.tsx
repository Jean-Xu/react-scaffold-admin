/**
 * -------------------------------------------------------
 * 自定义单文件上传表单
 * @description 描述
 * -------------------------------------------------------
 */

import React, { useState } from 'react'
import { Button } from 'antd'
import MediaUpload from '../../../../components/MediaUpload/mediaUpload'
import { TEST_UPLOAD_URL } from '../../../../utils/constant'

const CustomUploadForm: React.FC = () => {
  const [ timeOfUploading, setTimeOfUploading ] = useState(0)
  const [ loading, setLoading ] = useState(false)

  const handleClick = () => {
    setTimeOfUploading(Date.now())
  }

  return (
    <div className="upload-form-group">

      <h3 className="title">单文件手动上传</h3>

      <MediaUpload
        action={TEST_UPLOAD_URL}
        timeOfUploading={timeOfUploading}
        onUploadStart={() => setLoading(true)}
        onUploadSuccess={() => setLoading(false)}
        onUploadError={() => setLoading(false)}
        onUploadCancel={() => setLoading(false)}
      />

      <Button
        className="btn-upload"
        type="primary"
        loading={loading}
        onClick={handleClick}
      >
        开始上传
      </Button>

    </div>
  )
}

export default CustomUploadForm