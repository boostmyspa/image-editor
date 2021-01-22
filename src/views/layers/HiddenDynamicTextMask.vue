<template>
    <v-text ref="textMask" :config="{
                        x: 5000,
                        y: 0,
                        width: itemWidth,
                        height: itemHeight,
                        padding: 1,
                        text: itemText,
                        fontSize: +item.fontSize,
                        fontFamily: item.fontFamily,
                        lineHeight: 1,
                        align: item.hAlign,
                        verticalAlign: item.vAlign,
                        fill: 'transparent',
                        wrap: 'none',
                        }"
    ></v-text>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "HiddenDynamicTextMask",

        props: [
            'item'
        ],

        methods: {
            ...mapActions('selectedLayer', [
                'setFontSize',
            ]),

            calcFontSize () {
                let t = setTimeout( () => {
                    const textNode = this.$refs.textMask.getNode();
                    const textWidth = textNode.getTextWidth() + 5; // correction to do not lose the last char on width resize

                    let boxWidth = this.item.width;
                    let boxHeight = this.item.height;
                    let fontSize = this.item.fontSize;

                    let scale = Math.max(fontSize / boxHeight, textWidth / boxWidth);
                    let correctFontSize = Math.floor(fontSize / scale);

                    // height limits
                    correctFontSize = Math.max(10, Math.min(boxHeight, correctFontSize));

                    this.setFontSize(correctFontSize);

                    clearTimeout(t);
                });
            }
        },

        computed: {
            itemText () {
                this.calcFontSize();
                return this.item.text;
            },

            itemWidth () {
                this.calcFontSize();
                return this.item.width * 2;
            },

            itemHeight () {
                this.calcFontSize();
                return this.item.height;
            },
        },

    }
</script>

<style scoped>

</style>