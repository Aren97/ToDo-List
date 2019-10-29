import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDo from './router/to-do'
import ToDoList from './components/to-do-list'
import TaskPage from './router/task-page'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ToDo,
    redirect: '/1',
    children: [
      {
        path: '/:page',
        component: ToDoList,
        props: true
      }
    ]
  },
  {
    path: '/tasks/:id',
    name: 'task-page',
    component: TaskPage,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
