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
          "
        >
          <h3 style="color: #04645a;">จัดการรายการอาหาร</h3>
        </div>

        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div style="width: 80%">
            <div
              style="
                display: flex;
                justify-content: right;
                align-items: right;
                padding-right: 20px;
              "
            >
              <v-btn color="success" @click="goToAddmenu"> เพิ่มเมนู</v-btn>
            </div>
          </div>
        </div>

        <div>
          <v-row style="margin: 50px">
            <v-col v-for="n in desserts" :key="n" cols="4">
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                  :elevation="hover ? 16 : 2"
                  style="width: 500px; height: 300px; border-radius: 20px"
                >
                  <div style="padding: 20px">
                    <div style="display: flex; justify-content: center; color: #009688;">
                      <h1 >
                        {{ n.nameMenu }}
                      </h1>
                    </div>

                    <div style="padding-top: 5px">
                      <v-card
                        class="overflow-x-auto lighten-5"
                        :elevation="0"
                        style="width: 500px; height: 150px; border-radius: 20px"
                      >
                        <v-card-title>
                          <p style="font-size: 17px; color: #41514f;">{{ n.detailMenu }}</p>
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
                      <v-card-title>
                        <v-btn
                          style="margin-right: 10px"
                          color="success"
                          @click="openDialog(n)"
                          >แก้ไข</v-btn
                        >
                        <v-btn color="error" @click="deleteMenu(n)">ลบ</v-btn>
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
        <v-card width="500" height="500" class="overflow-auto" style="border-radius: 15px; padding: 10px;">
          <v-card-text>
            <v-form
              ref="LoginForm"
              v-model="valid"
              lazy-validation
              style="margin-top: 10px"
            >
              <v-text-field
                v-model="menuName"
                label="ชื่ออาหาร"
                required
                outlined
              ></v-text-field>

              <v-textarea
                outlined
                name="details"
                label="รายละเอียด"
                v-model="details"
                rows="3"
                row-height="25"
              ></v-textarea>
              <v-textarea
                outlined
                name="ingredient "
                v-model="ingredient"
                label="ส่วนประกอบ"
                value=""
                rows="3"
                row-height="25"
              ></v-textarea>
              <v-textarea
                outlined
                v-model="gastronomy"
                name="gastronomy"
                label="วิธีทำ"
                value=""
                rows="3"
                row-height="25"
              ></v-textarea>
              <v-select
                v-model="selectedMenuType"
                :items="items"
                label="ประเภทอาหาร"
                outlined
              ></v-select>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-btn color="success" @click="updateMenu">บันทึก</v-btn>
              </div>
            </v-form>
          </v-card-text>
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
  name: "EditFood",
  components: {
    AppbarUser,
  },
  data() {
    return {
      desserts: [],
      selectedItem: null,
      dialogVisible: false,
      items: [
        { value: 1, text: "ต้ม" },
        { value: 2, text: "ผัด" },
        { value: 3, text: "ทอด" },
        { value: 4, text: "ยำ" },
      ],
    };
  },
  mounted() {
    this.getMenuData();
  },
  methods: {
    goToAddmenu() {
      this.$router.push({ path: "/addmenu" }).catch(() => {});
    },

    openDialog(selectedItem) {
      this.selectedItem = selectedItem;
      this.dialogVisible = true;
      this.menuName = selectedItem.nameMenu;
      this.details = selectedItem.detailMenu;
      this.ingredient = selectedItem.ingerMenu;
      this.gastronomy = selectedItem.gastroMenu;
      this.selectedMenuType = selectedItem.menuType.menuTypeId;
    },

    async getMenuData() {
      const member_id = JSON.parse(localStorage.getItem("dataUser")).memberId;
      await axios
        .get(`http://localhost:9001/menu/${member_id}`)
        .then((response) => {
          this.desserts = response.data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },

    async updateMenu() {
      const updatedMenu = {
        menuId: this.selectedItem.menuId,
        nameMenu: this.menuName,
        detailMenu: this.details,
        ingerMenu: this.ingredient,
        gastroMenu: this.gastronomy,
        menuType: { menuTypeId: this.selectedMenuType },
      };

      
      const confirmed = await Swal.fire({
        title: "ยืนยันแก้ไขเมนู",
        text: "แน่ใจใช่ไหมว่าจะแก้ไขเมนู",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกลิก",
      });

      if (confirmed.isConfirmed) {
        try {
          const response = await axios.put(
            `http://localhost:9001/${this.selectedItem.menuId}`,
            updatedMenu
          );
          Swal.fire({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            showConfirmButton: false
          });
          window.location.reload();
          this.getMenuData();
        } catch (error) {
          console.error("ไม่สามารถแก้ไขข้อมูลได้", error);
          Swal.fire({
            icon: "error",
            title: "เกิดปัญหาในการแก้ไขข้อมูล",
          });
        }
      }
    },

    async deleteMenu(selectedItem) {
      if (selectedItem) {
        const confirmationResult = await Swal.fire({
          title: "ต้องการลบเมนูนี้ใช่หรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
        });

        if (confirmationResult.isConfirmed) {
          const deleteMenu = {
            menuId: selectedItem.menuId,
          };

          try {
            const response = await axios.delete(
              `http://localhost:9001/${selectedItem.menuId}`,
              {
                data: deleteMenu,
              }
            );
            Swal.fire({
              title: "ลบเมนูนี้สำเร็จ!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            window.location.reload();
          } catch (error) {
            console.error("There was an error!", error);
            Swal.fire({
              icon: "error",
              title: "ลบเมนูนี้ไม่สำเร็จ",
            });
          }
        } else {
          console.log("Deletion canceled.");
        }
      } else {
        console.error("selectedItem is null or undefined.");
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
</style>
