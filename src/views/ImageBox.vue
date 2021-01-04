<template>
    <v-group
            :config="{
                   id: item.id,
                   name: 'imageBox elementBox',
                   x: item.x,
                   y: item.y,
                   width: item.width,
                   height: item.height,
                   draggable: true,
                   }"
            @dragend="changeImageBoxPosition"
            @transform="transforming"
    >
        <v-image
                v-if="item.image"
                :config="{
                       image: item.image,
                       x: imagePositionX,
                       y: imagePositionY,
                       width: imageSize.width,
                       height: imageSize.height,
                       offsetX: -item.width / 2,
                       offsetY: -item.height / 2
                       }"
        ></v-image>

        <v-rect :config="{
                        x: 0,
                        y: 0,
                        width: item.width,
                        height: item.height,
                        stroke: 'black',
                        strokeWidth: 1,
                        }"
        ></v-rect>
    </v-group>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "ImageBox",
        props: [
            'item'
        ],
        data: () => {
            return {
                rotation: 0,
                minTransformSize: 20
            }
        },
        methods: {
            ...mapActions('imageBox', [
                'changePosition',
                'transformed'
            ]),

            changeImageBoxPosition (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.changePosition({ item: this.item, position });
            },

            transforming (e) {
                const
                    target = e.target,
                    // stage = e.target.getStage(),
                    // transformer = stage.find('Transformer')[0],
                    newRotation = target.rotation();

                const isRotation = Math.abs(this.rotation - newRotation) > 0.01;

                if (isRotation) {
                    this.rotation = newRotation;
                }
                else {
                    let
                        // stopTransform = false,
                        width = target.width() * target.scaleX(),
                        height = target.height() * target.scaleY();


                    // the box minimum transformation size
                    // if (width < this.minTransformSize - 10) {
                    //     stopTransform = true;
                    //     width = this.minTransformSize + 2;
                    // }
                    //
                    // if (height < this.minTransformSize - 10) {
                    //     stopTransform = true;
                    //     height = this.minTransformSize + 2;
                    // }

                    this.transformed({ item: this.item, width, height });

                    // if (transformer && stopTransform) {
                    //     transformer.stopTransform();
                    //     transformer.forceUpdate();
                    //     stage.draw();
                    // }
                }

            }
        },

        computed: {
            imageSize () {
                if (!this.item.image) return;
                
                const
                    imgWidth = this.item.image.width,
                    imgHeight = this.item.image.height,
                    boxWidth = this.item.width,
                    boxHeight = this.item.height;

                let
                    size,
                    scale = Math.min(boxWidth / imgWidth, boxHeight / imgHeight);

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

                return size;
            },

            imagePositionX () {
                const hAlign = this.item.settings.hAlign;
                let x;

                switch (hAlign) {
                    case 'left':
                        x = -this.item.width / 2;
                        break;

                    case 'center':
                    default:
                        x = -this.imageSize.width / 2;
                        break;

                    case 'right':
                        x = this.item.width / 2 - this.imageSize.width;
                        break;
                }

                return x;
            },

            imagePositionY () {
                const vAlign = this.item.settings.vAlign;
                let y;

                switch (vAlign) {
                    case 'top':
                        y = -this.item.height / 2;
                        break;

                    case 'middle':
                    default:
                        y = -this.imageSize.height / 2;
                        break;

                    case 'bottom':
                        y = this.item.height / 2 - this.imageSize.height;
                        break;
                }

                return y;
            }
        }
    }
</script>

<style scoped>
    [type="file"] {
        max-width: 100%;
    }
</style>