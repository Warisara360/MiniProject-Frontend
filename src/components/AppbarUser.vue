<template>
    <div>
      <v-app-bar :elevation="2" app color="#009688">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="burger-icon" style="color: #d9fffb"></v-app-bar-nav-icon>
       <img src="./food.png" alt="Food Image" width="50" height="50">
        <h2 style="color: white;">SOUTHERN FOOD</h2>
        <v-spacer></v-spacer>
        <v-btn outlined text @click="goToHome()" style="border-color: red; color: red; background-color: white;"> ออกจากระบบ </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app temporary style="background-color: #dcfffb; border-radius: 10px;">

        <div style="height: 50px; display: flex; justify-content: center; padding-top: 20px;">
          ชื่อผู้ใช้ 
        </div>
        <div style=" display: flex; justify-content: center; ">
         คุณ : &nbsp; <div>{{ dataUser ? dataUser.fristName : 'ไม่พบข้อมูล' }}</div>&nbsp;<div>{{ dataUser ? dataUser.lastName : 'ไม่พบข้อมูล' }} </div>
        </div>
        <div>
        
        </div>
        <v-list style="margin-top: 5px">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="navigate(item.value)"
            style="border: 2px solid #009688;
            border-radius: 10px;
    margin-top: 10px; margin-left: 2px; margin-right: 2px;"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
  
         
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  export default {
      methods: {
      goToHome() {
        this.$router.push({ path: "/" }).catch(() => {});
      },
      login() {
        this.$router.push({ path: "/login" }).catch(() => {});
      },
      navigate(value) {
        if (value === "menu") {
          this.$router.push({ path: "/category" }).catch(() => {});
        } else if (value === "editmenu") {
          this.$router.push({ path: "/editfood" }).catch(() => {});
        }
        this.drawer = false;
      },
      getUserDataFromLocalStorage() {
      const dataUser = localStorage.getItem('dataUser');
      if (dataUser) {
        // แปลงข้อมูล JSON กลับเป็นอ็อบเจกต์ (หากมีการบันทึกเป็น JSON)
        return JSON.parse(dataUser);
      }
      return null; // หากไม่พบข้อมูล
    },
    },
    data() {
      return {
        drawer: false,
        group: null,
        
        items: [
          {
            title: "รายการแนะนำอาหารใต้",
            value: "menu"
          },
          {
            title: "จัดการรายการอาหาร",
            value: "editmenu"
          }
        ],
        dataUser: this.getUserDataFromLocalStorage(), 
      };
    }
  };
  
  </script>