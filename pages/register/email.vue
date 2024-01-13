<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-app-bar>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-container class="pt-0 pb-0">
        <v-row>
          <v-col cols="12">
            <div class="mt-8 text-primary text-title text-center">
              Sign Up/ลงทะเบียน
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-center">
              <img src="~/assets/profile.jpg" alt="" width="155" />
            </div>
          </v-col>
          <v-col cols="12" class="text-center pt-2 pb-0"> display name </v-col>
          <v-col cols="12">
            <v-col>
              <!-- member_id -->
              <div>Account</div>
              <v-text-field
                type="text"
                variant="solo-filled"
                v-model="member.member_id"
                dense
                label="ID/รหัส"
              ></v-text-field>
              <!--  -->
              <!-- full_name -->
              <v-text-field
                type="text"
                variant="solo-filled"
                v-model="member.full_name"
                dense
                label="full_name/ชื่อ-นามสกุล"
              ></v-text-field>
              <!--  -->
              <!-- E-mail -->
              <v-text-field
                type="text"
                v-model="member.email"
                dense
                label="อีเมลล์/ชื่อผู้ใช้"
              ></v-text-field>
              <!--  -->
              <!-- Passwword -->
              <v-text-field
                type="text"
                v-model="member.password"
                dense
                label="Password/รหัสผ่าน"
              ></v-text-field>
              <!--  -->
              <!-- status -->
              <v-text-field
                type="text"
                v-model="member.status"
                dense
                label="Status/สถานะ"
              ></v-text-field>

              <v-btn
                rounded
                type="submit"
                color="#28a745"
                dark
                class="w-100 mt-10 my-btn"
                @click="next"
                >Sing Up</v-btn
              >
              <v-card-text class="text-center">
                <a
                  class="text-blue text-decoration-none"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <router-link :to="{ name: 'done' }"
                    >Login now <v-icon icon="mdi-chevron-right"></v-icon
                  ></router-link>
                </a>
              </v-card-text>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      members: Array,
      member: {
        member_id: '',
        full_name: '',
        email: '',
        password: '',
        status: '',
      },
    }
  },
  methods: {
    submitForm() {
      if (!this.isEdit) {
        console.log('บันทึกข้อมูล')
        console.log('member:', this.member)
        const newMember = {
          member_id: this.member.member_id,
          full_name: this.member.full_name,
          email: this.member.email,
          password: this.member.password,
          status: this.member.status,
        }
        this.$emit('saveData', newMember)
        axios
          .post('http://localhost/ICPScoreCard/api-member.php', {
            action: 'insert',
            member_id: this.member.member_id,
            full_name: this.member.full_name,
            email: this.member.email,
            password: this.member.password,
            status: this.member.status,
          })
          .then((res) => {
            console.log(res)
            this.resetForm()
            this.getAllUser()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        axios
          .post('http://localhost/ICPScoreCard/api-member.php', {
            action: 'update',
            member_id: this.member.member_id,
            full_name: this.member.full_name,
            email: this.member.email,
            password: this.member.password,
            status: this.member.status,
          })
          .then((response) => {
            console.log(response)
            this.resetForm()
            this.getAllUser()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    cancle() {
      this.$router.replace({ name: 'index' })
    },
    getAllUser() {
      console.log(' แสดงข้อมูลทั้งหมด ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-member.php', {
          action: 'getall',
        })
        .then(function (res) {
          console.log(res)
          self.members = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    editUser(id) {
      this.status = 'Update(อัพเดท)'
      this.isEdit = true
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-member.php', {
          action: 'edit',
          id: id,
        })
        .then(function (response) {
          console.log(response)
          self.member.member_id = response.data.member_id
          self.member.full_name = response.data.full_name
          self.member.email = response.data.email
          self.member.password = response.data.password
          self.member.status = response.data.status
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetForm() {
      this.status = 'บันทึก'
      this.isEdit = false
      console.log('ยกเลิกการบันทึกข้อมูล')
      this.member.member_id = 0
      this.member.full_name = ''
      this.member.email = ''
      this.member.password = ''
      this.member.status = ''
    },
    deleteUser(id) {
      if (confirm('คุณต้องการลบรหัส ' + id + ' หรือไม่ ?')) {
        var self = this
        axios
          .post('http://localhost/ICPScoreCard/api-member.php', {
            action: 'delete',
            id: id,
          })
          .then(function (response) {
            console.log(response)
            self.resetForm()
            self.getAllUser()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    // chooseGender(gender) {
    //   this.form.gender = gender

    // },
    validate() {
      let validated = true
      const errors = []
      const validatorField = [
        'member_id',
        'full_name',
        'email',
        'password',
        'status',
      ]
      validatorField.forEach((field) => {
        if (this.form[field] == '') {
          validated = false
          errors.push(`${field} can not be null`)
        }
      })
      if (!validated) {
        this.$store.dispatch('setDialog', {
          isShow: true,
          title: 'Form is error',
          message: errors.map((error) => error + '</br>').join(''),
        })
      }
      return validated
    },
    next() {
      if (this.validate()) {
        this.$store.dispatch('setRegister', this.form)
        this.$router.push('/register/step2')
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}

.gender-group {
  p {
    margin-bottom: 0;
    align-self: center;
    margin-right: 20px;
  }
  .circle {
    width: 45px;
    height: 45px;
    color: #fff;
    border-radius: 50%;
    position: relative;
    background: rgba($color: #000000, $alpha: 0.3);
    margin-right: 7px;
    &.active {
      background: #1a56be;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

