<template>
    <div>
        <hr>
        <p>Add Items</p>
        <button @click="addNewTextBox">Add Text</button>
        | <button @click="addNewImageBox">Add Image</button>

        <hr>

        <div class="element-item" v-for="(el, index) in elements.slice().reverse()"
             :class="el.id == selectedElementId ? 'active' : ''"
             :key="el.id"
        >
            <b>{{ elements.length - index }}) {{ el.name }}</b>
            <text-input v-if="el.name == 'textBox'" :item="el"></text-input>
            <image-input v-if="el.name == 'imageBox'" :item="el"></image-input>
        </div>
    </div>
</template>

<script>
    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import TextInput from './TextInput';
    import ImageInput from './ImageInput';

    export default {
        name: "InputLayers",
        components: {
            'text-input': TextInput,
            'image-input': ImageInput
        },

        methods: {
            ...mapActions('textBox', {
                addTextBox: 'add',
            }),

            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),

            addNewTextBox () {
                let textBox = {
                    // value: '',
                    // x: this.canvasMainConfig.width / 2,
                    // y: 30,
                    // width: 300,
                    // height: 80,
                    // rotate: 0
                };

                this.addTextBox(textBox);
            },

            addNewImageBox () {
                this.addImageBox();
            },
        },

        computed: {
            ...mapState([
                'elements',
                'selectedElementId'
            ]),
        }
    }
</script>

<style scoped>
    .element-item {
        margin: 0 0 10px;
        padding: 0 0 10px;
        border-bottom: 1px solid;
    }

    .element-item.active {
        background: #ccc;
    }
</style>