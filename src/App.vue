<template>
  <div class="container">
    <div class="col-left">
      col-left
    </div>
    <div class="col-center canvas-container">
      <canvas-main></canvas-main>
    </div>
    <div class="col-right">
      <div>
        <p>Upload the background image</p>
        <upload-image></upload-image>
      </div>

      <div v-if="uploadedImage">
        <hr>
        <p>Add texts</p>
        <button @click="addNewText">Add Text</button>
        <text-element v-for="text in texts" :key="text.id" :item="text"></text-element>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState,/* mapGetters,*/ mapMutations } from 'vuex';
    import MainCanvas from './views/MainCanvas';
    import UploadImage from './views/uploadImage'
    import AddText from './views/TextElement';

export default {
    name: 'App',
    components: {
        'canvas-main': MainCanvas,
        'upload-image': UploadImage,
        'text-element': AddText
    },

    methods: {
        ...mapMutations([
            'addNewText'
        ])

        // ...mapMutations({
        //
        // })
    },

    computed: {
        ...mapState([
            'uploadedImage',
            'texts'
        ]),
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