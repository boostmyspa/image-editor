<template>
    <div class="layers-settings-bar">
        <bar-add-layer class="layers-settings-bar--group"></bar-add-layer>

        <div v-if="selectedLayer" class="layers-settings-bar--group">
            <bar-layer-duplicate></bar-layer-duplicate>
        </div>

        <bar-layer-transform v-if="selectedLayer" class="layers-settings-bar--group"></bar-layer-transform>

        <bar-layer-align v-if="selectedLayer" class="layers-settings-bar--group"></bar-layer-align>

        <div v-if="layerIsTextBox" class="layers-settings-bar--group">
            <bar-layer-color></bar-layer-color>

            <label class="layers-settings-bar--label ml-1">Font:</label>
            <bar-layer-font-size v-if="!layerIsDynamicText"></bar-layer-font-size>

            <bar-layer-font-family></bar-layer-font-family>
        </div>
    </div>
</template>

<script>
    import { mapState, /*mapGetters, mapActions*/ } from 'vuex';
    import BarAddLayer from './BarAddLayer';
    import BarLayerDuplicate from './BarLayerDuplicate';
    import BarLayerTransform from './BarLayerTransform';
    import BarLayerAlign from './BarLayerAlign';
    import BarLayerColor from './BarLayerColor';
    import BarLayerFontSize from './BarLayerFontSize';
    import BarLayerFontFamily from './BarLayerFontFamily';

    export default {
        name: "AddLayersButtons",

        components: {
            'bar-add-layer': BarAddLayer,
            'bar-layer-duplicate': BarLayerDuplicate,
            'bar-layer-transform': BarLayerTransform,
            'bar-layer-align': BarLayerAlign,
            'bar-layer-color': BarLayerColor,
            'bar-layer-font-size': BarLayerFontSize,
            'bar-layer-font-family': BarLayerFontFamily,
        },

        methods: {

        },

        computed: {
            ...mapState('selectedLayer', [
                'selectedLayer',
            ]),

            layerIsTextBox () {
                return this.selectedLayer && this.selectedLayer.name == 'textBox';
            },

            layerIsDynamicText () {
                return this.selectedLayer && this.selectedLayer.type == 'textDynamic'
            },
        },
    }
</script>

<style scoped>

</style>