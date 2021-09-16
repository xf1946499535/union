import variables from '@/styles/element-variables.scss'
 
const settings = {
  state: {
    theme: variables.theme
  },
  getters:{
    set_theme(val){
      state.theme=val;
    },
    get_theme(){
      return state.theme;
    }
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
 
}
 
export default settings