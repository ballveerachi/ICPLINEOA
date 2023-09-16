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
              v-model="form.firstname"
              label="Firstname"
              dense
              required
            ></v-text-field>
            <v-text-field
              v-model="form.lastname"
              label="Lastname"
              dense
              required
            ></v-text-field>
          </v-form>
          <div>
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-9 my-btn"
              @click="next"
              >Next</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import liff from "@line/liff";
export default {
  mounted() {
    liff.init({ liffId: "2000700725-PRVZgqqz" });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.$store.dispatch("setLine",profile);
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
        firstname: this.$store.getters.getRegister.firstname,
        lastname: this.$store.getters.getRegister.lastname,
      },
    };
  },
  methods: {
    isDone() {

    },

    validate() {
      let validated = true;
      const errors = [];
      const validatorField = ["firstname", "lastname"];
      validatorField.forEach((field) => {
        if (this.form[field] == "") {
          validated = false;
          errors.push(`${field} can not be null`);
        }
      });
      if (!validated) {
        this.dialog = true;
        this.$store.dispatch("setDialog", {
          isShow: true,
          title: "Form is error",
          message: errors.map((error) => error + "</br>").join(""),
        });
      }
      return validated;
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
