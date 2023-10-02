<template>
  <div>
    <v-app-bar dense flat dark>
      <v-toolbar-title>login</v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">
            กรอกชื่อที่ต้องการ
          </div>
        </v-col>
        <v-col cols="12" class="text-center pb-0 profile-img">
          <img
            v-if="getLine.pictureUrl == ''"
            src="~/assets/user.png"
            alt=""
            width="155"
          />
          <img v-else :src="getLine.pictureUrl" alt="" width="155" />
        </v-col>
        <v-col cols="12" class="text-center pt-2 pb-0">
          {{ getLine.displayName }}
        </v-col>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="form.full_name"
              label="Fullname/ชื่อ-นามสกุล"
              dense
              required
            ></v-text-field>
            <!-- <v-text-field
              v-model="form.member_id"
              label="member_id"
              dense
              required
            ></v-text-field> -->
          </v-form>
          <div>
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-9 my-btn"
              @click="register"
              >Register</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import liff from "@line/liff";
export default {
  mounted() {
    liff.init({ liffId: "2000700725-PRVZgqqz" });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.form.id = profile.userId;
          this.$store.dispatch("setLine", profile);
          // this.isDone();
          console.log("ข้อมูลจากLine", profile);
          console.log("LineID", profile.userId);
        });
      } else {
        liff.login();
      }
    });
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
  },

  data() {
    return {
      form: {
        id:'',
        member_id: '',
        full_name: '',
      },
    };
  },
  methods: {
    // isDone() {
    //   axios
    //     .get("http://localhost/ICPScoreCard/api-member.php/", {
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data != null) {
    //         this.$router.push("/register/done");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    validate() {
      let validated = true;
      const errors = [];
      const validatorField = ["full_name"];
      validatorField.forEach((field) => {
        if (this.form[field] == "") {
          validated = false;
          errors.push(` กรุณากรอก ชื่อ-นามสกุล`);
        }
      });
      if (!validated) {
        this.dialog = true;
        this.$store.dispatch("setDialog", {
          isShow: true,
          title: "ข้อมูลไม่ถูกต้อง !",
          message: errors.map((error) => error + "</br>").join(""),
        });
      }
      return validated;
    },
    register() {
      if (this.validate()) {
        console.log("สมัครเรียบร้อย", this.form);
        axios
          .post("http://localhost/ICPScoreCard/api-member.php", {
            action: "insert_register",
            member_id: this.form.member_id,
            full_name: this.form.full_name,
            id:this.form.member_id,
            // email: this.member.email,
            // password: this.member.password,
            // status: this.member.status,
          })
          .then((res) => {
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });

        this.$router.push("/register/done");
        this.$store.dispatch("setRegister", this.form);
      }
    },

    next() {
      if (this.validate()) {
        this.$store.dispatch("setRegister", this.form);
        this.$router.push("/register/step2");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
.profile-img {
  img {
    border-radius: 50%;
  }
}
</style>
