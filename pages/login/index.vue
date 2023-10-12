<template>
  <div>
    <v-app-bar  dense flat dark>
      <v-toolbar-title>Login</v-toolbar-title> </v-app-bar
    >
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="set-padding">
            <div class="text-center mt-10">
              <img src="~/assets/login.png" alt="" width="180px" />
              <h1 class="text-title mt-4 " >ตัวเลือกการเข้าสู่ระบบ</h1>
            </div>
            <div>
              <div
                class="w-100 text-center my-btn outlined text-primary mt-5"
                @click="userid"
              >
                ล็อกอินด้วยบัญชีอีเมลล์
              </div>
              <p class="text-center  mt-4 ">หรือ</p>
              <v-btn
                rounded
                color="green"
                dark
                class="w-100 mt-0 my-btn1"
                @click="line"><img class="imgline" src="~/assets/line.png"  alt="" width="40px" />ล็อกอินด้วยบัญชี Line</v-btn
              >
              <v-btn
                rounded
                color="green"
                dark
                class="w-100 mt-0 my-btn1"
                @click="login"><img class="imgline" src="~/assets/line.png"  alt="" width="40px" />เข้าสู่ระบบ Line</v-btn
              >
              <div class="text-right mt-2 ">
                ยังไม่มีบัญชีใช่ไหม
                <router-link :to="{name:'register'}">สมัครใช้งาน</router-link>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: this.$store.getters.getRegister.firstname
    }
  },
  methods: {
    userid() {
      this.$router.push("/login/LoginEmail");
    },
    line() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/index");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application .primary{
  background-color: #26A69A !important;
  border-color: #26A69A !important;
}
.my-btn{
  font-size: 20px!important;
  text-transform: none !important;
  height: auto;
  padding: 10px 0 !important;
  // font-weight: bold;
  min-height: 50px ;
  &.outlined{
    border: 1px solid #26A69A ;
    border-radius: 28px;
    line-height: normal;
}
}
.my-btn{

font-size: 15px!important;
text-transform: none !important;
height: auto;
padding: 10px 0 !important;
// font-weight: bold;
min-height: 50px ;
}
.my-btn1{

  font-size: 15px!important;
  text-transform: none !important;
  height: auto;
  padding: 10px 0 !important;
  // font-weight: bold;
  min-height: 50px ;
}
</style>
