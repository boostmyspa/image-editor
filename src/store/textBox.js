export default {
    namespaced: true,
    
    state: {
        default: {
            text: '',
            x: 0,
            y: 0,
            width: 150,
            height: 30,
            rotate: 0
        }
    },

    getters: {

    },

    mutations: {

    },

    actions: {
        add({ state, dispatch }, item ) {
            const def = state.default;

            let textItem = {
                name: 'text',
                text: item.text || def.text,
                x: item.x || def.x,
                y: item.y || def.y,
                width: item.width || def.width,
                height: item.height || def.height,
                rotate: item.rotate || def.rotate,
                scaleX: 1,
                scaleY: 1
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

        changePosition ({ dispatch }, { item, newPosition }) {
            let
                newItem = Object.assign({}, item);

            newItem.x = newPosition.x;
            newItem.y = newPosition.y;

            dispatch('changeElement', newItem, { root: true });
        },

        transformed ({ dispatch }, { item, width, height }) {
            let
                newItem = Object.assign({}, item);

            newItem.width = width;
            newItem.height = height;

            dispatch('changeElement', newItem, { root: true });
        }
    }
}