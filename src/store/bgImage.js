export default {
    namespaced: true,

    state: {
        image: null,
        imageCover: false,
        // x: null,
        // y: null,
        // width: null,
        // height: null,
        // rotate: 0,
    },

    getters: {

    },

    mutations: {
        setUploadedImage (state, image) {
            state.image = image;
        },

        setSize (state, { width, height }) {
            state.width = width;
            state.height = height;
        },

        setPosition (state, { x, y }) {
            state.x = x;
            state.y = y;
        },

        setImageCover (state, { imageCover }) {
            state.imageCover = imageCover
        },
    },

    actions: {
        setUploadedImage ({ commit }, image) {
            commit('setUploadedImage', image)
        },

        setSize ({ commit }, { width, height}) {
            commit('setSize', {width, height });
        },

        setPosition ({ commit }, { x, y }) {
            commit('setPosition', { x, y });
        },

        changeImageCover ({ state, commit }) {
            let imageCover = !state.imageCover;
            commit('setImageCover', { imageCover })
        }
    }
}