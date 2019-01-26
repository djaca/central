import db from '@/database'

const remoteProjects = db.projects

const state = {
  // items: [
  //   {
  //     _id: 1,
  //     name: 'No project specified'
  //   },
  //   {
  //     _id: 2,
  //     name: 'central'
  //   },
  //   {
  //     _id: 3,
  //     name: 'tv-shows'
  //   },
  //   {
  //     _id: 4,
  //     name: 'goodwork'
  //   }
  // ],
  items: null,
  current: null
  // current: {
  //   _id: 1,
  //   name: 'No project specified'
  // }
}

const getters = {
  projects: state => state.projects,

  current: state => state.current
}

const mutations = {
  SET_PROJECTS (state, payload) {
    state.items = payload
  },

  SET_CURRENT (state, id) {
    state.current = state.items.find(i => i._id === id)
  }
}

const actions = {
  get ({commit}) {
    remoteProjects.find({}, (err, docs) => {
      if (err) {
        console.log(err)

        return
      }

      commit('SET_PROJECTS', docs)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
