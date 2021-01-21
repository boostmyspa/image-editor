<template>
    <div class="gallery-catalog-item">
        <img class="gallery-catalog-thumbnail" draggable="false"
             :src="image.src"
             :title="image.title"
        >

        <input v-if="!inPublicGroup && titleRename"
               ref="itemTitleInput"
               class="gallery-catalog-item--title-input"
               type="text"
               v-model="image.title"
               @blur="titleRenameDone"
               @keydown.enter="titleRenameDone"
        >
        <b v-show="!titleRename" class="gallery-catalog-item--title-text" @dblclick="renameTitle">{{ image.title }}</b>

        <div v-if="!inPublicGroup" class="gallery-catalog--buttons gallery-catalog-item--buttons">
            <button @click.left="titleRename = !titleRename" class="btn-icon-wrap">
                <i class="icon-edit"></i>
            </button>
            <button v-if="!inPublicGroup" @click.left="remove" class="btn-remove btn-icon-wrap">
                <i class="icon-delete-filled"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import { /*mapState,*/ mapActions } from 'vuex';

    export default {
        name: "GalleryImageItem",
        props: [
            'image',
            'catalog',
            'inPublicGroup',
        ],

        data: () => {
           return {
               titleRename: false,
           }
        },

        methods: {
            ...mapActions('gallery', [
                'removeImageFromGroup'
            ]),

            remove () {
                this.removeImageFromGroup({ group: this.catalog, imageItem: this.image })
            },

            renameTitle () {
                if (!this.inPublicGroup && !this.titleRename) {
                    this.titleRename = true;
                }
            },

            titleRenameDone () {
                this.titleRename = false;
            },
        },

        watch: {
            titleRename () {
                if (this.titleRename) {
                    let t = setTimeout(() => {
                        clearTimeout(t);
                        this.$refs.itemTitleInput.focus();
                    });

                }
            }
        },


    }
</script>

<style scoped>

</style>