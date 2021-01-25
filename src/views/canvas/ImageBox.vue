<template>
    <v-group
            :config="{
                   id: item.id,
                   name: 'imageBox layerBox',
                   x: groupPositionX,
                   y: groupPositionY,
                   width: item.width,
                   height: item.height,
                   draggable: true,
                   }"
            @dragstart="dragStart"
            @dragmove="dragMove"
            @dragend="dragEnd"
            @transform="transforming"
            @transformend="transformEnd"
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
                        strokeScaleEnabled: false,
                        }"
        ></v-rect>
    </v-group>
</template>

<script>
    // import throttle from '../../util/throttle';
    import LoadImage from '../../util/loadImage';
    import { mapActions } from 'vuex';

    export default {
        name: "ImageBox",
        props: [
            'item'
        ],
        data: () => {
            return {
                rotation: 0,
                minTransformSize: 20,
                dragStartPositionX: 0,
                dragStartPositionY: 0,
                isDragging: false,
            }
        },
        methods: {
            ...mapActions('selectedLayer', [
                'changeImage',
                'changePosition',
                'changeSize',
            ]),

            dragStart (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.dragStartPositionX = position.x;
                this.dragStartPositionY = position.y;
                this.isDragging = true;
            },

            dragMove (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.changeImageBoxPosition(position);
            },

            dragEnd (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.isDragging = false;
                this.changeImageBoxPosition(position);
            },

            changeImageBoxPosition (position) {
                this.changePosition(position);
            },

            // transformPosition ({ x, y, width, height }) {
            //     // x, y - current (new) transformer position
            //     // width, height - current (new) transformer size
            //
            //     const diffX = x - this.item.x;
            //     const diffY = Math.abs(y - this.item.y);
            //
            //     // init defaults
            //     let newX = this.item.x;
            //     let newY = this.item.y;
            //
            //     if (Math.round(Math.abs(diffX)) > 1) {
            //         console.log(1212213);
            //     }
            //
            //     if (Math.round(diffY) > 1) {
            //         console.log(1212213);
            //     }
            // },

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

                    // const newX = target.x();
                    // const newY = target.y();

                    // change position on transform
                    // this.transformPosition({ x: newX, y: newY, width, height });


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

                    const size = {
                        width: width,
                        height: height
                    };

                    this.changeSize(size);

                    // if (transformer && stopTransform) {
                    //     transformer.stopTransform();
                    //     transformer.forceUpdate();
                    //     stage.draw();
                    // }
                }

            },

            transformEnd () {

            }
        },

        computed: {
            // throttleTransforming (e) {
            //     let DELAY = 1000;
            //     return throttle(this.transforming.bind(e), DELAY);
            // },

            groupPositionX () {
               return this.isDragging ? this.dragStartPositionX : this.item.x;
            },

            groupPositionY () {
                return this.isDragging ? this.dragStartPositionY : this.item.y;
            },

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
                    };
                }

                return size;
            },

            imagePositionX () {
                const hAlign = this.item.hAlign;
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
                const vAlign = this.item.vAlign;
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
        },

        beforeMount () {
            const
                imageSrc = this.item.src,
                itemImage = this.item.image;

            if (imageSrc && !itemImage) {
                LoadImage(
                    (image) => {
                        this.changeImage(image);
                    },
                    imageSrc
                );
            }
        }
    }
</script>

<style scoped>

</style>