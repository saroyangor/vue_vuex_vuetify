import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [
            { id: 1, title: "Wake up", done: false }
        ],
        snackbar: {
            show: false,
            text: '',
        }
    },
    getters: {},
    mutations: {
        addTask(state, newTaskTitle) {
            state.tasks.push({
                id: Date.now(),
                title: newTaskTitle,
                done: false,
            })
        },
        updateTaskTitle(state, updatedTask) {
            const task = state.tasks.find(task => task.id === updatedTask.id)
            task.title = updatedTask.title
        },
        doneTask(state, id) {
            const task = state.tasks.find(task => task.id === id)
            task.done = !task.done
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id)
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
    },
    actions: {
        addTask({ commit }, newTaskTitle) {
            commit('addTask', newTaskTitle)
            commit('showSnackbar', 'Task added!')
        },
        deleteTask({ commit }, id) {
            commit('deleteTask', id)
            commit('showSnackbar', 'Task deleted!')
        },
        updateTaskTitle({ commit }, updatedTask) {
            commit('updateTaskTitle', updatedTask)
            commit('showSnackbar', 'Task updated!')
        }
    }
})
