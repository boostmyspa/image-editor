<template>
  <div class="container">
    <div class="col-left">
      col-left
        <button @click="getData">Get data</button>
    </div>
    <div class="col-center canvas-container">
      <canvas-main :stageConfig="canvasMainConfig" @stageSizeChange="canvasMainSizeChanged"></canvas-main>
    </div>
    <div class="col-right">
      <div>
        <p>Upload the background image</p>
        <upload-image></upload-image>
      </div>

      <div v-if="uploadedImage">
        <hr>
        <p>Add texts</p>
        <button @click="addNewTextBox">Add Text</button>
        <template v-for="text in elements">
          <text-input v-if="text.name == 'text'" :key="text.id" :item="text"></text-input>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState,/* mapGetters,*/ mapActions } from 'vuex';
    import MainCanvas from './views/MainCanvas';
    import UploadImage from './views/uploadImage'
    import TextInput from './views/TextInput';

export default {
    name: 'App',
    components: {
        'canvas-main': MainCanvas,
        'upload-image': UploadImage,
        'text-input': TextInput
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

        getData () {
            console.log(this.elements)
        },

        addNewTextBox () {
            let textBox = {
                value: '',
                x: this.canvasMainConfig.width / 2,
                y: 30,
                // width: 300,
                // height: 80,
                // rotate: 0
            };

            this.addTextBox(textBox);
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

  .col-center {
    flex: 1 0 auto;
    border: 1px solid;
  }
</style>