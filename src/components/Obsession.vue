<template>
  <v-container
    class="content pt-0"
  >
    <v-sheet
      color="#eee"
      elevation="3"
      class="mb-5 pa-5"
    >
      Select an image from your computer then click on the image to add captions on it.
    </v-sheet>

    <v-row justify="space-around">
      <v-col>
        <v-file-input
          v-model="file_photo"
          accept="image/*"
          prepend-icon="mdi-camera"
          show-size
          label="Select an image"
          @change="onFileChange"
          @click:clear="removePhoto"
        >
        </v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="mb-3"
      >
        <v-card
          flat
          outlined
          color="deep-purple lighten-3"
          class="pa-0"
          v-if="photo"
        >
          <img
            ref="photo"
            :src="photo"
            :width="width"
            :height="height"
            @click="onClickImage"
          />
          <div
            v-for="caption in captions"
            :key="caption.index"
            class="overlay"
            :style="getStyle(caption)"
            v-html="caption.text"
          >
          </div>
        </v-card>
        <v-card
          width="900"
          class="pt-4"
          v-else
        >
          <v-icon x-large>mdi-image </v-icon>
        </v-card>
      </v-col>
    </v-row>

    <v-container
      class="text-center mt-5"
    >
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="printJson()"
      >
        <v-icon
          class="mr-3"
        >
          mdi-code-json
        </v-icon>
        Print Json
      </v-btn>
      <v-textarea
        v-model="json"
        auto-grow
        outlined
        class="mt-5"
      >
      </v-textarea>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      photo: null,
      file_photo: null,
      width: 900,
      height: 400,
      captions: [],
      json: '',
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    updatePhoto(data) {
      this.photo = data.get('photo')
      this.photo = URL.createObjectURL(data.get('photo'))

      this.onload = function () {
        URL.revokeObjectURL(this.photo)
      }
    },
    removePhoto() {
      this.photo = null
      this.file_photo = null
      this.captions = []
      this.json = null
    },
    onFileChange() {
      if (this.photo) {
        this.photo = null
        this.captions = []
        this.json = null
      }

      if (this.file_photo) {
        let reader = new FileReader();
        reader.readAsDataURL(this.file_photo);

        reader.onload = evt => {
          let img = new Image();
          img.onload = () => {
            this.width = img.width;
            this.height = img.height;
          }
          img.src = evt.target.result;
        }

        let formData = new FormData();
        formData.append('photo', this.file_photo)

        this.updatePhoto(formData)
      }
    },
    onClickImage: async function (event) {
      if (!this.photo) {
        return
      }

      let x = parseInt(event.clientX - this.$refs.photo.getBoundingClientRect().left)
      let y = parseInt(event.clientY - this.$refs.photo.getBoundingClientRect().top)

      let res = await this.$dialog.prompt({
        title: 'What do you want to write on (' + x + ', ' + y + ')?',
        value: '',
        text: 'caption',
        actions: {
          false: {
            text: 'Cancel'
          },
          true: {
            color: 'primary',
            text: 'Apply',
          }
        }
      })

      if (res) {
        this.addCaption(x, y, res)
      }
    },
    addCaption (x, y, text) {
      let index = this.captions.length
      let caption = {
        index: index,
        x: x,
        y: y,
        text: text
      }
      this.captions.push(caption)
    },
    getStyle (caption) {
      let style = 'left:' + caption.x + 'px;top:' + caption.y + 'px;'
      return style
    },
    printJson() {
      if (this.captions.length > 0) {
        let data = JSON.stringify(this.captions, null, 4)
        this.json = data
      }
    }
  }
}
</script>

<style lang="scss">
.overlay {
  position: absolute;
  background-color: rgba(0,0,0,0.7);
  color: white;
  padding: 5px;
}
</style>
