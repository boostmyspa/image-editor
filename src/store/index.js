import Vue from 'vue';
import Vuex from 'vuex';

import moduleTextBox from './textBox';
import moduleBackgroundImage from './bgImage'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        textBox: moduleTextBox,
        bgImage: moduleBackgroundImage
    },

    state: {
        elementsLastId: 0,
        elements: []
    },

    getters: {
        findElementIndexById: (state) => (id) => {
            return state.elements.findIndex( (el) => el.id == id )
        },
    },

    mutations: {
        elementAdded(state) {
            state.elementsLastId++;
        },

        addElement(state, item) {
            state.elements.push(item);
        },

        removeElement(state, index) {
            state.elements.splice(index, 1);
        },

        changeElement(state, { index, item }) {
            state.elements.splice(index, 1, item)
        },

    },

    actions: {
        addElement({ state, commit }, item) {
            commit('elementAdded');

            item.id = state.elementsLastId;

            commit('addElement', item);
        },

        removeElement({ getters, commit }, item) {
            let index = getters.findElementIndexById(item['id']);

            commit('removeElement', index);
        },

        removeElementById({ getters, commit }, id) {
            let index = getters.findElementIndexById(id);

            commit('removeElement', index);
        },

        changeElement({ getters, commit }, item) {
            let index = getters.findElementIndexById(item['id']);

            commit('changeElement', { index, item });
        },

    }
})