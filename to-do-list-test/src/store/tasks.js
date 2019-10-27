import firebase from 'firebase/app'
export default {
  state: {
    data: [],
    dataIsLoading: false
  },
  mutations: {
    // Присваивает полученные задачи
    setData (state, payload) {
      state.data = payload
    },
    // Флаг загрузки задач
    setDataLoading (state, payload) {
      state.dataIsLoading = payload
    },
    // Добавляет задачу в локальный массив
    addTaskLocal (state, payload) {
      state.data.unshift(payload)
    },
    // Удаляет задачу
    removeTask (state, payload) {
      state.data.splice(payload, 1)
    },
    // Отмечает задачу, как выполненную
    checkTask (state, payload) {
      console.log(state.data[payload])
      state.data[payload]['checked'] = true
      console.log(state.data[payload])
    }
  },
  actions: {
    // Получает список задач
    async getTasks ({ commit }) {
      commit('setDataLoading', true)
      try {
        const tasksArr = []
        const result = await firebase.database().ref('todos').once('value')
        const tasks = result.val()

        Object.keys(tasks).forEach(key => {
          tasksArr.push({ title: tasks[key].title, id: key, intId: tasks[key].intId, checked: tasks[key].checked })
        })
        commit('setData', tasksArr)
      } catch (e) {
        console.log('Error getting task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    // Добавлякт задачу
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
    // Удаляет задачу
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
    // Изменяет задачу
    async changeTask ({ commit }, payload) {
      commit('setDataLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).update({ title: payload.title })
      } catch (e) {
        console.error('Error changing task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    // Отмечает задачу, как выполненную
    async checkTask ({ commit }, payload) {
      commit('setDataLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).update({ checked: true })
        commit('checkTask', payload.index)
      } catch (e) {
        console.error('Error checking task:', e)
      } finally {
        commit('setDataLoading')
      }
    }
  },
  getters: {
    // Возвращает задачи
    tasks (state) {
      return state.data
    }
  }
}
