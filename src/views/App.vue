<template>
    <div class="c-body">
        <site-header></site-header>

        <div class="d-none">
            <button @click="saveData">Save data</button>
            | <button @click="loadData">Load data</button>

            <hr>
            <button @click="loadGalleryData">Load Gallery data</button>
        </div>

        <main class="c-main row no-gutters">
            <div class="col-md-12 col-xl-4 col-lg-4">
                <gallery></gallery>
            </div>
            <div class="col-md-12 col-lg-5 col-xl-5">
                <div class="c-canvas">
                    <layers-settings-bar></layers-settings-bar>

                    <div id="canvas-container">
                        <canvas-container></canvas-container>
                    </div>
                </div>
            </div>
            <div class="layers-wrap col-md-12 col-xl-3 col-lg-3">
                <h4 class="category-title">Background</h4>
                <layer-background></layer-background>

                <h4 class="category-title">Layers</h4>
                <input-layers></input-layers>
            </div>
        </main>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import Header from './Header';
    import Gallery from './gallery/Gallery';
    import CanvasContiner from './canvas/CanvasContiner';
    import LayersSettingsBar from './layer-settings-bar/LayersSettingsBar';
    import LayerBackground from './layers/LayerBackground';
    import InputLayers from './layers/Layers';

    export default {
        name: 'App',
        components: {
            'site-header': Header,
            'gallery': Gallery,
            'canvas-container': CanvasContiner,
            'layers-settings-bar': LayersSettingsBar,
            'layer-background': LayerBackground,
            'input-layers': InputLayers,
        },

        data: () => {
            return {

            }
        },

        methods: {
            ...mapActions([
                'saveDataToServer',
                'loadDataFromServer'
            ]),

            ...mapActions('bgImage', {
                changeBackgroundImageCover: 'changeImageCover'
            }),

            saveData () {
                // console.log(this.layers);

                let dataForSave = JSON.stringify(this.prepareForSave);

                this.saveDataToServer(dataForSave);
                console.log('Data saved');
            },

            loadData () {
                this.loadDataFromServer();
            },

            loadGalleryData () {
                console.log(this.$store.state.gallery.gallery);
            },

        },

        computed: {
            ...mapState([
                'layers'
            ]),

            ...mapState('gallery', [
                'gallery'
            ]),

            ...mapState('bgImage', {
                backgroundImage: 'image',
                backgroundImageCover: 'imageCover',
            }),

            ...mapGetters([
                'prepareForSave'
            ])
        }
    }
</script>

<style>

</style>