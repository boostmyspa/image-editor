<template>
    <v-transformer ref="transformer"
                   :config="{
                   rotateEnabled: false
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

            }
        },

        methods: {
            ...mapActions([
                'changeSelectedElementId',
            ]),

            transformerSelect(id) {
                this.changeSelectedElementId(id);
            },

            transformerDeselect() {
                this.changeSelectedElementId(null);
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

                // find clicked element by its name
                const elementBox = target.findAncestor('.elementBox', true);

                if (!elementBox) {
                    this.transformerDeselect();
                    return;
                }

                const id = elementBox.id();
                const element = this.getElementById(id);

                if (element) {
                    this.transformerSelect(id);
                } else {
                    this.transformerDeselect();
                }
            },

            updateTransformer() {
                // here we need to manually attach or detach Transformer node
                const transformerNode = this.$refs.transformer.getNode();
                const stage = transformerNode.getStage();

                const selectedNode = stage.findOne('#' + this.selectedElementId);

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
        },

        created () {
            this.stageEventsBus.$on('handleStageMouseDown', this.handleStageMouseDown)
        },

        computed: {
            ...mapGetters([
                'getElementById'
            ]),

            ...mapState([
                'selectedElementId'
            ]),
        },

        watch: {
            selectedElementId() {
                this.updateTransformer();
            }
        }
    }
</script>

<style scoped>

</style>