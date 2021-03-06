export default {
    namespaced: true,

    state: {
        default: {
            // id: null, - sets when image layer adding to the 'layers'
            catalogId: null, // - sets for image layer as Catalog. Use for save to the server and restore the data
            catalog: null,
            fromPublicGallery: false,
            catalogThumbnailIndex: 0,
            type: 'imageStatic', // imageStatic, imageCatalog (sets on Upload image to canvas)
            name: 'imageBox',
            label: '', // used as the Catalog "question"
            src: null,
            image: null,
            x: 0,
            y: 0,
            width: 150,
            height: 150,
            rotate: 0,
            hAlign: 'center',
            vAlign: 'middle',
            // fitContain: true, // true: contain, false: cover
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

            let imageItem = {
                scaleX: 1, // don't change. This is for prevent the transformer scaling
                scaleY: 1,
                catalogId: setProperty('catalogId'),
                catalog: setProperty('catalog'),
                fromPublicGallery: setProperty('fromPublicGallery'),
                catalogThumbnailIndex: setProperty('catalogThumbnailIndex'),
                type: setProperty('type'),
                name: def.name,
                label: setProperty('label'),
                src: setProperty('src'),
                image: setProperty('image'),
                x: setProperty('x'),
                y: setProperty('y'),
                width: setProperty('width'),
                height: setProperty('height'),
                rotate: setProperty('rotate'),
                hAlign: setProperty('hAlign'),
                vAlign: setProperty('vAlign'),
                // fitContain: itemSettings.fitContain || def.settings.fitContain,
            };

            dispatch('addLayer', imageItem, { root: true });
        },

        remove({ dispatch }, id) {
            dispatch('removeLayerById', id, { root: true });
        },

    }
}