export default {
    namespaced: true,
    
    state: {

    },

    getters: {

    },

    mutations: {

    },

    actions: {
        add({ dispatch }, item ) {
            let textItem = {
                name: 'text',
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
            };

            dispatch('addElement', textItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeElementById', id, { root: true });
        },

        changePosition ({ dispatch }, { item, newPosition }) {
            let
                newItem = Object.assign({}, item);

            newItem.x = newPosition.x;
            newItem.y = newPosition.y;

            dispatch('changeElement', newItem, { root: true });
        },
    }
}