import { createContext } from 'react'
import GlobalStore from '../stores/globalStore'
import ThemeStore from '../stores/themeStore'

const StoresContext = createContext({
  globalStore: new GlobalStore(),
  themeStore: new ThemeStore(),
})

export default StoresContext
