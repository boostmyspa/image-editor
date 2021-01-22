<template>
    <v-group
             :config="{
                   id: item.id,
                   name: 'textBox layerBox',
                   x: item.x,
                   y: item.y,
                   width: item.width,
                   height: item.height,
                   draggable: true,
                   }"
             @dragend="changeTextBoxPosition"
             @transform="transforming"
    >
        <v-text :config="{
                        x: 0,
                        y: 0,
                        width: item.width,
                        height: item.height,
                        padding: 1,
                        text: item.text,
                        fontSize: +item.fontSize,
                        fontFamily: item.fontFamily,
                        lineHeight: textLineHeight,
                        align: item.hAlign,
                        verticalAlign: item.vAlign,
                        fill: item.fill,
                        wrap: textWrap,
                        }"
        ></v-text>

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
    import { mapActions } from 'vuex';

    export default {
        name: "TextBox",
        props: [
            'item',
        ],
        data: () => {
            return {
                rotation: 0,
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'changePosition',
                'changeSize',
            ]),

            changeTextBoxPosition (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.changePosition(position);
            },

            transforming (e) {
                const
                    target = e.target,
                    newRotation = target.rotation();

                const isRotation = Math.abs(this.rotation - newRotation) > 0.01;

                if (isRotation) {
                    this.rotation = newRotation;
                }
                else {
                    let
                        width = target.width() * target.scaleX(),
                        height = target.height() * target.scaleY();

                    const size = {
                        width: width,
                        height: height
                    };

                    this.changeSize(size);
                }

            }
        },

        computed: {
            textLineHeight () {
                return this.isDynamicText ? 1 : +this.item.lineHeight;
            },

            textWrap () {
                return this.isDynamicText ? 'none' : 'word';
            },

            isDynamicText () {
                return this.item.type == 'textDynamic';
            },
        },

    }
</script>

<style scoped>

</style>