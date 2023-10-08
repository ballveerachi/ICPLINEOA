<template>
  <v-app>
    <v-app-bar dark>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn @click="logout" icon>
        <v-icon >mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <!-- Bar profil -->
        <v-list-item
        prepend-avatar
          :src="getLine.pictureUrl "
          title="John Leider"
          nav
          ><template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn> </template
        ></v-list-item>
        <!--  -->
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-item-action>
          <!-- List sideBar -->
          <v-list-item-content>
            <v-list-item-title/>{{ item.title }}
          </v-list-item-content>
          <!-- List sideBar -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <nuxt></nuxt>
    <Dialog />

  </v-app>
</template>

<script>
import liff from "@line/liff";
import Dialog from "~/components/Dialog.vue";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-account-box",
          title: "ข้อมูลส่วนตัว",
          to: "/FormComponent",
        },
        {
          icon: "mdi-account-check",
          title: "อาชีพเป้าหมาย",
          to: "/FormPlanCareer",
        },
        {
          icon: "mdi-account-key",
          title: "คุณสมบัติ/ทักษะ",
          to: "/FormQualification",
        },
        {
          icon: "mdi-run-fast",
          title: "แผนเรียน/ทำ",
          to: "/FormPlan",
        },
        {
          icon: "mdi-account-search",
          title: "ประเมินตนเอง",
          to: "/FormSelfAssessment",
        },
        {
          icon: "mdi-chart-bar",
          title: "กราฟ",
          to: "/FormPivotTable",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  components: {
    Dialog,
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    logout(){
      this.$router.push("/LogoutPage");
    }
  },
};
</script>
<style lang="scss">
.v-toolbar {
  flex: 0 auto;
}
.v-application.pa-12{
  padding: 100px !important;


}
.v-application {
  font-family: "Roboto", sans-serif;
}
.v-toolbar__title {
  font-size: 25px;
  text-align: center;
  width: 100%;
  font-weight: bold;
}
.v-application .primary {
  background-color: #26a69a !important;
  border-color: #26a69a !important;
}
.text-primary {
  color: #26a69a;
}
.text-main {
  font-size: 20px;
}
.text-title {
  font-size: 20px;
  font-weight: bold;
}
.w-100 {
  width: 100%;
}
.my-btn {
  font-size: 20px !important;
  text-transform: none !important;
  height: auto;
  padding: 10px 0 !important;
  font-weight: bold;
  min-height: 50px;
  &.outlined {
    border: 1px solid #26a69a;
    border-radius: 28px;
    line-height: normal;
  }
}
.set-padding {
  padding: 0 10px;
}
.v-toolbar__content {
  background-color: #26a69a !important;
  border-color: #26a69a !important;
}
.img_respon {
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
// .v-navigation-drawer__content{

// }
</style>
