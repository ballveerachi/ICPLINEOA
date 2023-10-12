<template>
  <div>
    <v-app-bar dense flat dark>
      <v-toolbar-title>login</v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="set-padding">
            <div class="text-center mt-10">
              <img src="~/assets/welcome.png" alt="" width="230px" />
              <h1 class="text-title">Success</h1>
              <p class="text_p mt-5">welcome ,{{ name }} to ICP</p>
            </div>
            <div>
              <v-btn
                rounded
                color="primary"
                dark
                class="w-100 mt-9 my-btn"
                @click="home"
                >Home</v-btn
              >
              <div
                class="w-100 text-center my-btn outlined text-primary mt-5"
                @click="close"
              >
                Close
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      name:
      this.$store.getters.getRegister.full_name,

      input: {
        username: this.$store.getters.getLine.userId,
        password:this.$store.getters.getLine.userId ,
      },
      member: {
        member_id: "",
        full_name: "",
      },
    }
  },
  methods: {
    home() {
      console.log(" ตรวจสอบข้อมูลสมาชิก ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-member.php", {
          action: "checkMember",
          user: this.input.username,
          pass: this.input.password,
        })
        .then(function (res) {
          console.log("data:",res)
          self.member.member_id = res.data.map((item) => item.member_id)[0];
          self.member.full_name = res.data.map((item) => item.full_name)[0];
          self.storeCommit(
            self.member.member_id,
            self.member.full_name,
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    storeCommit(member_id, full_name,) {
      console.log("login:", member_id);
      console.log("login:", full_name);
      if (member_id != 0 && full_name != "") {
        this.$store.commit("setMyAuthenticate", true);
        this.$store.commit("setMyMember_id", member_id);
        this.$store.commit("setMyName", full_name);
        this.$router.replace({ name: "index" });
      } else {
        console.log("The username and / or password is incorrect");
      }
    },
    close() {
      liff.closeWindow();
    },
  },
}
</script>

<style lang="scss" scoped>
.text_p {
  font-size: 20px !important;
}
.text-title {
  font-size: 25px !important;
}
</style>
