<template>
  <div class="container">
    <div class="col-left">
      col-left
        <button @click="getData">Get data</button>
    </div>
    <div id="canvas-container" class="col-center">
      <canvas-main :stageConfig="canvasMainConfig" @stageSizeChange="canvasMainSizeChanged"></canvas-main>
    </div>
    <div class="col-right">
      <div>
        <p>Upload the background image</p>
        <upload-image></upload-image>
      </div>

      <input-layers v-if="uploadedImage"></input-layers>
    </div>
  </div>
</template>

<script>
    import { mapState, /*mapGetters, mapActions*/ } from 'vuex';
    import MainCanvas from './views/MainCanvas';
    import UploadImage from './views/UploadImage';
    import InputLayers from './views/InputLayers';

export default {
    name: 'App',
    components: {
        'canvas-main': MainCanvas,
        'upload-image': UploadImage,
        'input-layers': InputLayers,
    },

    data: () => {
        return {
            canvasMainConfig: {
                x: 0.5,
                y: 0.5,
                width: 500,
                height: 500,
            }
        }
    },

    methods: {
        getData () {
            console.log(this.elements)
        },

        canvasMainSizeChanged (newSize) {
            this.canvasMainConfig.width = newSize.width;
            this.canvasMainConfig.height = newSize.height;
        }
    },

    computed: {
        ...mapState('bgImage', {
            uploadedImage: state => state.uploadedImage,
        })
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
      flex: 0 1 auto;
      width: 25%;
      padding: 10px;
      border: 1px solid;
  }

  .col-right {
      height: 100%;
      overflow: auto;
      overflow-x: hidden;
  }

  .col-center {
      flex: 1 0 auto;
      width: 50%;
      border: 1px solid;
  }
</style>