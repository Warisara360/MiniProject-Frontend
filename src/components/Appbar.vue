<template>
  <div>
    <v-app-bar app color="#009688" dark>
      <div style="display: flex; justify-content: center;">
        <img src="./food.png" alt="Food Image" width="50" height="50">
        <v-card-title style="font-size: :24px !important;"
        @click="goToHome()">
        <h4>SOUTHERN FOOD</h4></v-card-title
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn outlined text @click="goToLogin()" > เข้าสู่ระบบ </v-btn> &nbsp; &nbsp; 
      <v-btn outlined text @click="goToSingup()"> สมัครสมาขิก </v-btn>
      
    </v-app-bar>
  </div>
</template>
<script>


export default {
    name: "Appbar",
    methods : {
   
    goToLogin (){
        this.$router.push({ path: "/login" }).catch(() => {});
    },
    goToSingup (){
      this.$router.push({path:'/singup'}).catch(() => {});
    },
    goToHome (){
      this.$router.push({path:'/'}).catch(() => {});
    },
  }
}
</script>

<style scoped>

</style>