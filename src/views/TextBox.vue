<template>
    <v-group
             :config="{
                   x: item.x,
                   y: item.y,
                   draggable: true
                   }"
             @dragend="changeTextBoxPosition"
    >
        <v-rect :config="{
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 30,
                        stroke: 'black',
                        strokeWidth: 1,
                        }"
        ></v-rect>
        <v-text :config="{
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 30,
                        padding: 5,
                        text: item.text,
                        fontSize: 30,
                        fontFamily: 'Calibri',
                        align: 'center',
                        fill: 'green'
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
            ]),

            changeTextBoxPosition (e) {
                let
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.changePosition({ item: this.item, newPosition: position });
            }
        },

        mounted () {

        }
    }
</script>

<style scoped>

</style>