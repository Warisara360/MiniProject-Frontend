<template>
  <div style="background-color: #e0f2f1; height: 100%">
    <AppbarUser />
    <div>
      <div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 40px;
            font-size: 30px;
            color: #04645a;
          "
        >
          <h3>รายการแนะนำอาหารใต้</h3>
        </div>

        <div>
          <v-row style="margin: 50px">
            <v-col v-for="n in desserts" :key="n" cols="4">
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                  :elevation="hover ? 16 : 2"
                  style="width: 500; height: 300; border-radius: 20px"
                >
                  <div style="padding: 25px" @click="openDialog(n)">
                    <div
                      style="
                        display: flex;
                        justify-content: center;
                        color: #009688;
                      "
                    >
                      <h1>
                        {{ n.nameMenu }}
                      </h1>
                    </div>

                    <div style="padding-top: 10px">
                      <v-card
                        class="overflow-x-auto lighten-5"
                        :elevation="0"
                        style="
                          width: 500px;
                          height: 150px;
                          border-radius: 20px;
                          color: #41514f;
                        "
                      >
                        <v-card-title>
                          <p style="font-size: 17px">{{ n.detailMenu }}</p>
                        </v-card-title>
                      </v-card>
                    </div>
                    <div
                      style="
                        padding-top: 5px;
                        display: flex;
                        justify-content: center;
                        
                      "
                    >
                      <v-card-title >
                        <p style="font-size: 17px; color: rgb(129, 148, 148)">
                          คลิกเพื่ออ่านเพิ่มเติม
                        </p>
                      </v-card-title>
                    </div>
                  </div>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialogVisible" max-width="500">
      <template>
        <v-card
          width="500"
          height="500"
          class="overflow-auto"
          style="padding: 30px; border-radius: 15px"
        >
          <div>
            <div style="color: #848484">ชื่อเมนู:</div>
            <p>{{ selectedItem ? selectedItem.nameMenu : "" }}</p>
          </div>
          <div style="margin-top: 30px">
            <div style="color: #848484">ประเภท:</div>
            <p>{{ selectedItem ? selectedItem.menuType.menuType_name : "" }}</p>
          </div>
          <div style="margin-top: 30px">
            <div style="color: #848484">รายละเอียด:</div>
            <p>{{ selectedItem ? selectedItem.detailMenu : "" }}</p>
          </div>
          <div style="margin-top: 30px">
            <div style="color: #848484">วัตถุดิบ:</div>
            <p>{{ selectedItem ? selectedItem.ingerMenu : "" }}</p>
          </div>
          <div style="margin-top: 30px">
            <div style="color: #848484">วิธีทำ:</div>
            <p>{{ selectedItem ? selectedItem.gastroMenu : "" }}</p>
          </div>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>



<script>
import Swal from "sweetalert2";
import axios from "axios";
import AppbarUser from "./AppbarUser.vue";
export default {
  components: {
    AppbarUser,
  },
  data() {
    return {
      desserts: [],
      dialogVisible: false,
    };
  },
  mounted() {
    this.getMemuData();
  },
  methods: {
    openDialog(selectedItem) {
      this.selectedItem = selectedItem;
      this.dialogVisible = true;
    },
    getMemuData() {
      axios
        .get("http://localhost:9001/menu")
        .then((response) => {
          this.desserts = response.data;
          console.log(desserts);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
</style>