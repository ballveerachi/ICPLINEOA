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
              <img src="~/assets/user.png" alt="" width="155" />
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
      <v-card class="mx-auto table" max-width="800px" cols="12" md="6">
            <v-card text="..." variant="tonal">แก้ไขข้อมูล</v-card>
            <v-row>
              <v-col>Id</v-col>
              <v-col>Full-Name</v-col>
              <v-col>E-mail</v-col>
              <v-col>Password</v-col>
              <v-col>Status</v-col>
            </v-row>
            <v-row
              v-for="row in members"
              :key="row.member_id"
              cols="12"
              md="6"
            >
              <v-col>{{ row.member_id }}</v-col>
              <v-col>{{ row.full_name }}</v-col>
              <v-col>{{ row.email }}</v-col>
              <v-col>{{ row.password }}</v-col>
              <v-col>{{ row.status }}</v-col>

              <v-col
                ><v-btn @click="editUser(row.member_id)"
                  ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
                >
                <v-btn @click="deleteUser(row.member_id)"
                  ><v-icon small class="mr-2"> mdi-delete </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
    </v-card>
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
        status: "",
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
    cancle() {
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
          self.member.status = response.data.status;
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
  created() {
    this.getAllUser();
  },
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
