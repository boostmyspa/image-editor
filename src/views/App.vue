<template>
    <div class="c-body">
        <site-header></site-header>

        <div class="d-none">
            <button @click="saveData">Save data</button>
            | <button @click="loadData">Load data</button>
            | <button @click="changeScale">Zoom ({{ scaleIncrease ? '-' : '+' }})</button>

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
                        <canvas-main :stageConfig="canvasMainConfig" @stageSizeChange="canvasMainSizeChanged"></canvas-main>
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
    import CanvasMain from './canvas/CanvasMain';
    import LayersSettingsBar from './layer-settings-bar/LayersSettingsBar';
    import LayerBackground from './layers/LayerBackground';
    import InputLayers from './layers/Layers';

    export default {
        name: 'App',
        components: {
            'site-header': Header,
            'gallery': Gallery,
            'canvas-main': CanvasMain,
            'layers-settings-bar': LayersSettingsBar,
            'layer-background': LayerBackground,
            'input-layers': InputLayers,
        },

        data: () => {
            return {
                canvasMainConfig: {
                    x: -0.5,
                    y: -0.5,
                    width: 500,
                    height: 500,
                    scaleX: 1,
                    scaleY: 1
                },
                scaleIncrease: false
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

            canvasMainSizeChanged (newSize) {
                this.canvasMainConfig.width = newSize.width;
                this.canvasMainConfig.height = newSize.height;
            },

            changeScale () {
                this.scaleIncrease = !this.scaleIncrease;

                if (this.scaleIncrease) {
                    this.canvasMainConfig.scaleX = 2;
                    this.canvasMainConfig.scaleY = 2;
                }
                else {
                    this.canvasMainConfig.scaleX = 1;
                    this.canvasMainConfig.scaleY = 1;
                }
            }
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