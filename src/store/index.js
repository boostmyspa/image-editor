import Vue from 'vue';
import Vuex from 'vuex';

import moduleBackgroundImage from './bgImage'
import moduleTextBox from './textBox';
import moduleImageBox from './imageBox';
import moduleImageGallery from './imageGallery';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        bgImage: moduleBackgroundImage,
        textBox: moduleTextBox,
        imageBox: moduleImageBox,
        imageGallery: moduleImageGallery
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
        },

        prepareForSave: (state) => {
            let saveElements = state.elements.map((el) => {
                const settings = el.settings || {};

                switch (el.name) {
                    case 'textBox':
                        return {
                            name: el.name,
                            text: el.text,
                            x: el.x,
                            y: el.y,
                            width: el.width,
                            height: el.height,
                            rotate: el.rotate,
                            settings: {
                                hAlign: settings.hAlign,
                                vAlign: settings.vAlign,
                                fontSize: settings.fontSize,
                                fontFamily: settings.fontFamily,
                                fill: settings.fill
                            }
                        };

                    case 'imageBox':
                        return {
                            name: el.name,
                            src: el.src,
                            x: el.x,
                            y: el.y,
                            width: el.width,
                            height: el.height,
                            rotate: el.rotate,
                            settings: {
                                hAlign: settings.hAlign,
                                vAlign: settings.vAlign
                            }
                        };

                    default:
                        return {}
                }
            });

            return saveElements;
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
        },

        replaceElementInOrder(state, { from, to }) {
            state.elements.splice(to, 0, state.elements.splice(from, 1)[0]);
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
        },

        replaceElementInOrder({ commit }, { from, to }) {
            commit('replaceElementInOrder', { from, to });
        }
    }
})