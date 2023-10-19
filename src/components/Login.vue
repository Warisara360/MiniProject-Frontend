<template>
  <div class="page-container">
    <Appbar />
    <div>
      <div class="form-container">
        <div class="center-container">
          <v-card
            class="card-login"
            style="
              width: 50%;
              height: 350px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border-radius: 20px;
            "
          >
            <v-card-title style="font-size: :24px !important; "
              >เข้าสู่ระบบ</v-card-title
            >
            <v-card-text>
              <v-form ref="LoginForm" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="อีเมลล์ผู้ใช้งาน"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  label="รหัสผ่าน"
                  required
                  outlined
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="#009688"
                  class="mr-4"
                  @click="login"
                  block
                >
                  <body style="color: white">
                    เข้าสู่ระบบ
                  </body>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Appbar from "./Appbar.vue";
export default {
  data: () => ({
    valid: true,
    show1: false,
    show2: true,
    email: "",
    emailRules: [(v) => !!v || "กรุณากรอกอีเมลล์ผู้ใช้งาน"],
    valid: true,
    password: "",
    passwordRules: [(v) => !!v || "กรุณากรอกรหัสผ่าน"],
    checkbox: false,
  }),
  components: {
    Appbar,
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:9001/loginMember", {
          email: this.email,
          password: this.password,
        });
        if (response.status == 200) {
          this.open = false;
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            localStorage.setItem("dataUser", JSON.stringify(response.data));
          });
          this.$router.push("/category");
        }
      } catch (error) {
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "โปรดตรวจสอบอีเมลล์ผู้ใช้ และรหัสผ่านอีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.error("Error login:", error);
      }
    },
  },
};
</script>
<style>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* กำหนดความสูงของหน้าเพจให้เต็มหน้าจอ */
  background-color: #e0f2f1; /* สีพื้นหลังของหน้าเพจ */
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px; /* ปรับความกว้างตามที่คุณต้องการ */
  height: 600px; /* ปรับความสูงตามที่คุณต้องการ */
  margin: 0 auto; /* ทำให้หน้าเพจอยู่กึ่งกลางตามความกว้าง */
  /* เพิ่มการระบุขอบสำหรับเนื้อหาของหน้าเพจ */
}
.center-btn {
  text-align: center;
}
</style>
 