import { useContext } from 'react'
import StoresContext from '../contexts/storesContext'

const useStores = () => useContext(StoresContext)

export default useStores
