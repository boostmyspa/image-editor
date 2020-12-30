export default {
    namespaced: true,

    state: {
        uploadedImage: null,
    },

    getters: {

    },

    mutations: {
        setUploadedImage(state, image) {
            state.uploadedImage = image;
        },
    },

    actions: {
        setUploadedImage({ commit }, image) {
            commit('setUploadedImage', image)
        }
    }
}