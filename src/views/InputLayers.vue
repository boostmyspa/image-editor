<template>
    <div>
        <hr>
        <p>Add Items</p>
        <button @click="addNewTextBox">Add Text</button>
        | <button @click="addNewImageBox">Add Image</button>

        <hr>

        <draggable class="element-item-list" v-model="inputLayersList" :move="move" @end="dragElementEnd">
            <div class="element-item" v-for="(el) in elements.slice().reverse()"
                 draggable="true"
                 :class="el.id == selectedElementId ? 'active' : ''"
                 :key="el.id"
                 @click="selectLayer(el.id)"
            >
                <b>{{ el.name }}</b>
                <text-input v-if="el.name == 'textBox'" :item="el"></text-input>
                <image-input v-if="el.name == 'imageBox'" :item="el"></image-input>
            </div>
        </draggable>

    </div>
</template>

<script>
    // !important: elements are rendered in the reverse order

    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import draggable from 'vuedraggable'; // https://github.com/SortableJS/Vue.Draggable
    import TextInput from './TextInput';
    import ImageInput from './ImageInput';

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
                'changeSelectedElementId',
                'replaceElementInOrder'
            ]),

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

            selectLayer (id) {
                this.changeSelectedElementId(id);
            },

            reverseElementIndex(array, index) {
                return array.length - index - 1;
            },

            dragElementEnd (e) {
                const fromPosition = this.reverseElementIndex(this.elements, e.oldIndex);
                const toPosition = this.reverseElementIndex(this.elements, e.newIndex);
                
                this.replaceElementInOrder({ from: fromPosition, to: toPosition});
            },

            move (e) {
                console.log('---- move');
                console.log("Future index: " + e.draggedContext.futureIndex);
            }
        },

        computed: {
            ...mapState([
                'elements',
                'selectedElementId'
            ]),

            inputLayersList: {
                get() {
                    return this.elements
                },
                set() {

                }
            }
        }
    }
</script>

<style scoped>
    .element-item {
        padding: 10px 0;
        border-bottom: 1px solid;
    }

    .element-item.active {
        background: #ccc;
    }
</style>