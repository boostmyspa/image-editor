import Vue from 'vue';
import Vuex from 'vuex';

import moduleBackgroundImage from './bgImage'
import moduleTextBox from './textBox';
import moduleImageBox from './imageBox';
import moduleImageGallery from './imageGallery';
import moduleGallery from './gallery';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        bgImage: moduleBackgroundImage,
        textBox: moduleTextBox,
        imageBox: moduleImageBox,
        imageGallery: moduleImageGallery,
        gallery: moduleGallery,
    },

    state: {
        layersLastId: 0,
        layers: [],
        selectedLayerId: null,
        dataFromServer: null
    },

    getters: {
        getLayerIndexById: (state) => (id) => {
            return state.layers.findIndex( (item) => item.id == id )
        },

        getLayerById: (state) => (id) => {
            return state.layers.find( (item) => item.id == id )
        },

        prepareForSave: (state) => {
            let saveLayers = state.layers.map((item) => {
                const settings = item.settings || {};

                switch (item.name) {
                    case 'textBox':
                        return {
                            name: item.name,
                            text: item.text,
                            x: item.x,
                            y: item.y,
                            width: item.width,
                            height: item.height,
                            rotate: item.rotate,
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
                            catalogId: item.catalogId,
                            fromPublicGallery: item.fromPublicGallery,
                            catalogThumbnailIndex: item.catalogThumbnailIndex,
                            type: item.type,
                            name: item.name,
                            label: item.label,
                            src: item.src,
                            x: item.x,
                            y: item.y,
                            width: item.width,
                            height: item.height,
                            rotate: item.rotate,
                            settings: {
                                hAlign: settings.hAlign,
                                vAlign: settings.vAlign
                            }
                        };

                    default:
                        return {}
                }
            });

            return saveLayers;
        }
    },

    mutations: {
        clearLayers(state) {
            state.layers = [];
        },

        layerAdded(state) {
            state.layersLastId++;
        },

        addLayer(state, item) {
            state.layers.push(item);
        },

        removeLayer(state, index) {
            state.layers.splice(index, 1);
        },

        changeLayer(state, { index, item }) {
            state.layers.splice(index, 1, item)
        },

        setSelectedLayerId(state, id) {
            state.selectedLayerId = id;
        },

        replaceLayerInOrder(state, { from, to }) {
            state.layers.splice(to, 0, state.layers.splice(from, 1)[0]);
        },

        saveDataToServer(state, {data}) {
            state.dataFromServer = data;
        },
    },

    actions: {
        addLayer({ state, commit, dispatch }, item) {
            commit('layerAdded');

            item.id = 'id-' + state.layersLastId;

            commit('addLayer', item);

            dispatch('setSelectedLayerIdToLastId');
        },

        removeLayer({ getters, commit }, item) {
            let index = getters.getLayerIndexById(item['id']);

            commit('removeLayer', index);
        },

        removeLayerById({ getters, commit }, id) {
            let index = getters.getLayerIndexById(id);

            commit('removeLayer', index);
        },

        changeLayer({ getters, commit }, item) {
            let index = getters.getLayerIndexById(item['id']);

            commit('changeLayer', { index, item });
        },

        setSelectedLayerId({ commit }, id) {
            commit('setSelectedLayerId', id);
        },

        setSelectedLayerIdToLastId({ state, commit }) {
            const layersLastId = `id-${state.layersLastId}`;
            commit('setSelectedLayerId', layersLastId);
        },

        replaceLayerInOrder({ commit }, { from, to }) {
            commit('replaceLayerInOrder', { from, to });
        },

        saveDataToServer({ commit }, data) {
            commit('saveDataToServer', { data });
        },

        loadDataFromServer({ state, commit, dispatch }) {

            commit('clearLayers');

            let layersData = JSON.parse(state.dataFromServer);

            layersData.forEach((item) => {
                dispatch('addLayer', item);
            });
        }
    }
})