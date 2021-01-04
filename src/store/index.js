import Vue from 'vue';
import Vuex from 'vuex';

import moduleBackgroundImage from './bgImage'
import moduleTextBox from './textBox';
import moduleImageBox from './imageBox';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        bgImage: moduleBackgroundImage,
        textBox: moduleTextBox,
        imageBox: moduleImageBox
    },

    state: {
        elementsLastId: 0,
        elements: [],
        selectedElementId: null
    },

    getters: {
        getElementIndexById: (state) => (id) => {
            return state.elements.findIndex( (el) => el.id == id )
        },

        getElementById: (state) => (id) => {
            return state.elements.find( (el) => el.id == id )
        }
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

        changeSelectedElementId(state, id) {
            state.selectedElementId = id;
        }
    },

    actions: {
        addElement({ state, commit }, item) {
            commit('elementAdded');

            item.id = 'id-' + state.elementsLastId;

            commit('addElement', item);
        },

        removeElement({ getters, commit }, item) {
            let index = getters.getElementIndexById(item['id']);

            commit('removeElement', index);
        },

        removeElementById({ getters, commit }, id) {
            let index = getters.getElementIndexById(id);

            commit('removeElement', index);
        },

        changeElement({ getters, commit }, item) {
            let index = getters.getElementIndexById(item['id']);

            commit('changeElement', { index, item });
        },

        changeSelectedElementId({ commit }, id) {
            commit('changeSelectedElementId', id);
        }
    }
})