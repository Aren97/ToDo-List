import firebase from 'firebase/app'
export default {
  state: {
    data: [],
    dataIsLoading: false
  },
  mutations: {
    setData (state, payload) {
      state.data = payload
    },
    setDataLoading (state, payload) {
      state.dataIsLoading = payload
    },
    addTaskLocal (state, payload) {
      state.data.unshift(payload)
    },
    removeTask (state, payload) {
      state.data.splice(payload, 1)
    }
  },
  actions: {
    async getTasks ({ commit }) {
      commit('setDataLoading', true)
      try {
        const tasksArr = []
        const result = await firebase.database().ref('todos').once('value')
        const tasks = result.val()

        Object.keys(tasks).forEach(key => {
          tasksArr.push({ title: tasks[key].title, id: key, intId: tasks[key].intId })
        })
        commit('setData', tasksArr)
      } catch (e) {
        console.log('Error getting task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    async addTask ({ commit }, payload) {
      commit('setDataLoading', true)
      try {
        const result = firebase.database().ref('todos').push(payload)
        if (result.key) {
          commit('addTaskLocal', payload)
          console.log('Task added')
        }
        return result
      } catch (e) {
        console.error('Error adding task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    async removeTask ({ commit }, payload) {
      commit('setDataLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).remove()
        commit('removeTask', payload.index)
      } catch (e) {
        console.error('Error removing task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    async changeTaskItem ({ commit }, payload) {
      commit('setDataLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).update({ title: payload.title })
      } catch (e) {
        console.error('Error removing task:', e)
      } finally {
        commit('setDataLoading')
      }
    }
  },
  getters: {
    tasks (state) {
      return state.data
    }
  }
}
