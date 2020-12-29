<template>
    <div v-if="!uploadedImage">
        <p style="text-align: center">Upload Your Design</p>
    </div>
    <div v-else>
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="layer-main">
                <v-image :config="{ image: uploadedImage }"></v-image>
                <v-text v-for="text in texts" :key="text.id"
                        :config="{
                        x: stageConfig.width / 2,
                        y: text.id * 15,
                        text: text.value,
                        fontSize: 30,
                        fontFamily: 'Calibri',
                        fill: 'green',
                        draggable: true
                        }"
                ></v-text>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    // import Konva from 'konva';
    import { mapState,/* mapGetters, mapMutations*/ } from 'vuex';

    export default {
        name: "MainCanvas",
        data: () => {
            return {
                stageConfig: {
                    width: 500,
                    height: 500
                },
                isEmpty: true
            }
        },

        methods: {
            windowResize () {
                let container = document.querySelector('.canvas-container');
                console.log(container);
                this.stageConfig.width = container.offsetWidth;
                this.stageConfig.height = container.offsetHeight;
            },
        },

        computed: {
            ...mapState([
                'uploadedImage',
                'texts'
            ]),
            // ...mapState({
            //     uploadedImage: (state) => {
            //         return state.uploadedImage;
            //         // console.log()
            //     }
            // }),

            // ...mapGetters([
            //     '',
            // ])
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