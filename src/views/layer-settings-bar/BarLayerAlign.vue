<template>
    <div class="layers-settings-bar--align">
        <button class="current-align-btn btn-icon-wrap" title="Align">
            <i class="icon-align"
               :class="'icon-align-' + hAlign"
            ></i>
        </button>

        <div class="layers-settings-bar--align--choices">
            <div class="layers-settings-bar--align--choices-row">
                <button class="btn-icon-wrap" title="Align" @click.left="setTopLeft" :class="topLeft ? 'active' : ''">
                    <i class="icon-align icon-align-left"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setTopCenter" :class="topCenter ? 'active' : ''">
                    <i class="icon-align icon-align-center"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setTopRight" :class="topRight ? 'active' : ''">
                    <i class="icon-align icon-align-right"></i>
                </button>
            </div>

            <div class="layers-settings-bar--align--choices-row">
                <button class="btn-icon-wrap" title="Align" @click.left="setMiddleLeft" :class="middleLeft ? 'active' : ''">
                    <i class="icon-align icon-align-left"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setMiddleCenter" :class="middleCenter ? 'active' : ''">
                    <i class="icon-align icon-align-center"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setMiddleRight" :class="middleRight ? 'active' : ''">
                    <i class="icon-align icon-align-right"></i>
                </button>
            </div>

            <div class="layers-settings-bar--align--choices-row">
                <button class="btn-icon-wrap" title="Align" @click.left="setBottomLeft" :class="bottomLeft ? 'active' : ''">
                    <i class="icon-align icon-align-left"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setBottomCenter" :class="bottomCenter ? 'active' : ''">
                    <i class="icon-align icon-align-center"></i>
                </button>
                <button class="btn-icon-wrap" title="Align" @click.left="setBottomRight" :class="bottomRight ? 'active' : ''">
                    <i class="icon-align icon-align-right"></i>
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    import { /*mapState,*/ mapGetters, mapActions } from 'vuex';

    export default {
        name: "BarLayerAlign",

        data: () => {
            return {
                hAlignSetting: 'center',
                vAlignSetting: 'middle',
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'changeAlign'
            ]),

            setAlign () {
                const align = {
                    hAlign: this.hAlignSetting,
                    vAlign: this.vAlignSetting,
                };

                this.changeAlign(align);
            },

            setTopLeft () {
                this.vAlignSetting = 'top';
                this.hAlignSetting = 'left';
                this.setAlign();
            },

            setTopCenter () {
                this.vAlignSetting = 'top';
                this.hAlignSetting = 'center';
                this.setAlign();
            },

            setTopRight () {
                this.vAlignSetting = 'top';
                this.hAlignSetting = 'right';
                this.setAlign();
            },

            setMiddleLeft () {
                this.vAlignSetting = 'middle';
                this.hAlignSetting = 'left';
                this.setAlign();
            },

            setMiddleCenter () {
                this.vAlignSetting = 'middle';
                this.hAlignSetting = 'center';
                this.setAlign();
            },

            setMiddleRight () {
                this.vAlignSetting = 'middle';
                this.hAlignSetting = 'right';
                this.setAlign();
            },

            setBottomLeft () {
                this.vAlignSetting = 'bottom';
                this.hAlignSetting = 'left';
                this.setAlign();
            },

            setBottomCenter () {
                this.vAlignSetting = 'bottom';
                this.hAlignSetting = 'center';
                this.setAlign();
            },

            setBottomRight () {
                this.vAlignSetting = 'bottom';
                this.hAlignSetting = 'right';
                this.setAlign();
            },
        },

        computed: {
            ...mapGetters('selectedLayer', [
                'hAlign',
                'vAlign',
            ]),

            topLeft () {
                return this.vAlign == 'top' && this.hAlign == 'left';
            },

            topCenter () {
                return this.vAlign == 'top' && this.hAlign == 'center';
            },

            topRight () {
                return this.vAlign == 'top' && this.hAlign == 'right';
            },

            middleLeft () {
                return this.vAlign == 'middle' && this.hAlign == 'left';
            },

            middleCenter () {
                return this.vAlign == 'middle' && this.hAlign == 'center';
            },

            middleRight () {
                return this.vAlign == 'middle' && this.hAlign == 'right';
            },

            bottomLeft () {
                return this.vAlign == 'bottom' && this.hAlign == 'left';
            },

            bottomCenter () {
                return this.vAlign == 'bottom' && this.hAlign == 'center';
            },

            bottomRight () {
                return this.vAlign == 'bottom' && this.hAlign == 'right';
            },
        },

    }
</script>

<style scoped>

</style>