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
        <v-rect :config="{
                        x: 0,
                        y: 0,
                        width: item.width,
                        height: item.height,
                        stroke: 'black',
                        strokeWidth: 1,
                        }"
        ></v-rect>
        <v-text :config="{
                        x: 0,
                        y: 0,
                        width: item.width,
                        height: item.height,
                        // padding: 5,
                        text: item.text,
                        fontSize: 30,
                        fontFamily: 'Calibri',
                        align: 'center',
                        fill: 'green',
                        wrap: 'none',
                        }"
        ></v-text>
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

                this.changePosition({ item: this.item, newPosition: position });
            },

            transforming (e) {
                const
                    target = e.target,
                    width = target.width() * target.scaleX(),
                    height = target.height() * target.scaleY();

                this.transformed({ item: this.item, width, height });
            }
        },

        mounted () {

        }
    }
</script>

<style scoped>

</style>