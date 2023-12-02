<template>
<div>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Register/สมัครสมาชิก</v-toolbar-title>
    </v-app-bar>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div>Register</div>

      <v-text-field
        type="text"
        v-model="member.member_id"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>


      <v-text-field
        type="password"
        v-model="member.full_name"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="member.email"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="member.password"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="member.status"
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
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"

        ><router-link :to="{ name: '/register/registrationpage' }">Sign up now <v-icon icon="mdi-chevron-right"></v-icon></router-link>

        </a>
      </v-card-text>
    </v-card>
  </div>
  <div class="vue-tempalte">
    <form @submit.prevent="submitForm" method="post">
      <h3>Sign Up/ลงทะเบียนเข้าสู่ระบบ</h3>
      <div class="form-group">
        <input
          type="text"
          name="member_id"
          v-model="member.member_id"
          placeholder="Id/รหัส"
          class="form-control form-control-lg"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="full_name"
          v-model="member.full_name"
          placeholder="Full Name/ชื่อ-นามสกุล"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          name="email"
          v-model="member.email"
          placeholder="E-mail/ชื่อผู้ใช้"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <input
          type="password"
          name="password"
          v-model="member.password"
          placeholder="Password/รหัสผ่าน"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <input
          type="text"
          name="status"
          v-model="member.status"
          placeholder="Status/สถานะ"
          class="form-control form-control-lg"
        />
      </div>
      <div>
        <div class="topbutton">
            <v-btn
              class="buttonForm"
              depressed
              type="submit"
              color="#28a745"
              value="Save/บันทึก"
              >Sign Up / ลงทะเบียน</v-btn
            >
    </div>
      </div>
      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'LoginPage' }">Sign in/เข้าสู่ระบบ?</router-link>
      </p>
    </form>
  </div>
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Full Name</th>
          <th scope="col">E-mail</th>
          <th scope="col">Password</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in members" :key="row.index">
          <td>{{ row.member_id }}</td>
          <td>{{ row.full_name }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.password }}</td>
          <td>{{ row.status }}</td>
          <td>
            <v-btn depressed color="#3366FF" @click="editUser(row.member_id)">Edit</v-btn>
          </td>
          <td>
             <v-btn depressed color="#FF3333" @click="deleteUser(row.member_id)">Delete</v-btn>

          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      members: [],
      member: {
        member_id: "",
        full_name: "",
        email: "",
        password: "",
        status:"",
      },

    };
  },
  methods: {
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("member:", this.member);
        const newMember = {
          member_id: this.member.member_id,
          full_name: this.member.full_name,
          email: this.member.email,
          password: this.member.password,
          status: this.member.status,
        };
        this.$emit("saveData", newMember);
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
      } else {
        axios
          .post("https://icp2022.net/ICPScoreCard/api-member.php", {
            action: "update",
            member_id: this.member.member_id,
            full_name: this.member.full_name,
            email: this.member.email,
            password: this.member.password,
            status: this.member.status,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    cancle(){
      this.$router.replace({ name: "index" });
      },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-member.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.members = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editUser(id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-member.php", {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log(response);
          self.member.member_id = response.data.member_id;
          self.member.full_name = response.data.full_name;
          self.member.email = response.data.email;
          self.member.password = response.data.password;
          self.member.status= response.data.status;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      this.member.member_id = 0;
      this.member.full_name = "";
      this.member.email = "";
      this.member.password = "";
      this.member.status = "";
    },
    deleteUser(id) {
      if (confirm("คุณต้องการลบรหัส " + id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api-member.php", {
            action: "delete",
            id: id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created(){
    this.getAllUser();
  }
};
</script>
<style scoped>
h3 {
  color: #2f855a;
  text-align: center;
}
select {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}
label {
  color: #2f855a;
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  cursor: pointer;
  padding: 0.05rem 1rem;
  border-radius: 15px;
}
</style>
