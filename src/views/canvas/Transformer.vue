<template>
    <v-transformer ref="transformer"
                   :config="{
                   borderStroke: '#6C60FF',
                   anchorStroke: '#6C60FF',
                   // anchorCornerRadius: 10,
                   anchorSize: 10,
                   rotateEnabled: false,
                   boundBoxFunc: boundBoxFunc,
                   enabledAnchors: ['middle-right', 'bottom-center', 'bottom-right'],
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
                transformerNode: null,
                minTransformSize: 20,
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'setSelectedLayer',
            ]),

            transformerSelect(layer) {
                this.setSelectedLayer(layer);
            },

            transformerDeselect() {
                this.setSelectedLayer(null);
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
                    this.transformerSelect(layer);
                } else {
                    this.transformerDeselect();
                }
            },

            updateTransformer() {
                // here we need to manually attach or detach Transformer node
                // const transformerNode = this.$refs.transformer.getNode();
                const stage = this.transformerNode.getStage();

                let selectedNode;

                if (this.selectedLayer) {
                    selectedNode = stage.findOne('#' + this.selectedLayer.id);
                }
                else {
                    selectedNode = null;
                }

                // do nothing if selected node is already attached
                if (selectedNode === this.transformerNode.node()) {
                    return;
                }

                if (selectedNode) {
                    // attach to another node
                    this.transformerNode.nodes([selectedNode]);
                } else {
                    // remove transformer
                    this.transformerNode.nodes([]);
                }

                this.transformerNode.getLayer().batchDraw();
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
            },

            forceUpdate () {
                // it is for update Transformer when the Layer size changing from the Settings Bar
                let t = setTimeout(() => {
                    this.transformerNode.forceUpdate();
                    this.transformerNode.getLayer().batchDraw();

                    clearTimeout(t);
                });
            },

        },

        created () {
            this.stageEventsBus.$on('handleStageMouseDown', this.handleStageMouseDown);
        },

        mounted () {
            this.transformerNode = this.$refs.transformer.getNode();
        },

        computed: {
            ...mapState('selectedLayer', [
                'selectedLayer',
            ]),

            ...mapGetters([
                'getLayerById'
            ]),

            ...mapGetters('selectedLayer', {
                selectedLayerWidth: 'width',
                selectedLayerHeight: 'height',
            }),

        },

        watch: {
            selectedLayer () {
                this.updateTransformer();
            },

            selectedLayerWidth () {
                this.forceUpdate();
            },

            selectedLayerHeight () {
                this.forceUpdate();
            },
        }
    }
</script>

<style scoped>

</style>