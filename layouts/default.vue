<template>
  <v-app>
    <nuxt></nuxt>
    <Dialog/>
  </v-app>
</template>

<script>
import Dialog from '~/components/Dialog.vue';
export default{
  components:{
    Dialog
  }
}
</script>
<style lang="scss">
.v-application{
  font-family: 'Roboto', sans-serif;
}
 .v-toolbar__title{
    text-align: center;
    width: 100%;;
    font-weight: bold ;
}
.v-application .primary{
  background-color: #26A69A !important;
  border-color: #26A69A !important;
}
.text-primary{
  color: #26A69A;
}
.text-main{
  font-size: 20px;
}
.text-title{
  font-size: 20px;
  font-weight: bold;
}
.w-100{
  width: 100%;
}
.my-btn{
  font-size: 20px!important;
  text-transform: none !important;
  height: auto;
  padding: 10px 0 !important;
  font-weight: bold;
  min-height: 50px ;
  &.outlined{
    border: 1px solid #26A69A ;
    border-radius: 28px;
    line-height: normal;
}
}
.set-padding{
  padding: 0 10px;
}


</style>
