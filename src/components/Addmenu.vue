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
         <h3> เพิ่มรายการอาหาร</h3>
        </div>

        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <div>
            <v-card
              class="card-login"
              style="
                width: 700px;
                height: 660px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 40px;
                margin-top: 40px;
                border-radius: 20px;
                padding: 20px;
              "
            >
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
                    name="gastronomy  "
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
                    <v-btn color="success" @click="registerMenu">บันทึก</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </div>
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
  data: () => ({
    menuName: "",
    details: "",
    ingredient: "",
    gastronomy: "",
    selectedMenuType: "",

    items: [
      { value: 1, text: "ต้ม" },
      { value: 2, text: "ผัด" },
      { value: 3, text: "ทอด" },
      { value: 4, text: "ยำ" },
    ],
  }),
  methods: {
    async registerMenu() {
      try {
        console.log("selectedMenuType:", this.selectedMenuType);
        const memberId = JSON.parse(localStorage.getItem("dataUser")).memberId;
        const data = {
          nameMenu: this.menuName,
          detailMenu: this.details,
          ingerMenu: this.ingredient,
          gastroMenu: this.gastronomy,
          menuType: { menuTypeId: this.selectedMenuType },
          member: { memberId: memberId },
        };
        console.log("Data to be sent:", data);

       
        const confirmResult = await Swal.fire({
          title: "ยืนยันการเพิ่มเมนูนี้ใช่หรือไม่",
          text: "กดยืนยันเพื่อเพิ่มเมนู",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        });

        if (confirmResult.isConfirmed) {
          const response = await axios.post("http://localhost:9001/menu", data);
          console.log(response);
          if (response.status === 201) {
            await Swal.fire({
              title: "เพิ่มเมนูสำเร็จ!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            this.$router.push("/editfood");
          }
        }
      } catch (error) {
        await Swal.fire({
          title: "เพิ่มเมนูไม่สำเร็จ",
          text: "เกิดปัญหาในการเพิ่มเมนู",
          icon: "error",
          timer: 1000,
          
        });
        console.error("Error data:", error);
      }
    },
  },
};
</script>
  