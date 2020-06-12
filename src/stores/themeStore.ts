import { observable, action } from 'mobx'

class ThemeStore {
  @observable
  theme = 'light'

  @action.bound
  setTheme(newTheme: string) {
    this.theme = newTheme
  }
}

export default ThemeStore
