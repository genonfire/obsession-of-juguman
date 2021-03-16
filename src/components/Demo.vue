<template>
  <v-container
    class="content pt-0"
    v-if="initialized"
  >
    <v-row>
      <v-col
        class="mb-3"
      >
        <v-card
          flat
          outlined
          class="pa-0"
          v-if="photo"
        >
          <img
            ref="photo"
            :src="photo.src"
            :width="width"
            :height="height"
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
      </v-col>
      <v-col>
        <v-textarea
          v-model="json"
          auto-grow
          outlined
          :disabled="true"
        >
      </v-textarea>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      photo: null,
      width: 512,
      height: 512,
      captions: [],
      json: '',
      firstInit: false,
    }
  },
  computed: {
    initialized () {
      return this.firstInit
    }
  },
  mounted () {
    this.getMojoData()
  },
  methods: {
    getMojoData () {
      this.photo = new Image()
      this.photo.onload = () => {
        this.width = this.photo.width
        this.height = this.photo.height

        this.getMojoCaptions()
        this.firstInit = true
      }
      this.photo.src = './juguman.png'

    },
    getMojoCaptions() {
      let data = [
        {
          "index": 0,
          "x": 365,
          "y": 106,
          "text": "태양권"
        },
        {
          "index": 1,
          "x": 162,
          "y": 319,
          "text": "웃지 말고"
        },
        {
          "index": 2,
          "x": 120,
          "y": 180,
          "text": "<i>github</i> <a href=\"https://github.com/genonfire/obsession-of-juguman\" target=\"_blank\">링크</a>"
        }
      ]
      this.captions = data
      this.json = JSON.stringify(this.captions, null, 4)
    },
    getStyle (caption) {
      let style = 'left:' + caption.x + 'px;top:' + caption.y + 'px;'
      return style
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
