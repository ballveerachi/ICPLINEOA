<template>
  <div>
    <v-app-bar dense flat dark>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="100%"
      rounded="lg"
    >
      <v-main>
        <!-- Form  -->
        <v-form
          @submit.prevent="submitForm"
          @reset.prevent="resetForm"
          method="post"
        >
          <v-container class="pt-0 pb-0">
            <v-row>
              <v-col cols="12" md="6">
                <div>รหัสสมาชิก:</div>
                <v-text-field
                  type="text"
                  v-model="employee.id"
                  placeholder="Id/รหัส"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div>ชื่อ-สกุล :</div>
                <v-text-field
                  type="text"
                  v-model="employee.name"
                  placeholder="ชื่อ-สกุล"
                  prepend-inner-icon=" mdi-account-circle"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6"
                ><div>สาขาวิชา:</div>
                <v-select
                  required
                  size="4"
                  v-model="employee.study_faculty"
                  label="เลือก"
                  :items="study_facultyTypes"
                  variant="outlined"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดสาขาวิชา:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template></v-select
                >
              </v-col>
              <v-col cols="12" md="6"
                ><div>สำเร็จการศึกษาสถาบัน:</div>
                <v-select
                  size="4"
                  required
                  v-model="employee.university"
                  label="เลือก"
                  :items="universityTypes"
                  variant="outlined"
                  ><template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดสถาบันการศึกษา:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template></v-select
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col
                ><div>ความบกพร่อง:</div>
                <v-select
                  required
                  size="4"
                  v-model="employee.disability_type"
                  label="เลือก"
                  :items="disabilityTypes"
                  variant="outlined"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดความบกพร่อง:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <div class="d-flex flex-column">
              <v-btn
                color="success"
                type="submit"
                class="mt-4"
                depressed
                exactblock
                value="Save/บันทึก"
                >{{ status }}
              </v-btn>

              <v-btn
                color="error"
                type="reset"
                class="mt-4"
                depressed
                block
                value="Cancel/ยกเลิก"
                >Cancel/ยกเลิก
              </v-btn>
            </div>
          </v-container>
        </v-form>
        <!-- data-table -->
        <v-card class="mx-auto table" max-width="800px" cols="12" md="6">
          <v-card text="..." variant="tonal">แก้ไขข้อมูล</v-card>
          <v-row>
            <v-col> ID</v-col>
            <v-col>Name</v-col>
            <v-col>Study Faculty</v-col>
            <v-col>University</v-col>
            <v-col>Disibility type</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="row in employees" :key="row.index" cols="12" md="6">
            <v-col>{{ row.id }}</v-col>
            <v-col>{{ row.name }}</v-col>
            <v-col>{{ row.study_faculty }}</v-col>
            <v-col>{{ row.university }}</v-col>
            <v-col>{{ row.disability_type }}</v-col>
            <v-col
              ><v-btn @click="editUser(row.id)"
                ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
              >
              <v-btn @click="deleteUser(row.id)"
                ><v-icon small class="mr-2"> mdi-delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- /data-table -->
      </v-main>
    </v-card>
  </div>
</template>


<script>
import axios from "axios";
import liff from "@line/liff";
export default {
  mounted() {
    liff.init({ liffId: "2000700725-YNm3KNNg" });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.userId = profile.userId;
          console.log("ข้อมูลจากLine112255", profile);
          console.log("LineID4545", this.userId);
          this.checkMember(this.userId,this.userId);
        });
      } else {
        liff.login();
      }
    });
  },
  name: "FormComponent",
  data() {
    return {
      pageTitle: "ข้อมูลส่วนตัว",
      message: "Form Component (แบบฟอร์มบันทึกข้อมูล)",
      employees: [],
      employees_: [],
      employee: {
        // id: this.$store.getters.myMember_id,
        // name: this.$store.getters.myName,
        id:"",
        name: "",
        study_faculty: "",
        university: "",
        disability_type: "",
        isVisible: false,
      },
      study_facultyTypes: [
        "เกษตรศาสตร์",
        "พืชสวน",
        "พืชไร่",
        "อารักขาพืช",
        "ปฐพีศาสตร์",
        "การส่งเสริมและสื่อสารเกษตร",
        "เกษตรเคมี",
        "การพัฒนาภูมิสังคมอย่างยั่งยืน",
        "วิทยาการสมุนไพร",
        "การจัดการและพัฒนาทรัพยากร",
        "วิศวกรรมเกษตร",
        "วิศวกรรมอาหาร",
        "วิทยาศาสตร์และเทคโนโลยีการอาหาร",
        "เทคโนโลยีหลังการเก็บเกี่ยว",
        "เทคโนโลยียางและพอลิเมอร์",
        "วิทยาการคอมพิวเตอร์",
        "คณิตศาสตร์",
        "เทคโนโลยีชีวภาพ",
        "เทคนิคการแพทย์",
        "เคมี",
        "สถิติและการจัดการสารสนเทศ",
        "เทคโนโลยีสารสนเทศ",
        "วัสดุศาสตร์",
        "ฟิสิกส์ประยุกต์",
        "รัฐประศาสนศาสตร์",
      ],
      disabilityTypes: [
        "การมองเห็น",
        "การได้ยิน",
        "สติปัญญา",
        "การเคลื่อนไหวร่างกาย หรือสุขภาพ",
        "การเรียนรู้",
        "การพูด และภาษา",
        "พฤติกรรม หรืออารมณ์",
        "ออทิสติก",
        "พิการซ้อน",
      ],
      universityTypes: [
        "มหาวิทยาลัยเชียงใหม่",
        "มหาวิทยาลัยแม่โจ้",
        "มหาวิทยาลัยราชภัฏเชียงใหม่",
        "วิทยาลัยเทคโนโลยีราชมงคล",
        "วิทยาการคอมพิวเตอร์",
        "วิทยาลัยเทคนิคเชียงใหม่",
      ],

      isEdit: false,
      status: "Save/บันทึก",
    };
  },
  head() {
    return {
      title: this.pageTitle,
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.employee.id = 0;
      // this.employee.name = "";
      this.employee.study_faculty = "";
      this.employee.university = "";
      this.employee.disability_type = "";
      this.employee.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log("data-Y-Y", res.data);
          self.employees = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("Form employee:", this.employee);
        const newEmployee = {
          id: this.employee.id,
          name: this.employee.name,
          study_faculty: this.employee.study_faculty,
          university: this.employee.university,
          disibility_type: this.employee.disability_type,
          isVisible: this.employee.isVisible,
        };
        this.$emit("saveData", newEmployee);
        axios
          .post("https://icp2022.net/ICPScoreCard/api.php", {
            action: "insert",
            id: this.employee.id,
            name: this.employee.name,
            // id: 121,
            // name: "วีรชัย แก้วขอด",
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disibility_type: this.employee.disability_type,
          })
          .then((res) => {
            this.sendMessages();
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("https://icp2022.net/ICPScoreCard/api.php", {
            action: "update",
            id: this.employee.id,
            name: this.employee.name,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disability_type: this.employee.disability_type,
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
    editUser(id) {
      this.status = "อัพเดท";
      this.isEdit = true;
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api.php", {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log(response);
          self.employee.id = response.data.id;
          self.employee.name = response.data.name;
          self.employee.study_faculty = response.data.study_faculty;
          self.employee.university = response.data.university;
          self.employee.disability_type = response.data.disability_type;
          self.employees_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(id) {
      if (confirm("คุณต้องการลบรหัส " + id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api.php", {
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
    checkMember(user,pass) {
      console.log(" ตรวจสอบข้อมูลสมาชิก ");
      var username = user;

      var password = pass;
      console.log("username", username);
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-member.php", {
          action: "checkMember",
          user: username,
          pass: password,
        })
        .then(function (res) {
          console.log("data:", res);
          var member_id = res.data.map((item) => item.member_id)[0];
          var full_name = res.data.map((item) => item.full_name)[0];
          console.log("member_id1:", member_id);
          console.log("full_name2", full_name);
          self.employee.id = member_id;
          self.employee.name = full_name;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendMessages() {
      liff
        .sendMessages([
          {
            type: "flex",
            altText: "บันทึกข้อมูล",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                // action: {
                //   type: "uri",
                //   label: "Action",
                //   uri: "https://linecorp.com",
                // },
                contents: [
                  {
                    type: "text",
                    text: "บันทึกข้อมูล",
                    weight: "bold",
                    size: "lg",
                    align: "center",
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "ข้อมูลส่วนตัว",
                    weight: "bold",
                    size: "sm",
                    align: "center",
                    contents: [],
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          // {
                          //   type: "text",
                          //   text: "ID",
                          //   size: "sm",
                          //   color: "#000000FF",
                          //   margin: "sm",
                          //   contents: [],
                          // },
                          // {
                          //   type: "text",
                          //   text: this.employee.id,
                          //   weight: "regular",
                          //   size: "sm",
                          //   color: "#000000FF",
                          //   align: "end",
                          //   contents: [],
                          // },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "ชื่อผู้ใช้",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.employee.name,
                            size: "sm",
                            color: "#000000FF",
                            align: "end",
                            contents: [],
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "สาขาวิชา",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.employee.study_faculty,
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            align: "end",
                            contents: [],
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "สถาบันการศึกษา",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.employee.university,
                            size: "sm",
                            color: "#000000FF",
                            align: "end",
                            contents: [],
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "text",
                            text: "ความบกพร่อง",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.employee.disability_type,
                            size: "sm",
                            color: "#000000FF",
                            align: "end",
                            contents: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "spacer",
                    size: "xxl",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "Next",
                      uri: "https://liff.line.me/2000700725-9k3ANzzp",
                    },
                    height: "sm",
                    style: "primary",
                  },
                  // {
                  //   type: "button",
                  //   action: {
                  //     type: "uri",
                  //     label: "Back",
                  //     uri: "https://elegant-buttercream-fd2e73.netlify.app/",
                  //   },
                  //   color: "#CFC9CAFF",
                  //   height: "sm",
                  //   style: "primary",
                  // },
                ],
              },
            },
          },
        ])
        .then(() => {
          console.log("message sent");
          liff.closeWindow();
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
  created() {
    this.getAllUser();
  },
};
</script>
<style lang="scss" scoped>
.v-application .pa-12 {
  padding: 38px !important;
}
// .v-text-field {
//   padding: 4px 0px;
// }
.table {
  text-align: center;
  padding-top: 15px;
  margin-top: 50px;
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 4%;
  height: 40px;
  font-weight: bold;
}
v-row:nth-child(even) {
  background-color: #f2f2f2;
}
.elevated-app-bar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>
