<template>
    <draggable class="layers-list" v-model="inputLayersList" :move="move" @end="dragLayerEnd">
        <template v-for="layer in layers.slice().reverse()">
            <layer-text v-if="layer.name == 'textBox'"
                        draggable="true"
                        :item="layer"
                        :class="layer.id == selectedLayerId ? 'active' : ''"
                        :key="layer.id"
                        @selectLayer="selectLayer"
            ></layer-text>
            <layer-image v-if="layer.name == 'imageBox'"
                         draggable="true"
                         :item="layer"
                         :class="layer.id == selectedLayerId ? 'active' : ''"
                         :key="layer.id"
                         @selectLayer="selectLayer"
            ></layer-image>
        </template>
    </draggable>
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
                'replaceLayerInOrder'
            ]),

            ...mapActions('selectedLayer', [
                'setSelectedLayer',
            ]),

            selectLayer (layer) {
                this.setSelectedLayer(layer);
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
            ]),

            ...mapState('selectedLayer', [
                'selectedLayer'
            ]),

            selectedLayerId () {
                return this.selectedLayer && this.selectedLayer.id;
            },

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