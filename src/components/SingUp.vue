<template>
  <div>
    <Appbar />
    <div class="page-container">
      <div class="form-container">
        <div class="center-container">
          <v-card style="width: 500px; border-radius: 20px; padding: 10px">
            <v-card-title
              style="font-size: :24px !important; justify-content:center;"
              >สมัครสมาชิก</v-card-title
            >
            <v-card-text>
              <v-form
                ref="SingUpForm"
                v-model="valid"
                lazy-validation
                @submit.prevent="registerMember()"
              >
                <v-text-field
                  v-model="firstname"
                  :rules="firstnameRules"
                  label="ชื่อ"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="lastname"
                  :rules="lastnameRules"
                  label="นามสกุล"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :counter="10"
                  :rules="PasswordRules"
                  label="รหัสผ่าน"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  required
                  outlined
                ></v-text-field>
                <v-btn color="#009688" class="mr-4" block type="submit">
                  <body style="color: white">
                    สมัครสมาชิก
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
import Swal from "sweetalert2";
import axios from "axios";
import Appbar from "./Appbar.vue";
export default {
  data: () => ({
    valid: true,
    show1: false,
    show2: true,
    firstname: "",
    firstnameRules: [
      (v) => !!v || "กรุณากรอกชื่อ",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    valid: true,
    lastname: "",
    lastnameRules: [
      (v) => !!v || "กรุณากรอกนามสกุล",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [(v) => !!v || "กรุณากรอกชื่อ Email"],

    password: "",
    PasswordRules: [
      (v) => !!v || "กรุณากรอกรหัสผ่าน",
      (v) => v && v.length <= 10,
    ],
  }),
  components: {
    Appbar,
  },
  methods: {
    async registerMember() {
      if (!this.firstname || !this.lastname || !this.email || !this.password) {
        await Swal.fire({
          title: "ข้อมูลไม่ครบถ้วน",
          text: "โปรดกรอกข้อมูลให้ครบทุกช่อง",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      try {
        const data = {
          fristName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          password: this.password,
        };

        const response = await axios.post("http://localhost:9001/member", data);

        console.log(response);
        if (response.status === 201) {
          await Swal.fire({
            title: "สมัครสมาชิกสำเร็จ!",
            text: "กรุณาเข้าสู่ระบบ",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
          this.$router.push("/login");
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Unable to register user.",
          icon: "error",
          confirmButtonText: "Confirm",
        });

        console.error("Error data:", error);
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
  min-height: 100vh; /* กำหนดความสูงของหน้าเพจให้เต็มหน้าจอ */
  background-color: #e0f2f1; /* สีพื้นหลังของหน้าเพจ */
}

.center-container {
  margin: 0 auto; /* ทำให้หน้าเพจอยู่กึ่งกลางตามความกว้าง */
  padding: 20px; /* เพิ่มการระบุขอบสำหรับเนื้อหาของหน้าเพจ */
}
.center-btn {
  text-align: center;
}
</style>
 