<template>
    <div class="layers-settings-bar">
        <bar-add-layer class="layers-settings-bar--group"></bar-add-layer>

        <div v-if="selectedLayer" class="layers-settings-bar--group">
            <bar-layer-duplicate></bar-layer-duplicate>
        </div>

        <bar-layer-transform v-if="selectedLayer" class="layers-settings-bar--group"></bar-layer-transform>

        <bar-layer-align v-if="selectedLayer" class="layers-settings-bar--group"></bar-layer-align>

        <div v-if="selectedLayer && selectedLayer.name == 'textBox'" class="layers-settings-bar--group">
            <bar-layer-color></bar-layer-color>

            <bar-layer-font-size></bar-layer-font-size>

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
        },
    }
</script>

<style scoped>

</style>