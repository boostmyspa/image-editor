<template>
    <div class="layers-settings-bar--font-size">
        <label for="settings-font-size" class="layers-settings-bar--label ml-1">Font:</label>
        <input id="settings-font-size"
               type="number"
               class="layers-settings-bar--input"
               :value="fontSize"
               @input="fontSizeChange"
        >
        <label for="settings-font-size" class="layers-settings-bar--label">px</label>
    </div>
</template>

<script>
    import {/* mapState,*/ mapGetters, mapActions } from 'vuex';

    export default {
        name: "BarLayerFontSize",

        data: () => {
            return {
                fontSizeMin: 10,
                fontSizeMax: 72,
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'setFontSize',
            ]),

            fontSizeChange (e) {
                const fontSize = +e.target.value;
                // const fontSize = Math.min(this.fontSizeMax, Math.max(this.fontSizeMin, value));

                this.setFontSize(fontSize);
            }
        },

        computed: {
            ...mapGetters('selectedLayer', [
                'fontSize',
            ]),
        }
    }
</script>

<style scoped>

</style>