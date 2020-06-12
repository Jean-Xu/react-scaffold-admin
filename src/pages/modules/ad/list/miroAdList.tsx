import React, {  } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import PageWrap from '../../../../components/PageWrap/pageWrap'
import { CONTENT_ROUTE_PATH } from '../../../../utils/constant'

interface MiroAdListProps {
}

const MiroAdList: React.FC<MiroAdListProps> = (props) => {
  const {  } = props
  const history = useHistory()

  const gotoDetail = (id: string): void => {
    history.push({
      pathname: `${CONTENT_ROUTE_PATH}/ad/detail`,
      state: { id }
    })
  }

  return (
    <PageWrap isHeightOpen={false}>
      <h2>广告列表-镜电</h2>
      <ul>
        <li style={{ color: "blue", cursor: "pointer" }} onClick={() => gotoDetail('215')}>广告1</li>
        <li style={{ color: "blue", cursor: "pointer" }} onClick={() => gotoDetail('1561')}>广告2</li>
      </ul>
    </PageWrap>
  )
}

export default MiroAdList