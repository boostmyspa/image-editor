<template>
    <select name="font-family"
            class="layers-settings-bar--font-family"
            :value="fontFamily"
            @change="fontFamilyChange">
        <option v-for="family in fontFamilyList" :key="family"
                :value="family"
                :selected="family == fontFamily"
        >{{ family }}</option>
    </select>
</template>

<script>
    import {/* mapState,*/ mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "BarLayerFontFamily",

        data: () => {
            return {
                fontFamilyList: [
                    'Avenir',
                    'DM Sans',
                    'Calibri',
                    'Arial',
                    'Tahoma',
                ]
            }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'setFontFamily',
            ]),

            fontFamilyChange (e) {
                const fontFamily = e.target.value;

                this.setFontFamily(fontFamily);
            }
        },

        computed: {
            ...mapGetters('selectedLayer', [
                'fontFamily',
            ]),
        }
    }
</script>

<style scoped>

</style>