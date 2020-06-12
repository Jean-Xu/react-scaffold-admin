import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import PageWrap from '../../../components/PageWrap/pageWrap'

interface AdDetailProps {
}

const AdDetail: React.FC<AdDetailProps> = (props) => {
  const {  } = props
  const location = useLocation()
  const [ adId, setAdId ] = useState('')

  useEffect(() => {
    if (location.state) {
      // @ts-ignore
      const { id } = location.state
      setAdId(id)
    }
  }, [location])

  return (
    <PageWrap>
      <h2>广告详情</h2>
      <p>ID: {adId}</p>
    </PageWrap>
  )
}

export default AdDetail