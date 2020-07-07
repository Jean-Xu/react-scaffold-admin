import React from 'react'
import { Row, Col } from 'antd'
import PageWrap from '../../../components/PageWrap/pageWrap'
import CustomUploadForm from './UploadForms/customUploadForm'
import DraggerUploadForm from './UploadForms/draggerUploadForm'

import './upload-form.scss'

const UploadForm: React.FC = () => {
  return (
    <PageWrap>
      <div className="page-container upload-form-page">

        <h1 className="page-title">上传文件</h1>

        <div className="main-form upload-form">
          <Row>
            <Col offset={8} span={8}>
              <CustomUploadForm />
              <DraggerUploadForm />
            </Col>
          </Row>
        </div>

      </div>
    </PageWrap>
  )
}

export default UploadForm