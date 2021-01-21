<template>
    <div class="current-image-box">
        <img class="current-image-box--thumbnail" :src="thumbnailSrc" alt="">

        <div class="current-image-box--buttons">
            <button @click.left="setThumbnailPrevious" class="btn-reset current-image-box--btn current-image-box--btn-left">
                <i class="icon icon-left-open-mini"></i>
            </button>
            <button @click.left="setThumbnailNext" class="btn-reset current-image-box--btn current-image-box--btn-right">
                <i class="icon icon-right-open-mini"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CatalogThumbnail",

        props: [
            'catalog',
        ],

        data: () => {
            return {
                currentThumbnailIndex: 0,
            }
        },

        methods: {
            setThumbnailPrevious () {
                if (this.currentThumbnailIndex <= 0) {
                    this.currentThumbnailIndex = this.catalogItemsLength - 1;
                }
                else {
                    this.currentThumbnailIndex--;
                }
            },

            setThumbnailNext () {
                if (this.currentThumbnailIndex >= this.catalogItemsLength - 1) {
                    this.currentThumbnailIndex = 0;
                }
                else {
                    this.currentThumbnailIndex++;
                }
            },

            setThumbnailAsCurrentImage () {
                let imageObj = new Image();

                imageObj.onload = (e) => {
                    let image = e.path[0];

                    this.$emit('setCurrentImage', image);
                };

                imageObj.src = this.thumbnailSrc;
            },
        },

        computed: {
            catalogItemsLength () {
                return this.catalog.items.length;
            },

            thumbnailSrc () {
                let thumbnail = this.catalog.items[this.currentThumbnailIndex];

                if (!thumbnail) return null;

                return thumbnail.src;
            },
        },

        watch: {
            thumbnailSrc () {
                this.setThumbnailAsCurrentImage();
            }
        },
    }
</script>

<style scoped>

</style>