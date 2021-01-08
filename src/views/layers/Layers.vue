<template>
    <div>
        <hr>
        <p>Add Items</p>
        <button @click="addNewTextBox">Add Text</button>
        | <button @click="addNewImageBox">Add Image</button>

        <hr>

        <draggable class="layer-item-list" v-model="inputLayersList" :move="move" @end="dragLayerEnd">
            <div class="layer-item" v-for="layer in layers.slice().reverse()"
                 draggable="true"
                 :class="layer.id == selectedLayerId ? 'active' : ''"
                 :key="layer.id"
                 @click="selectLayer(layer.id)"
            >
                <b>{{ layer.name }}</b>
                <text-input v-if="layer.name == 'textBox'" :item="layer"></text-input>
                <image-input v-if="layer.name == 'imageBox'" :item="layer"></image-input>
            </div>
        </draggable>

    </div>
</template>

<script>
    // !important: layers are rendered in the reverse order

    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import draggable from 'vuedraggable'; // https://github.com/SortableJS/Vue.Draggable
    import TextInput from './TextLayer';
    import ImageInput from './ImageLayer';

    export default {
        name: "InputLayers",
        components: {
            draggable,
            'text-input': TextInput,
            'image-input': ImageInput
        },

        data: () => {
           return {
               
           }
        },

        methods: {
            ...mapActions([
                'setSelectedLayerId',
                'replaceLayerInOrder'
            ]),

            ...mapActions('textBox', {
                addTextBox: 'add',
            }),

            ...mapActions('imageBox', {
                addImageBox: 'add',
            }),

            addNewTextBox () {
                this.addTextBox();
            },

            addNewImageBox () {
                this.addImageBox();
            },

            selectLayer (id) {
                this.setSelectedLayerId(id);
            },

            reverseLayerIndex(array, index) {
                return array.length - index - 1;
            },

            dragLayerEnd (e) {
                const fromPosition = this.reverseLayerIndex(this.layers, e.oldIndex);
                const toPosition = this.reverseLayerIndex(this.layers, e.newIndex);
                
                this.replaceLayerInOrder({ from: fromPosition, to: toPosition});
            },

            move (e) {
                console.log('---- move');
                console.log("Future index: " + e.draggedContext.futureIndex);
            }
        },

        computed: {
            ...mapState([
                'layers',
                'selectedLayerId'
            ]),

            inputLayersList: {
                get() {
                    return this.layers
                },
                set() {

                }
            }
        }
    }
</script>

<style scoped>
    .layer-item {
        padding: 10px 0;
        border-bottom: 1px solid;
    }

    .layer-item.active {
        background: #ccc;
    }
</style>