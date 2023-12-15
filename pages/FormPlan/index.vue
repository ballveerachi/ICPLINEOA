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
              <!-- Plan_Career_id -->
              <v-col cols="12" md="6">
                <div for="career_plan-id">รหัสแผนเรียน/ทำ:</div>
                <v-text-field
                  type="text"
                  v-model="plan.planId"
                  placeholder="Id/รหัส"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                >
                </v-text-field>
              </v-col>
              <!--  -->
              <!-- Plan_Career_id -->
              <v-col cols="12" md="6">
                <div>รหัสแผนอาชีพ:</div>
                <v-select
                  :size="4"
                  v-model="plan.Plan_Career_id"
                  :required="true"
                  return-object
                  @change="(val) => getQualification(val)"
                  :items="careers"
                  label="เลือก"
                  item-value="Plan_Career_id"
                  item-text="career"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดรหัสแผนอาชีพ:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span>{{ item.Plan_Career_id }} - {{ item.career }}</span>
                  </template>
                  <template v-slot:item="{ item }">
                    <span>{{ item.Plan_Career_id }} - {{ item.career }}</span>
                  </template>
                </v-select>
              </v-col>
              <!--  -->
              <!-- qa_plan_career_id -->
              <v-col>
                <div>รหัสคุณสมบัติ:</div>
                <v-select
                  :size="4"
                  v-model="qa_plan_career_id"
                  :items="career_qualifications"
                  return-object
                  label="เลือก"
                  item-value="qa_plan_career_id"
                  item-text="qualification_name"
                  variant="outlined"
                  @change="(val) => onQualificationChange(val)"
                >
                  <template v-slot:prepend-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span class="grey--text">กำหนดรหัสคุณสมบัติ:</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span
                      >{{ item.qa_plan_career_id }} -
                      {{ item.qualification_name }}</span
                    >
                  </template>
                  <template v-slot:item="{ item }">
                    <span
                      >{{ item.qa_plan_career_id }} -
                      {{ item.qualification_name }}</span
                    >
                  </template>
                </v-select>
              </v-col>

              <!--  -->
            </v-row>
            <v-row>
              <v-col>
                <div><label for="leaning">แผนการเรียนรู้:</label></div>
                <v-text-field
                  type="text"
                  name="leaning"
                  v-model="plan.leaning"
                  placeholder="Learnning plan/แผนการเรียนรู้"
                  variant="outlined"
                  class="form-control form-control-lg"
                >
                </v-text-field> </v-col
            ></v-row>

            <!-- plan.doing -->
            <v-row>
              <v-col>
                <label for="doing">แผนปฏิบัติการ:</label>
                <v-text-field
                  type="text"
                  name="doing"
                  v-model="plan.doing"
                  placeholder="Do/สิ่งที่ทำในแผนปฏิบัติการ"
                  variant="outlined"
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--  -->

            <!-- calendar -->
            <!-- plan_start_date -->
            <v-row>
              <v-col cols="12" md="6">
                <div>วันที่เริ่มแผน:</div>
                <v-dialog
                  ref="dialog1"
                  v-model="modal_plan_start_date"
                  :return-value.sync="plan.plan_start_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="plan.plan_start_date"
                      label="เลือก"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="plan.plan_start_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal_plan_start_date = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(plan.plan_start_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!--  -->

              <!-- calendar -->
              <!-- plan_end_date -->
              <v-col cols="12" md="6">
                <div>วันที่สิ้นสุดแผน:</div>
                <v-dialog
                  ref="dialog2"
                  v-model="modal_plan_end_date"
                  :return-value.sync="plan.plan_end_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="plan.plan_end_date"
                      label="เลือก"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="plan.plan_end_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal_plan_end_date = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog2.save(plan.plan_end_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!--  -->
              <!--  -->
            </v-row>
            <!--  -->
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
          <v-row class="td">
            <v-col cols="2" md="1">P-ID </v-col>
            <v-col cols="2" md="1">QA-ID</v-col>
            <v-col cols="2" md="2">Lean</v-col>
            <v-col cols="2" md="2">Do</v-col>
            <v-col cols="2" md="2">PlanStartDate</v-col>
            <v-col cols="2" md="2">PlanEndDate</v-col>
            <v-col cols="2" md="2">Action</v-col>
          </v-row>
          <v-row v-for="row in plans" :key="row.index" cols="12" md="6">
            <v-col cols="2" md="1">{{ row.planId }}</v-col>
            <v-col cols="2" md="1">{{ row.qa_plan_career_id }}</v-col>
            <v-col cols="2" md="2">{{ row.leaning }}</v-col>
            <v-col cols="2" md="2">{{ row.doing }}</v-col>
            <v-col cols="2" md="2">{{ row.plan_start_date }}</v-col>
            <v-col cols="2" md="2">{{ row.plan_end_date }}</v-col>
            <v-col cols="2" md="2"
              ><v-btn @click="editUser(row.planId)"
                ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
              >
              <v-btn @click="deleteUser(row.planId)"
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
import liff from "@line/liff";
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
  name: "FormPlan",
  data() {
    return {
      pageTitle: "รายงานประเมินตัวเอง",
      message: "Form Plan Career",
      careers: [],
      qa_plan_career: [],
      career_qualifications: [],
      plans: [],
      plans_: [],
      plan_qualification: [],
      qualificationIds: [],
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      modal_plan_start_date: false,
      modal_plan_end_date: false,

      // plan_career_id:"",
      // planId:	qualificationId	doing leaning
      plan: {
        planId: "",
        qualificationId: "",
        qa_plan_career_id: "",
        qualification_name: "",
        doing: "",
        leaning: "",
        planCareerId: "",
        Plan_Career_id: "",
        plan_start_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        plan_end_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      },
      Line: {
        career:" ",
        QaName: " ",
        qualificationName: " ",
      },
      isEdit: false,
      status: "Save/บันทึก",
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิก");
      // this.plan.planId = 0;
      (this.plan.qa_plan_career_id = ""), (this.plan.qualificationId = "");
      this.plan.doing = "";
      this.plan.leaning = "";
      this.plan.plan_start_date = "";
      this.plan.plan_end_date = "";
      this.plan.Plan_Career_id = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-plan.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.plans = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-career-qualification.php", {
          action: "getEmpCareer",
          employee_id: this.employee_id,
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers:", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQualification(val) {
      this.Line.career =val.career
      console.log("เลือก", val.career);
      console.log("แผนอาชีพ", val.Plan_Career_id);
      console.log("แผนอาชีพ", this.plan.Plan_Career_id);
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-career-qualification.php", {
          action: "getCareer_Qualifiation",
          Plan_Career_id: this.plan.Plan_Career_id.Plan_Career_id,
        })
        .then(function (res) {
          console.log("ข้อมูลคุณสมบัติ", res.data);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึก");
        console.log("Form Plan Career:", this.plan.qa_plan_career_id);
        const newPlan = {
          planId: this.plan.planId,
          qa_plan_career_id: this.plan.qa_plan_career_id,
          doing: this.plan.doing,
          leaning: this.plan.leaning,
          plan_start_date: this.plan.plan_start_date,
          plan_end_date: this.plan.plan_end_date,
        };
        this.$emit("saveData", newPlan);

        axios
          .post("https://icp2022.net/ICPScoreCard/api-plan.php", {
            action: "insert",
            planId: this.plan.planId,
            qa_plan_career_id: this.plan.qa_plan_career_id,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
            plan_start_date: this.plan.plan_start_date,
            plan_end_date: this.plan.plan_end_date,
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
          .post("https://icp2022.net/ICPScoreCard/api-plan.php", {
            action: "update",
            planId: this.plan.planId,
            qa_plan_career_id: this.plan.qa_plan_career_id,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
            plan_start_date: this.plan.plan_start_date,
            plan_end_date: this.plan.plan_end_date,
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
    editUser(planId) {
      this.status = "Update/อัพเดท";
      this.isEdit = true;
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-plan.php", {
          action: "edit",
          planId: planId,
        })
        .then(function (response) {
          console.log(response);
          self.plan.planId = response.data.planId;
          self.plan.Plan_Career_id = response.data.plan_career_id;
          self.getQualification();
          self.plan.qualification_name = response.data.qualification_name;
          self.plan.qa_plan_career_id = response.data.qa_plan_career_id;
          // self.plan.doing = response.data.doing;
          // self.plan.leaning = response.data.leaning;
          // self.plan.plan_start_date = response.data.plan_start_date;
          // self.plan.plan_end_date = response.data.plan_end_date;
          self.plans_ = response.data;
          console.log("แก้ไขคุณสมบัติ:", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(planId) {
      if (confirm("คุณต้องการลบรหัส " + planId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api-plan.php", {
            action: "delete",
            planId: planId,
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
                    text: "แผนการเรียน/ทำ",
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
                            text: "แผนอาชีพ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.Line.career,
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
                            text: "คุณสมบัติ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.Line.qualificationName,
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
                            text: "แผนการเรียนรู้",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.plan.doing,
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
                            text: "แผนปฏิบัติการ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.plan.leaning,
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
                            text: "วันที่เริ่มแผน",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.plan.plan_start_date,
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
                            text: "วันที่สิ้นสุดแผน",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.plan.plan_end_date,
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
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormSelfAssessment",
                    },
                    height: "sm",
                    style: "primary",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "Back",
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormPlan",
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
          liff.closeWindow();
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    onQualificationChange(val) {
      this.Line.qualificationName = val.qualification_name;
      console.log("เลือก", this.Line.qualificationName);
    },
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
