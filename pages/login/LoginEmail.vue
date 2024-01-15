<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Login/เข้าสู่ระบบ</v-toolbar-title>
    </v-app-bar>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div>Account</div>

      <!-- <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        type="text"
        v-model="input.username"
        :rules="rules"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field> -->

      <v-text-field
        type="text"
        v-model="input.username"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="input.password"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>

      <v-btn
        rounded
        color="#28a745"
        dark
        class="w-100 mt-10 my-btn"
        @click="login()"
        >Log in</v-btn
      >
      <v-btn
        rounded
        color="#DCDCDC"
        dark
        class="w-100 mt-10 my-btn"
        @click="cancle()"
        >Cancel/ยกเลิก</v-btn
      >

      <v-card-text class="text-center">
        <router-link :to="{ name: 'register/RegistrationPage' }"
          >สมัครใช้งาน</router-link
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      member: {
        member_id: "",
        full_name: "",
        status: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        this.checkMember();
      } else {
        console.log("A username and password must be present");
      }
    },
    cancle() {
      this.$router.push("/login");
      console.log(" ยกเลิก ");
    },
    checkMember() {
      console.log(" ตรวจสอบข้อมูลสมาชิก ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-member.php", {
          action: "checkMember",
          user: this.input.username,
          pass: this.input.password,
        })
        .then(function (res) {
          console.log("data:", res);
          self.member.member_id = res.data.map((item) => item.member_id)[0];
          self.member.full_name = res.data.map((item) => item.full_name)[0];
          self.storeCommit(self.member.member_id, self.member.full_name);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    storeCommit(member_id, full_name) {
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
  },
  created() {
    // this.getAllUser();
  },
};
</script>

<style scoped>
