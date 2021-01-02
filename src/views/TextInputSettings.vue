<template>
    <div class="text-input-settings">
        <fieldset>
            <legend>Horizontal Align</legend>
            <label>
                <input type="radio" name="horizontal-align"
                       :checked="settings.hAlign == 'left'"
                       :value="settings.hAlign"
                       @change="hAlignChange('left')"
                >
                left
            </label>
            <label>
                <input type="radio" name="horizontal-align"
                       :checked="settings.hAlign == 'center'"
                       :value="settings.hAlign"
                       @change="hAlignChange('center')"
                >
                center
            </label>
            <label>
                <input type="radio" name="horizontal-align"
                       :checked="settings.hAlign == 'right'"
                       :value="settings.hAlign"
                       @change="hAlignChange('right')"
                >
                right
            </label>
        </fieldset>

        <fieldset>
            <legend>Vertical Align</legend>
            <label>
                <input type="radio" name="vertical-align"
                       :checked="settings.vAlign == 'top'"
                       :value="settings.vAlign"
                       @change="vAlignChange('top')"
                >
                top
            </label>
            <label>
                <input type="radio" name="vertical-align"
                       :checked="settings.vAlign == 'middle'"
                       :value="settings.vAlign"
                       @change="vAlignChange('middle')"
                >
                middle
            </label>
            <label>
                <input type="radio" name="vertical-align"
                       :checked="settings.vAlign == 'bottom'"
                       :value="settings.vAlign"
                       @change="vAlignChange('bottom')"
                >
                bottom
            </label>
        </fieldset>

        <fieldset>
            <legend>Font</legend>
            <label>
                Font Size <small>({{ fontSizeMin }}-{{ fontSizeMax }})</small>
                <input type="number" :value="settings.fontSize" @change="fontSizeChange">
            </label>
            <br><br>

            <label>
                Font Family
                <br>
                <select name="font-family" :value="settings.fontFamily" @change="fontFamilyChange">
                    <option v-for="family in fontFamilyList" :key="family"
                            :value="family"
                            :selected="family == settings.fontFamily"
                    >{{ family }}</option>
                </select>
            </label>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "TextInputSettings",
        props: [
            'settings'
        ],
        data: () => {
            return {
                localSettings: {},
                fontSizeMin: 10,
                fontSizeMax: 48,
                fontFamilyList: [
                    'Calibri',
                    'Arial',
                    'Tahoma'
                ]
            }
        },

        methods: {
            hAlignChange (value) {
                this.localSettings.hAlign = value;
                this.setSettings();
            },

            vAlignChange (value) {
                this.localSettings.vAlign = value;
                this.setSettings();
            },

            fontSizeChange (e) {
                let fontSize = +e.target.value;
                this.localSettings.fontSize = Math.min(this.fontSizeMax, Math.max(this.fontSizeMin, fontSize));

                this.setSettings();
            },

            fontFamilyChange (e) {
                let fontFamily = e.target.value;
                this.localSettings.fontFamily = fontFamily;

                this.setSettings();
            },

            setSettings () {
                this.$emit('settingsChanged', this.localSettings);
            }
        },

        computed: {

        },

        mounted () {
            this.localSettings = this.settings;
        }
    }
</script>

<style scoped>
    .text-input-settings {
        margin: 5px 0;
        padding: 5px;
        border: 1px solid;
    }
</style>