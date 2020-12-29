<template>
    <div>
        <br>
        <input class="text-input" type="text" v-model="item.value">
        <button class="remove" @click="remove">Remove</button>
    </div>
</template>

<script>
    export default {
        name: "TextElement",
        props: [
            'item'
        ],
        data: () => {
           return {
               textVal: ''
           }
        },
        methods: {
            remove () {
                console.log(this.item);
                this.$store.dispatch('removeText', this.item.id)
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