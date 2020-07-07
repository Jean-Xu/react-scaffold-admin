/**
 * -------------------------------------------------------
 * 自定义上传组件
 * @description 可根据项目需求进行定制修改，目前只实现单文件上传
 * -------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getImgUrl, getVideoUrl } from '../../utils/parseMediaFileUrl'
import useRequest from '../../hooks/useRequest'
import MediaFileList from './mediaFileList'

import './style.scss'

export type MediaFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface MediaFileType {
  uid: string              // id
  name: string             // 文件名
  type: 'img' | 'video'    // 文件类型
  previewUrl: string       // 可预览的url
  raw: File                // 源文件
  percent?: number         // 上传进度
  status?: MediaFileStatus // 状态
}

interface MediaUploadProps {
  action: string                               // 上传地址（如果地址不变 可设一个默认值）
  timeOfUploading: number                      // 时间戳 >0时表示可以开始上传
  limit?: 'img' | 'video' | 'all'              // 文件限制
  onFileSituation?: (n: number) => void        // 监听文件选择的情况
  onUploadStart?: () => void                   // 开始上传回调函数
  onUploadSuccess?: (filePath: string) => void // 上传成功
  onUploadError?: () => void                   // 上传失败
  onUploadCancel?: () => void                  // 取消上传
}

const MediaUpload: React.FC<MediaUploadProps> = (props) => {
  const {
    action,
    timeOfUploading,
    limit,
    onFileSituation,
    onUploadStart,
    onUploadSuccess,
    onUploadError,
    onUploadCancel,
  } = props

  const request = useRequest()
  const [ fileList, setFileList ] = useState<MediaFileType[]>([])
  // const [ videoTagStyle, setVideoTagStyle ] = useState<React.CSSProperties>({})
  const fileInput = useRef<HTMLInputElement>(null)
  const cancelUploadFunc = useRef<Function>()

  const accept = () => {
    switch (limit) {
      case 'img':
        return 'image/*'
      case 'video':
        return 'video/mp4'
      case 'all':
        return 'image/*,video/mp4'
    }
  }

  const uploadHandleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files[0]) return
    const file = files[0]

    // 文件类型验证
    switch (limit) {
      case 'img':
        if (file.type.indexOf('image') === -1) {
          message.error('只能选择图片')
          return
        }
        break
      case 'video':
        if (file.type.indexOf('video/mp4') === -1) {
          message.error('只能选择MP4格式的视频')
          return
        }
        break
      case 'all':
        if (!/image|(video\/mp4)/gi.test(file.type)) {
          message.error('只能选择图片和MP4格式的视频')
          return
        }
        break
    }

    const isImg = /image/gi.test(file.type)
    const previewUrl = isImg ? await getImgUrl(file) : getVideoUrl(file)
    const type = isImg ? 'img' : 'video'

    setFileList([{
      uid: `${Date.now()}_${type}_file`,
      name: file.name,
      type,
      previewUrl,
      raw: file,
      status: 'ready'
    }])

    if (onFileSituation) onFileSituation(1)
  }

  // 更新文件列表项
  const uploadFileList = (updateFile: MediaFileType, updateObj: Partial<MediaFileType>) => {
    setFileList((prevList) => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  // 删除文件
  const onRemoveFile = (uid: string) => {
    if (cancelUploadFunc.current) {
      cancelUploadFunc.current()
    }

    if (fileInput.current) {
      fileInput.current.value = ''
    }

    if (onFileSituation) {
      onFileSituation(0)
    }

    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== uid)
    })
  }

  // 上传文件
  const uploadFiles = () => {
    const readyFilesLen = fileList.filter(item => (item.status === 'ready' || item.status === 'error')).length
    if (!readyFilesLen) {
      if (onFileSituation) onFileSituation(0)
      message.warn('请先选择需要上传的文件')
      return
    }

    setFileList((prevFileList) => {
      return prevFileList.map(item => ({
        ...item,
        percent: 0,
        status: 'uploading'
      }))
    })
    if (onUploadStart) onUploadStart()

    const { raw, type, previewUrl } = fileList[0]
    const { pro, cancelFunc } = request.upload(
      action,
      { file: raw, type },
      (percentage) => {
        // mk 暂时只上传单文件
        uploadFileList(fileList[0], { percent: percentage })
      }
    )

    cancelUploadFunc.current = cancelFunc

    pro.then(() => {
      uploadFileList(fileList[0], { percent: 100, status: 'success' })
      if (onUploadSuccess) onUploadSuccess(previewUrl)
      cancelUploadFunc.current = undefined
    }).catch(err => {
      if (err.response || err.request) {
        uploadFileList(fileList[0], { status: 'error' })
        if (onUploadError) onUploadError()
        message.error(`${fileList[0].name}上传失败`)
      } else {
        if (onUploadCancel) onUploadCancel()
      }

      cancelUploadFunc.current = undefined
    })
  }

  useEffect(() => {
    if (timeOfUploading > 0) {
      uploadFiles()
    }
  }, [timeOfUploading])

  return (
    <div className="custom-upload-area">

      <div className="upload-handle" onClick={uploadHandleClick}>
        <PlusOutlined className="icon-plus" />
        <p className="tip-text">选择文件</p>
      </div>

      <input
        className="viking-file-input"
        ref={fileInput}
        onChange={onFileChange}
        type="file"
        accept={accept()}
        style={{ display: 'none' }}
      />

      <MediaFileList
        fileList={fileList}
        onRemoveFile={onRemoveFile}
      />

    </div>
  )
}

MediaUpload.defaultProps = {
  timeOfUploading: 0,
  limit: 'all'
}

export default MediaUpload