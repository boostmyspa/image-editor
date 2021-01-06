<template>
    <upload-background-layer v-if="!uploadedImage" :dragUploadEnable="true">
        <p style="text-align: center">
            Drag Your Design Here
        </p>
    </upload-background-layer>

    <upload-image-box-layer v-else>
        <v-stage ref="stage"
                 :config="stageConfig"
                 @mousedown="handleStageMouseDown"
        >
            <v-layer ref="layer-main">
                <v-image :config="{ image: uploadedImage }"></v-image>

                <template v-for="el in elements">
                    <text-box v-if="el.name == 'textBox'" :item="el" :key="el.id"></text-box>
                    <image-box v-else-if="el.name == 'imageBox'" :item="el" :key="el.id"></image-box>
                </template>

                <transformer :stageEventsBus="stageEventsBus"></transformer>
            </v-layer>
        </v-stage>
    </upload-image-box-layer>
</template>

<script>
    // import Konva from 'konva';
    import Vue from 'vue';
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';
    import uploadBackgroundLayer from './uploadBackgroundLayer';
    import uploadImageBoxLayer from './uploadImageBoxLayer';
    import TextBox from './TextBox';
    import ImageBox from './ImageBox';
    import Transformer from './Transformer';

    export default {
        name: "MainCanvas",
        components: {
            'upload-background-layer': uploadBackgroundLayer,
            'upload-image-box-layer': uploadImageBoxLayer,
            'text-box': TextBox,
            'image-box': ImageBox,
            'transformer': Transformer
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
            ...mapState('bgImage', [
                'uploadedImage'
            ]),

            ...mapState([
                'elements'
            ]),
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