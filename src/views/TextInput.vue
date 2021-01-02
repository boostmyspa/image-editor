<template>
    <div>
        <br>
        <input class="text-input" type="text"
               :value="item.text"
               @input="textInput"
        >
        <button class="settings" @click="showSettings = !showSettings">Settings</button>
        <button class="remove" @click="removeItem">Remove</button>
        <div class="clearfix"></div>

        <text-input-settings v-if="showSettings" :settings="item.settings" @settingsChanged="settingsChanged"></text-input-settings>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import TextInputSettings from './TextInputSettings';

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
            ...mapActions('textBox', [
                'remove',
                'changeText',
                'changeSettings'
            ]),

            removeItem () {
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

    .remove {
        float: right;
        margin-left: 5px;
    }

    .settings {
        float: right;
        margin-left: 5px;
    }

    .clearfix {
        clear: both;
    }
</style>