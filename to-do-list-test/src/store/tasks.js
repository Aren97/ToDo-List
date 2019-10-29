import firebase from 'firebase/app'
export default {
  state: {
    dataKeys: [],
    dataObj: {},
    loaders: {
      dataIsLoading: false,
      buttonLoader: false,
      taskLoader: false
    }
  },
  mutations: {
    // Присваивает полученные задачи
    setData (state, payload) {
      state.dataObj = payload
      state.dataKeys = Object.keys(state.dataObj).reverse()
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
      state.dataObj[payload.key] = payload.data
      state.dataKeys.unshift(payload.key)
    },
    // Удаляет задачу
    removeTask (state, payload) {
      delete state.dataObj[payload]
      state.dataKeys.splice(state.dataKeys.indexOf(payload), 1)
    },
    // Отмечает задачу, как выполненную
    checkTask (state, payload) {
      state.dataObj[payload]['checked'] = true
      state.dataKeys = state.dataKeys.slice()
    },
    // Меняет тайтл задачи
    changeTask (state, payload) {
      state.dataObj[payload.id].title = payload.title
      state.dataObj = Object.assign({}, state.dataObj)
    }
  },
  actions: {
    // Получает список задач
    async getTasks ({ commit }) {
      commit('setDataLoading', true)
      try {
        const result = await firebase.database().ref('todos').orderByChild('intId').once('value')
        const tasks = result.val()

        commit('setData', tasks)
      } catch (e) {
        console.error('Error getting task:', e)
      } finally {
        commit('setDataLoading')
      }
    },
    // Добавлякт задачу
    async addTask ({ commit }, payload) {
      commit('setAddLoading', true)
      try {
        const result = await firebase.database().ref('todos').push(payload)
        if (result.key) {
          commit('addTaskLocal', { data: payload, key: result.key })
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
        commit('removeTask', payload.id)
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
        commit('changeTask', { id: payload.id, title: payload.title })
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
        commit('checkTask', payload.id)
      } catch (e) {
        console.error('Error checking task:', e)
      } finally {
        commit('setTaskLoading')
      }
    }
  },
  getters: {
    // Возвращает задачи в объекте ключ (id) - значение
    tasksObj (state) {
      return state.dataObj
    },
    // Возвращает ключи
    tasksKeys (state) {
      return state.dataKeys
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
