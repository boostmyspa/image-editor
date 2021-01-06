<template>
    <div>
        <br>
        <input class="text-input" type="text"
               :value="item.text"
               @input="textInput"
        >
        <div class="buttons">
            <button @click="showSettings = !showSettings">Settings</button>
            | <button @click="removeItem">Remove</button>
        </div>
        <div class="clearfix"></div>

        <text-input-settings v-if="showSettings" :settings="item.settings" @settingsChanged="settingsChanged"></text-input-settings>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import TextInputSettings from './TextLayerSettings';

    export default {
        name: "TextInput",
        components: {
            'text-input-settings': TextInputSettings
        },
        props: [
            'item'
        ],
        data: () => {
           return {
               showSettings: false,
           }
        },
        methods: {
            ...mapActions([
                'changeSelectedLayerId',
            ]),

            ...mapActions('textBox', [
                'remove',
                'changeText',
                'changeSettings'
            ]),

            removeItem () {
                this.changeSelectedLayerId(null);
                this.remove(this.item.id);
            },

            textInput (e) {
                const text = e.target.value;
                this.changeText({ item: this.item, text });
            },

            settingsChanged (newSettings) {
                this.changeSettings({ item: this.item, settings: newSettings });
            }
        }
    }
</script>

<style scoped>
    .text-input {

    }

    .buttons {
        float: right;
        margin: 5px 0 0;
    }

    .clearfix {
        clear: both;
    }
</style>