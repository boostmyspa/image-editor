<template>
    <v-transformer ref="transformer"
                   :config="{
                   rotateEnabled: false,
                   boundBoxFunc: boundBoxFunc
                   }"
    ></v-transformer>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        name: "Transformer",
        props: [
            'stageEventsBus'
        ],

        data: () => {
            return {
                minTransformSize: 20
            }
        },

        methods: {
            ...mapActions([
                'setSelectedLayerId',
            ]),

            transformerSelect(id) {
                this.setSelectedLayerId(id);
            },

            transformerDeselect() {
                this.setSelectedLayerId(null);
            },

            handleStageMouseDown(e) {
                const target = e.target;

                // clicked on stage - clear selection
                if (target === target.getStage()) {
                    this.transformerDeselect();
                    return;
                }

                // clicked on transformer - do nothing
                const clickedOnTransformer =
                    target.getParent().className === 'Transformer';
                if (clickedOnTransformer) {
                    return;
                }

                // find clicked layer by its name
                const layerBox = target.findAncestor('.layerBox', true);

                if (!layerBox) {
                    this.transformerDeselect();
                    return;
                }

                const id = layerBox.id();
                const layer = this.getLayerById(id);

                if (layer) {
                    this.transformerSelect(id);
                } else {
                    this.transformerDeselect();
                }
            },

            updateTransformer() {
                // here we need to manually attach or detach Transformer node
                const transformerNode = this.$refs.transformer.getNode();
                const stage = transformerNode.getStage();

                const selectedNode = stage.findOne('#' + this.selectedLayerId);

                // do nothing if selected node is already attached
                if (selectedNode === transformerNode.node()) {
                    return;
                }

                if (selectedNode) {
                    // attach to another node
                    transformerNode.nodes([selectedNode]);
                } else {
                    // remove transformer
                    transformerNode.nodes([]);
                }
                transformerNode.getLayer().batchDraw();
            },

            boundBoxFunc(oldBox, newBox) {
                if (newBox.width < this.minTransformSize) {
                    newBox.width = this.minTransformSize;
                    return newBox;
                }
                if (newBox.height < this.minTransformSize) {
                    newBox.height = this.minTransformSize;
                    return newBox;
                }
                return newBox;
            }
        },

        created () {
            this.stageEventsBus.$on('handleStageMouseDown', this.handleStageMouseDown)
        },

        computed: {
            ...mapGetters([
                'getLayerById'
            ]),

            ...mapState([
                'selectedLayerId'
            ]),
        },

        watch: {
            selectedLayerId() {
                this.updateTransformer();
            }
        }
    }
</script>

<style scoped>

</style>