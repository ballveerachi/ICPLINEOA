<template>
  <div>
      <v-toolbar-title>Register</v-toolbar-title>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12" >
          <div class="mt-7 text-primary text-title text-center">
            step 2 of 2
          </div>
        </v-col>
        <v-col cols="12" >
          <v-form>
            <p class="text-center text-main mb-0 mt-4">
              Tell us more a bit ...
            </p>
            <v-text-field v-model="form.email"
            dense
            :rules="emailRules"
            label="Email"
            >
            </v-text-field>
            <v-text-field
              v-model="form.phone"
              dense
              :rules="phoneRules"
              @keypress="onlyNumber($event,10)"
              label="Phone"

            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.birthday"
                  label="BirthDay"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  class="set-brithday"
                ></v-text-field>
              </template>
              <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="form.birthday" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(form.birthday)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-9 my-btn"
              @click="register"
              >Register</v-btn
            >
            <div class="w-100 text-center my-btn text-primary" @click="back">
              back
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const REGEX_EMAIL =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
import axios from "axios";
export default {
  data() {
    return {
      form: {
        member_id: this.$store.getters.getLine.userId,
        firstname : this.$store.getters.getRegister.firstname,
        lastname : this.$store.getters.getRegister.lastname,
        email: this.$store.getters.getRegister.email,
        phone: this.$store.getters.getRegister.phone,
        birthday: this.$store.getters.getRegister.birthday,
      },

      modal: false,
      emailValidated: false,
      phoneValidated: false,
      emailRules:[value => this.emilValidator(value)],
      phoneRules:[value => this.phoneValidator(value)]

    };
  },
  methods: {
    phoneValidator(value){
      this.phoneValidated = false
      if(value==''){
        return 'required'
      }
      if(REGEX_PHONE.test(value) && value.length == 10){
        this.phoneValidated = true
        return true
      }
      return 'Plase input phone number'
    },

    emilValidator(value){
      this.emailValidated = false
      if(value==''){
        return 'required'
      }
      if(REGEX_EMAIL.test(value)){
        this.emailValidated = true
        return true
      }
      return"email is Invalid "
    },
    onlyNumber(event,max ){
      if(event.target.value.length == 0){
        if(event.key !=0){
          return event.preventDefault();
        }
      }else{
        if(!REGEX_NUMBER.test(event.key)||event.target.value.length == max){
        return event.preventDefault();
      }

      }

    },

    back() {
      this.$router.push("/register");
    },

    register() {
      if(this.validate()){
         this.$store.dispatch('setRegister',this.form)
         console.log("สมัครเรียบร้อย",this.form);
        //this.$router.push("/register/done");
        axios
          .post("https://icp2022.net/ICPScoreCard/api-member.php", {
            action: "insert",
            member_id: this.member.member_id,
            full_name: this.member.full_name,
            email: this.member.email,
            password: this.member.password,
            status: this.member.status,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    },

    validate(){
    let validated = true
    const errors =[]
    const validatorField= [
    'email',
    'phone',
    ]
    validatorField.forEach((field) => {
      if(this.form[field] == ''){
         validated = false
         errors.push(`${field} can not be null`)

      }
    })
    if(!this.emailValidated){
      validated = false
      errors.push(` email is Invalid`)
    }
    if(!this.phoneValidated){
      validated = false
      errors.push(` Plase input phonenumber`)
    }
    if(!validated){
      this.dialog = true
      this.$store.dispatch('setDialog',{
        isShow: true,
        title:'Form is error',
        message:errors.map((error) => error+ "</br>").join('')
      })
    }
    return validated
  },
  },
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
.set-brithday{
  position: relative;
  ::v-deep .v-input__prepend-outer{
    position: absolute;
    right: 0;
  }

}
</style>
