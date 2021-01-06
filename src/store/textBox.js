export default {
    namespaced: true,
    
    state: {
        default: {
            name: 'textBox',
            text: '',
            x: 0,
            y: 0,
            width: 150,
            height: 30,
            rotate: 0,
            settings: {
                hAlign: 'center',
                vAlign: 'middle',
                fontSize: '30',
                fontFamily: 'Calibri',
                fill: 'black'
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

            let textItem = {
                scaleX: 1, // don't change. This is for prevent the transformer scaling
                scaleY: 1,
                name: def.name,
                text: item.text || def.text,
                x: item.x || def.x,
                y: item.y || def.y,
                width: item.width || def.width,
                height: item.height || def.height,
                rotate: item.rotate || def.rotate,
                settings: {
                    hAlign: itemSettings.hAlign || def.settings.hAlign,
                    vAlign: itemSettings.vAlign || def.settings.vAlign,
                    fontSize: itemSettings.fontSize || def.settings.fontSize,
                    fontFamily: itemSettings.fontFamily || def.settings.fontFamily,
                    fill: itemSettings.fill || def.settings.fill
                }
            };

            dispatch('addLayer', textItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeLayerById', id, { root: true });
        },

        changeText ({ dispatch }, { item, text }) {
            let
                newItem = Object.assign({}, item);

            newItem.text = text;

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