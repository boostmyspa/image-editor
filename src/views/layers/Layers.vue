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
                <b>{{ layer.name }}: {{ layer.type }}</b>
                <layer-text v-if="layer.name == 'textBox'" :item="layer"></layer-text>
                <layer-image v-if="layer.name == 'imageBox'" :item="layer"></layer-image>
            </div>
        </draggable>

    </div>
</template>

<script>
    // !important: layers are rendered in the reverse order

    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import draggable from 'vuedraggable'; // https://github.com/SortableJS/Vue.Draggable
    import LayerText from './LayerText';
    import LayerImage from './LayerImage';

    export default {
        name: "InputLayers",
        components: {
            draggable,
            'layer-text': LayerText,
            'layer-image': LayerImage
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
                let imageItem = {
                    type: 'imageStatic'
                };

                this.addImageBox(imageItem);
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