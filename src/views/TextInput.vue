<template>
    <div>
        <br>
        <input class="text-input" type="text" v-model="item.text">
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
            ]),

            removeItem () {
                this.remove(this.item.id);
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