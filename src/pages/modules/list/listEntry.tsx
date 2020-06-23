import React from 'react'
import PageWrap from '../../../components/PageWrap/pageWrap'
import PageTabs from '../../../components/PageTabs/PageTabs'
import ModuleRoutes from '../../../components/ModuleRoutes/moduleRoutes'
import useStores from '../../../hooks/useStores'
import findChildRoutes from '../../../utils/route/findChildRoutes'

import './list-entry.scss'

const ListEntry: React.FC = () => {
  const { globalStore: store } = useStores()
  const listRoutes = findChildRoutes(store.contentRoutes, { name: 'list' })

  return (
    <PageWrap isNProgressDone={false}>
      <div className="page-container list-page">
        <PageTabs routes={listRoutes} />
        <ModuleRoutes routes={listRoutes} />
      </div>
    </PageWrap>
  )
}

export default ListEntry