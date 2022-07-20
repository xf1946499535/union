import { defineStore } from 'pinia'
import { getuser } from '@/apis/users'
type meType = {
  userid: number,
  name: string,
  postName: string,
}
const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => ({
    // all these properties will have their type inferred automatically
    me: <meType>null
  }),
  getters: {
    getme(): meType {
      return this.me
    }
  },
  actions: {
    async setuser(userid) {
      const res = await getuser(userid)
      this.me = res.data
    },

  }
})

export default useStore
