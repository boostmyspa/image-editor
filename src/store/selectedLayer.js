import Vue from 'vue';
import LoadImage from '../util/loadImage';

export default {
    namespaced: true,

    state: {
        selectedLayer: null
    },

    getters: {
        x (state) {
            const x = state.selectedLayer && state.selectedLayer.x;
            return x || 0;
        },

        y (state) {
            const y = state.selectedLayer && state.selectedLayer.y;
            return y || 0;
        },

        width (state) {
            const width = state.selectedLayer && state.selectedLayer.width;
            return width || 0;
        },

        height (state) {
            const height = state.selectedLayer && state.selectedLayer.height;
            return height || 0;
        },
        
        hAlign (state) {
            return state.selectedLayer && state.selectedLayer.hAlign;
        },

        vAlign (state) {
            return state.selectedLayer && state.selectedLayer.vAlign;
        },

        fill (state) {
            return state.selectedLayer && state.selectedLayer.fill;
        },

        fontSize (state) {
            return state.selectedLayer && state.selectedLayer.fontSize;
        },

        fontFamily (state) {
            return state.selectedLayer && state.selectedLayer.fontFamily;
        },
    },

    mutations: {
        setLayer(state, layer) {
            state.selectedLayer = layer;
        },

        changePosition (state, position) {
            Vue.set(state.selectedLayer, 'x', position.x);
            Vue.set(state.selectedLayer, 'y', position.y);
        },

        changeSize (state, size) {
            Vue.set(state.selectedLayer, 'width', size.width);
            Vue.set(state.selectedLayer, 'height', size.height);
        },

        changeImage (state, image) {
            Vue.set(state.selectedLayer, 'image', image);
            Vue.set(state.selectedLayer, 'src', image.src);
        },

        changeText (state, text) {
            Vue.set(state.selectedLayer, 'text', text);
        },

        changeAlign (state, align) {
            Vue.set(state.selectedLayer, 'hAlign', align.hAlign);
            Vue.set(state.selectedLayer, 'vAlign', align.vAlign);
        },

        changeFill (state, fill) {
            Vue.set(state.selectedLayer, 'fill', fill);
        },

        setFontSize (state, fontSize) {
            Vue.set(state.selectedLayer, 'fontSize', fontSize);
        },

        setFontFamily (state, fontFamily) {
            Vue.set(state.selectedLayer, 'fontFamily', fontFamily);
        },
    },

    actions: {
        setSelectedLayer ({ commit }, layer) {
            commit('setLayer', layer)
        },

        changePosition ({ state, commit }, position) {
            if (!state.selectedLayer) return;

            commit('changePosition', position);
        },

        changeSize ({ state, commit }, size) {
            if (!state.selectedLayer) return;

            commit('changeSize', size);
        },

        changeImage ({ state, commit }, image) {
            if (!state.selectedLayer) return;

            if (image && image.src) {
                commit('changeImage', image);
            }
            else {
                console.warn('uploaded image or its src is undefined');
            }
        },

        changeText ({ state, commit }, text) {
            if (!state.selectedLayer) return;

            commit('changeText', text);
        },

        changeAlign ({ state, commit }, align) {
            if (!state.selectedLayer) return;

            commit('changeAlign', align);
        },

        changeFill ({ state, commit }, fill) {
            if (!state.selectedLayer) return;

            commit('changeFill', fill);
        },

        setFontSize ({ state, commit }, fontSize) {
            if (!state.selectedLayer) return;

            commit('setFontSize', fontSize);
        },

        setFontFamily ({ state, commit }, fontFamily) {
            if (!state.selectedLayer) return;

            commit('setFontFamily', fontFamily);
        },

        duplicateLayer ({ state, dispatch }, layer) {
            if (!state.selectedLayer) return;

            let newLayer = Object.assign({}, layer);

            // shift new added layer position
            newLayer.x += 10;
            newLayer.y += 10;

            if (newLayer.type == 'imageCatalog' && newLayer.catalog.items.length) {
                // for the Catalog Layer sets Thumbnail image as the first of choices
                const thumbnailSrc = newLayer.catalog.items[0].src;

                LoadImage(
                    (image, src) => {
                        newLayer.image = image;
                        newLayer.src = src;

                        dispatch('addLayer', newLayer, { root: true });
                    },
                    thumbnailSrc
                );
            }
            else {
                dispatch('addLayer', newLayer, { root: true });
            }
        }
    },
}