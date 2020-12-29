import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        elementsLastId: 0,
        uploadedImage: null,
        texts: []
    },

    getters: {
        findTextIndexById: (state) => (id) => {
            return state.texts.findIndex( (el) => el.id == id )
        },
    },

    mutations: {
        elementAdded(state) {
            state.elementsLastId++;
        },

        setUploadedImage(state, image) {
            state.uploadedImage = image;
        },

        addNewText(state, text) {
            let id = ++state.elementsLastId;

            state.texts.push({
                id: id,
                text: text
            });

            console.log(state.texts);
        },

        removeTextByIndex(state, index) {
            state.texts.splice(index, 1);
        }

    },

    actions: {
        removeText({ /*state,*/ getters, commit }, textId) {
            let indexInArray = getters.findTextIndexById(textId);

            commit('removeTextByIndex', indexInArray);
        }
    }
})