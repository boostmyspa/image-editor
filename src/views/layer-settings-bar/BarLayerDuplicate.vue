<template>
    <button class="btn-icon-wrap" title="Duplicate Layer" @click.left="duplicate">
        <i class="icon-docs"></i>
    </button>
</template>

<script>
    import { mapState, /*mapGetters,*/ mapActions } from 'vuex';

    export default {
        name: "BarLayerDuplicate",

        methods: {
            ...mapActions('selectedLayer', [
                'duplicateLayer'
            ]),

            duplicate () {
                if (!this.duplicateLayer) {
                    console.warn('duplicateLayer: layer was not selected');
                    return;
                }

                this.duplicateLayer(this.selectedLayer);
            },
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