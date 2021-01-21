<template>
    <div>
        <label for="settings-x" class="layers-settings-bar--label">x:</label>
        <input id="settings-x" type="number" class="layers-settings-bar--input"
               :value="x" @input="updateX"
        >

        <label for="settings-y" class="layers-settings-bar--label">y:</label>
        <input id="settings-y" type="number" class="layers-settings-bar--input"
               :value="y" @input="updateY"
        >

        <label for="settings-w" class="layers-settings-bar--label">w:</label>
        <input id="settings-w" type="number" class="layers-settings-bar--input"
               :value="width" @input="updateWidth"
        >

        <label for="settings-h" class="layers-settings-bar--label">h:</label>
        <input id="settings-h" type="number" class="layers-settings-bar--input"
               :value="height" @input="updateHeight"
        >
    </div>
</template>

<script>
    import { /*mapState,*/ mapGetters, mapActions } from 'vuex';

    export default {
        name: "BarLayerTransform",

        methods: {
            ...mapActions('selectedLayer', [
                'changePosition',
                'changeSize',
            ]),

            updateX (e) {
                const x = +e.target.value;

                const position = {
                    x: x,
                    y: this.y
                };

                this.changePosition(position);
            },

            updateY (e) {
                const y = +e.target.value;

                const position = {
                    x: this.x,
                    y: y
                };

                this.changePosition(position);
            },

            updateWidth (e) {
                const width = +e.target.value;

                const size = {
                    width: width,
                    height: this.height
                };

                this.changeSize(size);
            },

            updateHeight (e) {
                const height = +e.target.value;

                const size = {
                    width: this.width,
                    height: height
                };

                this.changeSize(size);
            },
        },

        computed: {
            ...mapGetters('selectedLayer', [
                'x',
                'y',
                'width',
                'height',
            ]),
        },
    }
</script>

<style scoped>

</style>