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

      <div v-if="uploadedImage">
        <hr>
        <p>Add Items</p>
        <button @click="addNewTextBox">Add Text</button>
        | <button @click="addNewImageBox">Add Image</button>

        <hr>

          <div class="element-item" v-for="(el, index) in elements.slice().reverse()" :key="el.id">
              <b>{{ elements.length - index }}) {{ el.name }}</b>
              <text-input v-if="el.name == 'textBox'" :item="el"></text-input>
              <image-input v-if="el.name == 'imageBox'" :item="el"></image-input>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import MainCanvas from './views/MainCanvas';
    import UploadImage from './views/UploadImage'
    import TextInput from './views/TextInput';
    import ImageInput from './views/ImageInput';

export default {
    name: 'App',
    components: {
        'canvas-main': MainCanvas,
        'upload-image': UploadImage,
        'text-input': TextInput,
        'image-input': ImageInput
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
        ...mapActions('textBox', {
            addTextBox: 'add',
        }),

        ...mapActions('imageBox', {
            addImageBox: 'add',
        }),

        getData () {
            console.log(this.elements)
        },

        addNewTextBox () {
            let textBox = {
                // value: '',
                // x: this.canvasMainConfig.width / 2,
                // y: 30,
                // width: 300,
                // height: 80,
                // rotate: 0
            };

            this.addTextBox(textBox);
        },

        addNewImageBox () {
            this.addImageBox();
        },

        canvasMainSizeChanged (newSize) {
            this.canvasMainConfig.width = newSize.width;
            this.canvasMainConfig.height = newSize.height;
        }
    },

    computed: {
        ...mapState([
            'elements'
        ]),

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
  }

  .col-center {
      flex: 1 0 auto;
      width: 50%;
      border: 1px solid;
  }

  .element-item {
    margin: 0 0 10px;
    padding: 0 0 10px;
    border-bottom: 1px solid;
  }
</style>