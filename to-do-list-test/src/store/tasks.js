import firebase from 'firebase/app'
export default {
  state: {
    data: [],
    loaders: {
      dataIsLoading: false,
      buttonLoader: false,
      taskLoader: false
    }
  },
  mutations: {
    // Присваивает полученные задачи
    setData (state, payload) {
      state.data = payload
    },
    // Флаг загрузки задач
    setDataLoading (state, payload) {
      state.loaders.dataIsLoading = payload
    },
    // Флаг добавления задач
    setAddLoading (state, payload) {
      state.loaders.buttonLoader = payload
    },
    // Флаг для задач
    setTaskLoading (state, payload) {
      state.loaders.taskLoader = payload
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

        console.log(Object.values(tasks))
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
      commit('setAddLoading', true)
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
        commit('setAddLoading')
      }
    },
    // Удаляет задачу
    async removeTask ({ commit }, payload) {
      commit('setTaskLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).remove()
        commit('removeTask', payload.index)
      } catch (e) {
        console.error('Error removing task:', e)
      } finally {
        commit('setTaskLoading')
      }
    },
    // Изменяет задачу
    async changeTask ({ commit }, payload) {
      commit('setTaskLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).update({ title: payload.title })
      } catch (e) {
        console.error('Error changing task:', e)
      } finally {
        commit('setTaskLoading')
      }
    },
    // Отмечает задачу, как выполненную
    async checkTask ({ commit }, payload) {
      commit('setTaskLoading', true)
      try {
        await firebase.database().ref('todos').child(payload.id).update({ checked: true })
        commit('checkTask', payload.index)
      } catch (e) {
        console.error('Error checking task:', e)
      } finally {
        commit('setTaskLoading')
      }
    }
  },
  getters: {
    // Возвращает задачи
    tasks (state) {
      return state.data
    },
    // Возвращает флаг рагрузки задачи
    dataIsLoading (state) {
      return state.loaders.dataIsLoading
    },
    // Возвращает флаг кнопки
    buttonLoader (state) {
      return state.loaders.buttonLoader
    },
    // Возвращает флаг задач
    taskLoader (state) {
      return state.loaders.taskLoader
    }
  }
}
