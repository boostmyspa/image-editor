<template>
  <div class="container">
    <div class="col-left">
        <button @click="saveData">Save data</button>
        | <button @click="loadData">Load data</button>
        | <button @click="changeScale">Zoom ({{ scaleIncrease ? '-' : '+' }})</button>

        <hr>
        <button @click="loadGalleryData">Load Gallery data</button>
        <gallery></gallery>
    </div>
    <div id="canvas-container" class="col-center">
      <canvas-main :stageConfig="canvasMainConfig" @stageSizeChange="canvasMainSizeChanged"></canvas-main>
    </div>
    <div class="col-right">
      <div>
        <p>Upload the background image</p>
        <upload-image-to-canvas :label="'Upload Image'" :specifiedGalleryRootId="'Backgrounds'"></upload-image-to-canvas>
      </div>

      <input-layers v-if="uploadedImage"></input-layers>
    </div>
  </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import CanvasMain from './views/canvas/CanvasMain';
    import UploadImageToCanvas from './views/uploader/UploadImageToCanvas';
    import InputLayers from './views/layers/Layers';
    import Gallery from './views/gallery/Gallery';

export default {
    name: 'App',
    components: {
        'canvas-main': CanvasMain,
        'upload-image-to-canvas': UploadImageToCanvas,
        'input-layers': InputLayers,
        'gallery': Gallery
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

        ...mapState('bgImage', [
            'uploadedImage'
        ]),

        ...mapGetters([
            'prepareForSave'
        ])
    }
}
</script>

<style>
  html, body {
      height: 100%;
      margin: 0;
      padding: 0;
  }

  *, *::before, *::after {
      box-sizing: border-box;
  }

  .container {
      display: flex;
      width: 100%;
      height: 100%;
  }

  .col-left,
  .col-right {
      overflow: auto;
      overflow-x: hidden;
      flex: 0 1 auto;
      width: 25%;
      height: 100%;
      padding: 10px;
  }

  .col-left {
      border-right: 1px solid;
  }

  .col-right {
      border-left: 1px solid;
  }

  .col-center {
      flex: 1 0 auto;
      width: 50%;
      /*border: 1px solid;*/
  }
</style>