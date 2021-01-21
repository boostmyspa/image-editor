<template>
    <v-image :config="{
                image: image,
                x: 0, // -imageSize.width / 2,
                y: 0, // -imageSize.height / 2,
                width: imageSize.width,
                height: imageSize.height,
                offsetX: 0, // -stageWidth / 2,
                offsetY: 0, // -stageHeight / 2,
                // rotate: 0,
                // draggable: true,
                // dragBoundFunc: dragBoundFunc
                }"
    ></v-image>
</template>

<script>
    import { mapState,/* mapGetters, mapMutations, mapActions*/ } from 'vuex';

    export default {
        name: "BackgroundBox",
        props: [
            'stageWidth',
            'stageHeight',
            // 'imageCover'
        ],

        data: () => {
           return {
               // imageCover: false,
           }
        },

        methods: {
            dragBoundFunc (pos) {
                const x = pos.x;
                const y = pos.y;

                // test all images size for Contain/Cover/Auto (add Auto?)

                let xMin = -this.stageWidth / 2;
                let xMax = this.stageWidth / 2 - this.imageSize.width;
                let yMin = -this.stageHeight / 2;
                let yMax = this.stageHeight / 2 - this.imageSize.height;

                let newX = Math.min(xMax, Math.max(x, xMin));
                let newY = Math.min(yMax, Math.max(y, yMin));

                return {
                    x: newX,
                    y: newY,
                };
           }
        },

        computed: {
            ...mapState('bgImage', [
                'image',
                'imageCover',
                // 'x',
                // 'y',
                // 'width',
                // 'height'
            ]),

            imageSize () {
                if (!this.image) return;

                const
                    imgWidth = this.image.width,
                    imgHeight = this.image.height,
                    boxWidth = this.stageWidth,
                    boxHeight = this.stageHeight;

                let
                    size,
                    scale = Math.min(boxWidth / imgWidth, boxHeight / imgHeight);

                if (this.imageCover) {
                    if (scale <= 1) {
                        size = {
                            width: imgWidth,
                            height: imgHeight
                        }
                    }
                    else {
                        size = {
                            width: imgWidth * scale,
                            height: imgHeight * scale
                        }
                    }
                }
                else {
                    if (scale >= 1) {
                        size = {
                            width: imgWidth,
                            height: imgHeight
                        }
                    }
                    else {
                        size = {
                            width: imgWidth * scale,
                            height: imgHeight * scale
                        }
                    }
                }


                return size;
            },
        }
    }
</script>

<style scoped>

</style>