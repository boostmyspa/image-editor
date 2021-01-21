import Vue from 'vue';
import Vuex from 'vuex';

import bgImage from './bgImage'
import textBox from './textBox';
import imageBox from './imageBox';
import gallery from './gallery';
import selectedLayer from './selectedLayer';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        bgImage: bgImage,
        textBox: textBox,
        imageBox: imageBox,
        gallery: gallery,
        selectedLayer: selectedLayer
    },

    state: {

        design: {
            title: 'Your Personalized Long Distance Bond',
            products: [
                {
                    title: 'Premium Unisex T-Shirt',
                    templateSize: {
                        width: 4000, // pixels or inches
                        height: 4000
                    },
                    backgroundImage: {
                        // ? change the product color or size ?
                        src: null
                    }
                },{
                    title: 'Premium Long Sleeve'
                },{
                    title: 'Colored Mug',
                    templateSize: {
                        width: 500, // pixels or inches
                        height: 500
                    },
                    backgroundImage: {
                        src: null
                    }
                },
            ],
            templates: [
                {
                    title: '2 People',
                    size: { // minimum size for the largest of products (probably default sizes)
                        width: 500, // pixels or inches
                        height: 500
                    }
                }
            ]
        },

        stageSize: {
            width: 500,
            height: 500
        },


        layersLastId: 0,
        layers: [],
        dataFromServer: null,
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
                            hAlign: item.hAlign,
                            vAlign: item.vAlign,
                            fontSize: item.fontSize,
                            fontFamily: item.fontFamily,
                            fill: item.fill,
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
                            hAlign: item.hAlign,
                            vAlign: item.vAlign,
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

            dispatch('selectedLayer/setSelectedLayer', item);
        },

        removeLayer({ getters, commit }, item) {
            let index = getters.getLayerIndexById(item['id']);

            commit('removeLayer', index);
        },

        removeLayerById({ getters, commit }, id) {
            let index = getters.getLayerIndexById(id);

            commit('removeLayer', index);
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