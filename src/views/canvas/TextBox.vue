<template>
    <v-group
             :config="{
                   id: item.id,
                   name: 'textBox layerBox',
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
        <v-text :config="{
                        x: 0,
                        y: 0,
                        width: item.width,
                        height: item.height,
                        padding: 1,
                        text: item.text,
                        fontSize: +item.fontSize,
                        fontFamily: textFontFamily,
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
    import { /*mapState,*/ mapActions } from 'vuex';

    export default {
        name: "TextBox",
        props: [
            'item',
        ],
        data: () => {
            return {
                rotation: 0,
                dragStartPositionX: 0,
                dragStartPositionY: 0,
                isDragging: false,
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'changePosition',
                'changeSize',
                'setFontFamily',
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

                this.changeTextBoxPosition(position);
            },

            dragEnd (e) {
                const
                    textBoxNode = e.target,
                    position = textBoxNode.position();

                this.isDragging = false;
                this.changeTextBoxPosition(position);
            },

            changeTextBoxPosition (position) {
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

            },

            transformEnd () {

            },

            checkFontFamilyIsLoaded (currentFont, previousFont, attemptCount) {
                const fontFamily = currentFont || this.item.fontFamily;

                const FONT_INITIAL = `20px ${fontFamily}`;
                let fontIsLoaded = document.fonts.check(FONT_INITIAL);

                if (!attemptCount) {
                    attemptCount = 0;
                }

                if (!fontIsLoaded) {
                    if (previousFont) {
                        // set back the previousFont before the currentFont finishes loading
                        this.setFontFamily(previousFont);
                    }

                    let t = setTimeout( () => {
                        this.checkFontFamilyIsLoaded(currentFont, previousFont, ++attemptCount);

                        clearTimeout(t);
                    }, 100);
                }
                else if (attemptCount) {
                    // if 'attemptCount' is undefined and 'fontIsLoaded' is true - font was preLoaded before render
                    // but if 'attemptCount' was increased - font was loaded right now and Layer should be reDraw

                    this.setFontFamily(fontFamily);
                }
            },
        },

        computed: {
            groupPositionX () {
                return this.isDragging ? this.dragStartPositionX : this.item.x;
            },

            groupPositionY () {
                return this.isDragging ? this.dragStartPositionY : this.item.y;
            },

            textLineHeight () {
                return this.isDynamicText ? 1 : +this.item.lineHeight;
            },

            textFontFamily () {
                return this.item.fontFamily;
            },

            textWrap () {
                return this.isDynamicText ? 'none' : 'word';
            },

            isDynamicText () {
                return this.item.type == 'textDynamic';
            },
        },

        watch: {
            textFontFamily (currentFont, previousFont) {
                this.checkFontFamilyIsLoaded(currentFont, previousFont);
            },
        },

        mounted () {
            this.checkFontFamilyIsLoaded();
        }

    }
</script>

<style scoped>

</style>