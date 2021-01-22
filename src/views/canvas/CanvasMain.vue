<template>
    <upload-image-to-canvas v-if="!uploadedImage" :specifiedGalleryRootId="'Backgrounds'" :dragUploadEnable="true">
        <p style="text-align: center">
            Drag Your Design Here
        </p>
    </upload-image-to-canvas>

    <upload-image-to-canvas v-else :multiple="true" :dragUploadEnable="true">
        <v-stage ref="stage"
                 :config="stageConfig"
                 @mousedown="handleStageMouseDown"
        >
            <v-layer ref="layer-main">
                <hidden-dynamic-text-mask v-if="showHiddenDynamicTextMask" :item="selectedLayer"></hidden-dynamic-text-mask>

                <background-box
                        :stageWidth="stageConfig.width"
                        :stageHeight="stageConfig.height"
                ></background-box>

                <template v-for="layer in layers">
                    <text-box v-if="layer.name == 'textBox'" :item="layer" :key="layer.id"></text-box>
                    <image-box v-else-if="layer.name == 'imageBox'" :item="layer" :key="layer.id"></image-box>
                </template>

                <transformer :stageEventsBus="stageEventsBus"></transformer>
            </v-layer>
        </v-stage>
    </upload-image-to-canvas>
</template>

<script>
    // import Konva from 'konva';
    import Vue from 'vue';
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';
    import UploadImageToCanvas from '../uploader/UploadImageToCanvas';
    import BackgroundBox from './BackgroundBox';
    import TextBox from './TextBox';
    import ImageBox from './ImageBox';
    import Transformer from './Transformer';
    import HiddenDynamicTextMask from '../layers/HiddenDynamicTextMask';

    export default {
        name: "MainCanvas",
        components: {
            'upload-image-to-canvas': UploadImageToCanvas,
            'background-box': BackgroundBox,
            'text-box': TextBox,
            'image-box': ImageBox,
            'transformer': Transformer,
            'hidden-dynamic-text-mask': HiddenDynamicTextMask,
        },
        props: [
            'stageConfig'
        ],

        data: () => {
            return {
                selectedShapeId: '',
                stageEventsBus: new Vue()
            }
        },

        methods: {
            windowResize () {
                const container = document.getElementById('canvas-container');

                this.$emit('stageSizeChange', {
                    width: container.offsetWidth,
                    height: container.offsetHeight
                })
            },

            handleStageMouseDown (event) {
                this.stageEventsBus.$emit('handleStageMouseDown', event);
            }
        },

        computed: {
            ...mapState([
                'layers'
            ]),

            ...mapState('bgImage', {
                uploadedImage: 'image'
            }),

            ...mapState('selectedLayer', [
                'selectedLayer'
            ]),

            showHiddenDynamicTextMask () {
                return this.selectedLayer && this.selectedLayer.type == 'textDynamic';
            }
        },

        created() {
            window.addEventListener("resize", this.windowResize);
        },

        destroyed() {
            window.removeEventListener("resize", this.windowResize);
        },

        mounted() {
            this.windowResize();
        },
    }
</script>

<style scoped>

</style>