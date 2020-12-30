<template>
    <div v-if="!uploadedImage">
        <p style="text-align: center">Upload Your Design</p>
    </div>
    <div v-else>
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="layer-main">
                <v-image :config="{ image: uploadedImage }"></v-image>

                <template v-for="text in elements">
                    <text-box v-if="text.name == 'text'" :item="text" :key="text.id"></text-box>
                </template>

            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    // import Konva from 'konva';
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';
    import TextBox from './TextBox';

    export default {
        name: "MainCanvas",
        components: {
            'text-box': TextBox
        },
        props: [
            'stageConfig'
        ],

        data: () => {
            return {
                isEmpty: true
            }
        },

        methods: {
            windowResize () {
                let container = document.querySelector('.canvas-container');

                this.$emit('stageSizeChange', {
                    width: container.offsetWidth,
                    height: container.offsetHeight
                })
            },
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