export default {
    namespaced: true,

    state: {
        default: {
            name: 'imageBox',
            src: null,
            image: null,
            x: 0,
            y: 0,
            width: 150,
            height: 150,
            rotate: 0,
            settings: {
                hAlign: 'center',
                vAlign: 'middle',
                // fitContain: true, // true: contain, false: cover
            }
        }
    },

    getters: {

    },

    mutations: {

    },

    actions: {
        add({ state, dispatch }, item ) {
            item = item || {};

            const def = state.default;
            const itemSettings = item.settings || {};

            let imageItem = {
                scaleX: 1, // don't change. This is for prevent the transformer scaling
                scaleY: 1,
                name: def.name,
                src: item.src || def.src,
                image: item.image || def.image,
                x: item.x || def.x,
                y: item.y || def.y,
                width: item.width || def.width,
                height: item.height || def.height,
                rotate: item.rotate || def.rotate,
                settings: {
                    hAlign: itemSettings.hAlign || def.settings.hAlign,
                    vAlign: itemSettings.vAlign || def.settings.vAlign,
                    // fitContain: itemSettings.fitContain || def.settings.fitContain,
                }
            };

            dispatch('addLayer', imageItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeLayerById', id, { root: true });
        },

        changeImage ({ dispatch }, { item, image, src }) {
            let
                newItem = Object.assign({}, item);

            newItem.image = image;
            newItem.src = src;

            dispatch('changeLayer', newItem, { root: true });
        },

        changePosition ({ dispatch }, { item, position }) {
            let
                newItem = Object.assign({}, item);

            newItem.x = position.x;
            newItem.y = position.y;

            dispatch('changeLayer', newItem, { root: true });
        },

        transformed ({ dispatch }, { item, width, height }) {
            let
                newItem = Object.assign({}, item);

            newItem.width = width;
            newItem.height = height;

            dispatch('changeLayer', newItem, { root: true });
        },

        changeSettings ({ dispatch }, { item, settings}) {
            let
                newItem = Object.assign({}, item);

            newItem.settings = settings;

            dispatch('changeLayer', newItem, { root: true });
        }
    }
}