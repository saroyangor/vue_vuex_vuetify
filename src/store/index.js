import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from "localbase";

const db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: process.env.VUE_APP_TITLE,
        search: null,
        tasks: [],
        snackbar: {
            show: false,
            text: '',
        },
        sorting: false,
    },
    getters: {
        tasksFiltered(state) {
            if (!state.search) {
                return state.tasks
            }

            return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
        },
    },
    mutations: {
        setSearch(state, value) {
            state.search = value
        },
        addTask(state, newTask) {
            state.tasks.push(newTask)
        },
        updateTaskTitle(state, updatedTask) {
            const task = state.tasks.find(task => task.id === updatedTask.id)
            task.title = updatedTask.title
        },
        updateTaskDueDate(state, updatedTask) {
            const task = state.tasks.find(task => task.id === updatedTask.id)
            task.dueDate = updatedTask.dueDate
        },
        doneTask(state, id) {
            const task = state.tasks.find(task => task.id === id)
            task.done = !task.done
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id)
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        showSnackbar(state, text) {
            let timeout = 0
            if (state.snackbar.show) {
                state.snackbar.show = false
                timeout = 300
            }

            setTimeout(() => {
                state.snackbar.show = true
                state.snackbar.text = text
            }, timeout)
        },
        hideSnackbar(state) {
            state.snackbar.show = false
        },
        toggleSorting(state) {
            state.sorting = !state.sorting
        }
    },
    actions: {
        async addTask({ commit }, newTaskTitle) {
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                done: false,
                dueDate: null,
            }
            await db.collection('tasks').add(newTask)
            commit('addTask', newTask)
            commit('showSnackbar', 'Task added!')
        },
        async updateTaskTitle({ commit }, updatedTask) {
            await db.collection('tasks').doc({ id: updatedTask.id }).update({
                title: updatedTask.title
            })
            commit('updateTaskTitle', updatedTask)
            commit('showSnackbar', 'Task updated!')
        },
        async updateTaskDueDate({ commit }, updatedTask) {
            await db.collection('tasks').doc({ id: updatedTask.id }).update({
                dueDate: updatedTask.dueDate
            })
            commit('updateTaskDueDate', updatedTask)
            commit('showSnackbar', 'Due Date updated!')
        },
        async doneTask({ state, commit }, id) {
            await db.collection('tasks').doc({ id }).update({
                done: !state.tasks.find(task => task.id === id).done
            })
            commit('doneTask', id)
        },
        async deleteTask({ commit }, id) {
            await db.collection('tasks').doc({ id }).delete()
            commit('deleteTask', id)
            commit('showSnackbar', 'Task deleted!')
        },
        async getTasks({ commit }) {
            const tasks = await db.collection('tasks').get()
            commit('setTasks', tasks)
        },
        async setTasks({ commit }, tasks) {
            await db.collection('tasks').set(tasks)
            commit('setTasks', tasks)
        },
    }
})
