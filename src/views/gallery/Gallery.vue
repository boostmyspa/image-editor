<template>
    <div class="gallery" note="sort the gallery by the items Name or DateAdding (settings)">
        <h3>Gallery</h3>
        <gallery-group v-for="group in galleryPrivate" :publicGroup="setPublicRootGroup(group)" :group="group" :key="group.rootId"></gallery-group>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import GalleryGroup from './GalleryGroup';

    export default {
        name: "Gallery",
        components: {
            'gallery-group': GalleryGroup,
        },
        data: () => {
            return {

            }
        },

        methods: {
            ...mapActions('gallery', [

            ]),

            setPublicRootGroup (group) {
                return this.galleryPublic.find( (item) => item.rootId == group.rootId );
            }
        },

        computed: {
            ...mapState('gallery', {
                galleryPrivate: 'gallery',
                galleryPublic: 'galleryPublic'
            }),

        }
    }
</script>

<style scoped>
    h3 {
        margin: 0 0 5px;
        text-align: center;
    }
</style>