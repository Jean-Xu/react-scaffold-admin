/**
 * -------------------------------------------------------
 * 媒体文件列表
 * @description 描述
 * -------------------------------------------------------
 */

import React from 'react'
import { Progress } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Zmage from 'react-zmage'
import classNames from 'classnames'
import { MediaFileType, MediaFileStatus } from './mediaUpload'

interface MediaFileListProps {
  fileList: MediaFileType[]
  onRemoveFile: (uid: string) => void
}

const MediaFileList: React.FC<MediaFileListProps> = (props) => {
  const { fileList, onRemoveFile } = props

  const progressStatus = (status: MediaFileStatus) => {
    if (status === 'success') return 'success'
    return 'active'
  }

  return (
    <div className="file-list">
      {fileList.map((item) => (
        <div
          className={classNames('item', { [`${item.status}`]: item.status })}
          key={item.uid}
        >
          <div className="cover">
            {item.type === 'img' && <Zmage src={item.previewUrl} />}
            {item.type === 'video' && <video src={item.previewUrl} />}
          </div>
          <div className="info">
            <div className="name">
              {item.name}
            </div>
            {(item.status === 'uploading' || item.status === 'success') && (
              <Progress
                percent={item.percent}
                size="small"
                status={progressStatus(item.status)}
              />
            )}
          </div>
          <div
            className="delete"
            title="删除"
            onClick={() => onRemoveFile(item.uid)}
          >
            <DeleteOutlined />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MediaFileList