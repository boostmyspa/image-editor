<template>
    <div class="input-settings">
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
    </div>
</template>

<script>
    export default {
        name: "ImageInputSettings",
        props: [
            'settings'
        ],
        data: () => {
            return {
                localSettings: {}
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

            setSettings () {
                this.$emit('settingsChanged', this.localSettings);
            }
        },

        mounted () {
            this.localSettings = this.settings;
        }
    }
</script>

<style scoped>
    .input-settings {
        margin: 5px 0;
        padding: 5px;
        border: 1px solid;
    }
</style>