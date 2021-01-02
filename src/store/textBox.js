export default {
    namespaced: true,
    
    state: {
        default: {
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
                scaleX: 1,
                scaleY: 1,
                name: 'text',
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
                    fill: 'black'
                }
            };

            dispatch('addElement', textItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeElementById', id, { root: true });
        },

        changeText ({ dispatch }, { item, text }) {
            let
                newItem = Object.assign({}, item);

            newItem.text = text;

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