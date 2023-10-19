<template>
  <div>
    <Appbar />
    <div>
      <v-carousel
        cycle
        height="530"
        hide-delimiter-background
        show-arrows-on-hover
        
      >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <div class="image-container">
            <v-img
              :src="imageUrls[i]"
              height="100%"
            ></v-img>
            <div class="backdrop"></div>
           
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div>
      <template>
  <v-footer padless style="background-color: #009688;">
    <v-col
      class="text-center"
      cols="12"
    >
      <body style="color: white;">SOUTHERN FOOD</body>
    </v-col>
  </v-footer>
</template>
    </div>
  </div>
</template>

<script>
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import Appbar from "../components/Appbar.vue";
export default {
  name: "HomeView",
  components: {
    Appbar,
  },
  data() {
    return {
      slides: ["First", "Second", "Third", "Fourth"],
      imageUrls: [p1, p2, p3, p4],
    };
  },
};
</script>
<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  transition: opacity 0.3s;
}

.image-container:hover .backdrop {
  opacity: 1;
}
</style>