<template>
    <v-group
             :config="{
                   id: item.id,
                   name: 'textBox elementBox',
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
                        fontSize: +item.settings.fontSize,
                        fontFamily: item.settings.fontFamily,
                        align: item.settings.hAlign,
                        verticalAlign: item.settings.vAlign,
                        fill: item.settings.fill,
                        // wrap: 'none',
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
            'item'
        ],
        data: () => {
            return {
                rotation: 0
            }
        },

        methods: {
            ...mapActions('textBox', [
                'changePosition',
                'transformed'
            ]),

            changeTextBoxPosition (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.changePosition({ item: this.item, position });
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

                    this.transformed({ item: this.item, width, height });
                }

            }
        },

        computed: {

        },

        mounted () {

        }
    }
</script>

<style scoped>

</style>