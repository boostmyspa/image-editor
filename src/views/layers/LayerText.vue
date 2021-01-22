<template>
    <div class="layer layer-text" @click="selectLayer">
        <i class="layer-type-icon" :class="isDynamicText ? 'icon-text-width' : 'icon-add-text'"></i>

        <input class="text-input" type="text"
               :value="item.text"
               @input="textInput"
        >

        <button @click.left="removeItem" class="btn-icon-wrap">
            <i class="icon-delete-filled"></i>
        </button>

    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "TextInput",
        components: {

        },

        props: [
            'item'
        ],

        data: () => {
           return {

           }
        },

        methods: {
            ...mapActions('selectedLayer', [
                'setSelectedLayer',
                'changeText',
            ]),

            ...mapActions('textBox', [
                'remove',
            ]),

            removeItem () {
                this.setSelectedLayer(null);
                this.remove(this.item.id);
            },

            textInput (e) {
                const text = e.target.value;

                this.changeText(text);
            },

            selectLayer () {
                this.$emit('selectLayer', this.item);
            }
        },

        computed: {
            isDynamicText () {
                return this.item.type == 'textDynamic';
            }
        },
    }
</script>

<style scoped>

</style>