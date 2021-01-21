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
            hAlign: 'center',
            vAlign: 'middle',
            fontSize: '30',
            fontFamily: 'Avenir',
            fill: 'black',
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

            const setProperty = (propName) => {
                return item[propName] || def[propName];
            };

            let textItem = {
                scaleX: 1, // don't change. This is for prevent the transformer scaling
                scaleY: 1,
                name: def.name,
                text: setProperty('text'),
                x: setProperty('x'),
                y: setProperty('y'),
                width: setProperty('width'),
                height: setProperty('height'),
                rotate: setProperty('rotate'),
                hAlign: setProperty('hAlign'),
                vAlign: setProperty('vAlign'),
                fontSize: setProperty('fontSize'),
                fontFamily: setProperty('fontFamily'),
                fill: setProperty('fill'),
            };

            dispatch('addLayer', textItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeLayerById', id, { root: true });
        },

    }
}