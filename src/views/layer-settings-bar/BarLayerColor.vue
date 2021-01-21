<template>
    <div class="layers-settings-bar--color-picker">
        <button class="btn-icon-wrap">
            <i class="layers-settings-bar--color-picker--icon" :style="'background: ' + fill + ';'"></i>
        </button>
        <color-picker :value='fill' @input='fillChange' class="layers-settings-bar--color-picker--select"
                      :disableAlpha='true'
        ></color-picker>
    </div>
</template>

<script>
    import ColorPicker from 'vue-color/src/components/Chrome.vue'; // https://www.npmjs.com/package/vue-color
    import {/* mapState,*/ mapGetters, mapActions } from 'vuex';

    export default {
        name: "BarLayerColor",
        components: {
            'color-picker': ColorPicker
        },

        methods: {
            ...mapActions('selectedLayer', [
                'changeFill',
            ]),

            fillChange (e) {
                const fillColor = e.hex; // color in "hex" format

                this.changeFill(fillColor);
            },

        },

        computed: {
            ...mapGetters('selectedLayer', [
                'fill',
            ]),
        }
    }
</script>

<style scoped>

</style>