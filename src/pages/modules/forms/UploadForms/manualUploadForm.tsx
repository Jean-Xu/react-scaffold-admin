/**
 * -------------------------------------------------------
 * Antd 手动上传
 * @description 描述
 * -------------------------------------------------------
 */

import React, {useState} from 'react'
import { Button, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/es/upload/interface'
import useRequest from '../../../../hooks/useRequest'
import { TEST_UPLOAD_URL } from '../../../../utils/constant'

const ManualUploadForm: React.FC = () => {
  const request = useRequest()
  const [ fileList, setFileList ] = useState<UploadFile[]>([])
  const [ uploading, setUploading ] = useState(false)

  // 上传前
  const beforeUpload = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return [ ...prevFileList, file ]
    })
    return false
  }

  // 点击删除文件时
  const onRemoveFile = (file: UploadFile) => {
    setFileList((prevFileList) => {
      return prevFileList.filter(item => item !== file)
    })
  }

  // 上传操作
  const handleUpload = () => {
    if (fileList.length) {
      setUploading(true)
      let reqArr: any[] = []
      fileList.forEach(() => {
        // @ts-ignore
        const { pro } = request.upload(TEST_UPLOAD_URL, { file: fileList[0], type: 'img' })
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

  return (
    <div className="upload-form-group">

      <h3 className="title">Antd 手动上传</h3>

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
  )
}

export default ManualUploadForm