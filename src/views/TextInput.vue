<template>
    <div>
        <br>
        <input class="text-input" type="text"
               :value="item.text"
               @input="textInput"
        >
        <button class="remove" @click="removeItem">Remove</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "TextInput",
        props: [
            'item'
        ],
        data: () => {
           return {

           }
        },
        methods: {
            ...mapActions('textBox', [
                'remove',
                'changeText'
            ]),

            removeItem () {
                this.remove(this.item.id);
            },

            textInput (e) {
                const text = e.target.value;
                this.changeText({ item: this.item, text });
            }
        }
    }
</script>

<style scoped>
    .text-input {

    }

    .remove {
        float: right;
        margin-left: 10px;
    }
</style>