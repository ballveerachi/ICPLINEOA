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
        <v-form
          @submit.prevent="submitForm"
          @reset.prevent="resetForm"
          method="post"
        >
          <v-container class="pt-0 pb-0">
            <v-row>
              <v-col cols="12" md="6">
                <div>รหัสอาชีพ:</div>
                <v-text-field
                  type="text"
                  name="plan-Career-id"
                  v-model="planCareer.Plan_Career_id"
                  placeholder="PC-ID/รหัสอาชีพ"
                  prepend-inner-icon="mdi-account-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div>รหัสสมาชิก:</div>
                <v-text-field
                  type="text"
                  name="Employee-id"
                  v-model="planCareer.Employee_id"
                  placeholder="Id/รหัส"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="input-field col s4">
                <div>แผนอาชีพ:</div>

                <v-select
                  :size="4"
                  v-model="planCareer.career_id"
                  :items="careers"
                  return-object
                  label="เลือก"
                  item-value="career_id"
                  item-text="career"
                  dense
                  variant="outlined"
                  @change="(val) => onPlanCareerChange(val)"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดอาชีพ:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span>{{ item.career_id }} - {{ item.career }}</span>
                  </template>
                  <template v-slot:item="{ item }">
                    <span>{{ item.career_id }} - {{ item.career }}</span>
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
        <v-card class="mx-auto table" max-width="800px" cols="12" md="6">
          <v-card text="..." variant="tonal">แก้ไขข้อมูล</v-card>
          <v-row>
            <v-col>PlanCareer-ID</v-col>
            <v-col>Employee-ID</v-col>
            <v-col>Career ID</v-col>
            <v-col>Career</v-col>
            <v-col>Name</v-col>
            <v-col>University</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="row in planCareers" :key="row.index" cols="12" md="6">
            <v-col>{{ row.Plan_Career_id }}</v-col>
            <v-col>{{ row.Employee_id }}</v-col>
            <v-col>{{ row.career_id }}</v-col>
            <v-col>{{ row.career }}</v-col>
            <v-col>{{ row.name }}</v-col>
            <v-col>{{ row.university }}</v-col>
            <v-col
              ><v-btn @click="editUser(row.Plan_Career_id)"
                ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
              >
              <v-btn @click="deleteUser(row.Plan_Career_id)"
                ><v-icon small class="mr-2"> mdi-delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-main>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    liff.init({ liffId: "2000700725-PRVZgqqz" });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.userId = profile.userId;
          console.log("ข้อมูลจากLine", profile);
          console.log("LineID", this.userId);
        });
      } else {
        liff.login();
      }
    });
  },
  name: "FormPlanCareer",
  data() {
    return {
      pageTitle: "อาชีพเป้าหมาย",
      message: "Form Plan Career",
      planCareers: [],
      planCareers_: [],
      careers: [],
      //Plan_Career_id	Employee_id	Name_Plan_Career Description
      planCareer: {
        Plan_Career_id: "",
        Employee_id: this.$store.getters.myMember_id,
        career_id: "",
        career: "",
      },
      LineCareer : "",

      isEdit: false,
      status: "Save/บันทึก",
    };
  },
  methods: {
    //แก้ไขให้มันเป็นช่องว่าง
    resetForm() {
      this.status = "Save/บันทึก";
      this.isEdit = false;
      console.log("ยกเลิก");
      this.planCareer.Plan_Career_id = "";
      this.planCareer.career_id = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-plan-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log("ข้อมูลแผนอาชีพ:", res.data);
          self.planCareers = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-career.php", {
          action: "getall",
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers :", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("Employee_id", this.planCareer.Employee_id);
        console.log("career_id", this.planCareer.career_id.career_id);
        const newPlanCareer = {
          Employee_id: this.planCareer.Employee_id,
          career_id: this.planCareer.career_id.career_id,

        };
        this.$emit("saveData", newPlanCareer);

        axios
          .post("https://icp2022.net/ICPScoreCard/api-plan-career.php", {
            action: "insert",
            Employee_id: this.planCareer.Employee_id,
            career_id: this.planCareer.career_id.career_id,

          })
          .then((res) => {
            console.log(res);
            this.sendMessages();
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("https://icp2022.net/ICPScoreCard/api-plan-career.php", {
            action: "update",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Employee_id: this.planCareer.Employee_id,
            career_id: this.planCareer.career_id.career_id,
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
    editUser(Plan_Career_id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      console.log("Plan_Career_id:", Plan_Career_id);
      axios
        .post("https://icp2022.net/ICPScoreCard/api-plan-career.php", {
          action: "edit",
          Plan_Career_id: Plan_Career_id,
        })
        .then(function (response) {
          self.planCareer.Plan_Career_id = response.data.Plan_Career_id;
          self.planCareer.Employee_id = response.data.Employee_id;
          self.planCareer.career_id.career_id = response.data.career_id.career_id;
          self.planCareer.career = response.data.career;
          self.planCareers_ = response.data;
          console.log("แก้ไขแผนอาชีพ:", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(Plan_Career_id) {
      if (confirm("คุณต้องการลบรหัส " + Plan_Career_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api-plan-career.php", {
            action: "delete",
            Plan_Career_id: Plan_Career_id,
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
                    text: "อาชีพเป้าหมาย",
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
                          {
                            type: "text",
                            text: "ID",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text:this.planCareer.Employee_id,
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
                            text: "รหัสอาชีพ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.planCareer.Employee_id,
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
                            text: "แผนอาชีพ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text:this.LineCareer,
                            weight: "regular",
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
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormQualification",
                    },
                    height: "sm",
                    style: "primary",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "Back",
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormComponent",
                    },
                    color: "#CFC9CAFF",
                    height: "sm",
                    style: "primary",
                  },
                ],
              },
            },
          },
        ])
        .then(() => {
          console.log("message sent");
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    onPlanCareerChange(val){

      this.LineCareer =val.career
      console.log("onPlanCeerName",this.LineCareer);
    }
  },
  created() {
    this.getAllUser();
    this.getCareer();
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
</style>


