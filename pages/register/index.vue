<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">
            step 1 of 2
          </div>
        </v-col>
        <v-col cols="12" class="text-center pb-0 profile-img">
          <img v-if="getLine.pictureUrl ==''" src="~/assets/user.png" alt="" width="155"/>
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
              v-model="form.lastname"
              label="Lastname"
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
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-9 my-btn"
              @click="next"
              >next</v-btn
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
          this.$store.dispatch("setLine",profile);
          console.log('lineid',(this.form.userId))
        });
      } else {
        liff.login();
      }
      console.log("Line");
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
        full_name:this.$store.getters.getRegister.full_name,
        member_id: this.$store.getters.getLine.userId,
        firstname : this.$store.getters.getRegister.firstname,
        lastname : this.$store.getters.getRegister.lastname,
        email: 'ewrewrewr',
        phone: '6666',
        birthday: this.$store.getters.getRegister.birthday,
      },
    };
  },
  methods: {
    isDone() {

    },

    validate() {
      let validated = true;
      const errors = [];
      const validatorField = ["fullname",];
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
    register(){
      if(this.validate()){
         this.$store.dispatch('setRegister',this.form)
         console.log("สมัครเรียบร้อย",this.form);
        //this.$router.push("/register/done");
        axios
          .post("http://localhost/ICPScoreCard/api-member.php", {
            action: "insert_register",
            member_id: this.form.member_id,
            full_name: this.form.full_name,
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
