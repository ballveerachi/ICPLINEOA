<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-app-bar>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="set-padding">
            <div class="text-center mt-10">
              <img src="~/assets/welcome.png" alt="" width="230px" />
              <h1 class="text-title">Welcome,{{name}}</h1>
              <p class="mt-5">welcome to ICP</p>
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
export default {
  data(){
    return{
      name: this.$store.getters.getRegister.firstname
    }
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    close() {
      liff.closeWindow();
    },
  },
};
</script>

<style>
</style>
