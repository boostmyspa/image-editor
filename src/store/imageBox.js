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

            dispatch('addElement', imageItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeElementById', id, { root: true });
        },

        changeImage ({ dispatch }, { item, image, src }) {
            let
                newItem = Object.assign({}, item);

            newItem.image = image;
            newItem.src = src;

            dispatch('changeElement', newItem, { root: true });
        },

        changePosition ({ dispatch }, { item, position }) {
            let
                newItem = Object.assign({}, item);

            newItem.x = position.x;
            newItem.y = position.y;

            dispatch('changeElement', newItem, { root: true });
        },

        transformed ({ dispatch }, { item, width, height }) {
            let
                newItem = Object.assign({}, item);

            newItem.width = width;
            newItem.height = height;

            dispatch('changeElement', newItem, { root: true });
        },

        changeSettings ({ dispatch }, { item, settings}) {
            let
                newItem = Object.assign({}, item);

            newItem.settings = settings;

            dispatch('changeElement', newItem, { root: true });
        }
    }
}