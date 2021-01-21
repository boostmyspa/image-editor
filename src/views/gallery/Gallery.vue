<template>
    <div class="gallery" note="sort the gallery by the items Name or DateAdding (settings)">
        <ul class="gallery-links list-unstyled">
            <li :class="activeGroup == 'Backgrounds' ? 'active' : ''" @click.left="activeGroup = 'Backgrounds'">
                <i class="icon icon-content"></i>
                <span class="d-block">Background</span>
            </li>
            <li :class="activeGroup == 'Statics' ? 'active' : ''" @click.left="activeGroup = 'Statics'">
                <i class="icon icon-content"></i>
                <span>Static</span>
            </li>
            <li :class="activeGroup == 'Catalogs' ? 'active' : ''" @click.left="activeGroup = 'Catalogs'">
                <i class="icon icon-content"></i>
                <span>Choices</span>
            </li>
        </ul>

        <gallery-group v-for="group in galleryPrivate"
                       :publicGroup="setPublicRootGroup(group)"
                       :group="group"
                       :activeGroup="activeGroup"
                       :key="group.rootId"
        ></gallery-group>
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
                activeGroup: 'Backgrounds', // 'Backgrounds'
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