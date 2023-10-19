<template>
  <v-card>
    <v-card-title style="font-size: :24px !important;">เพิ่มเมนู</v-card-title>
    <v-card-text>
      <v-form
      ref="MenuForm"
      v-model="valid"
      lazy-validation>
        
      <v-row
      > <v-col cols="12">
          <v-autocomplete
            v-model="value"
            :items="items"
            dense
            filled
            label="ประเภทเมนู"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-text-field
      v-model="name"
      :rules="nameRules"
      label="ชื่อเมนู"
      required
      outlined
      ></v-text-field>

      <v-text-field
      v-model="detail"
      :rules="detailRules"
      label="รายละเอียด"
      required
      outlined
    ></v-text-field>

    <v-text-field
      v-model="ingre"
      :rules="ingreRules"
      label="ส่วนประกอบ"
      required
      outlined
    ></v-text-field>

    <v-container fluid>
    <v-textarea
      autocomplete="gastro"
      label="วิธีทำ"
      required
      outlined
    ></v-textarea>
    </v-container>



      <v-btn
      color="error"
      class="mr-4"
      @click="cancel"
    >
      ยกเลิก
    </v-btn>

    <v-btn
      color="warning"
      @click="save"
    >
      บันทึก
    </v-btn>
    
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: () => ({
      items: ['ขนม', 'แกง', 'ผัด', 'ยำ', 'ทอด/เผา/ย่าง', 'เครื่องจุ่ม'],
      values: ['ขนม'],
      value: null,
    }),
  }
</script>

<style>

</style>