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
        <v-container class="pt-0 pb-0">
          <v-form
            @submit.prevent="submitForm"
            @reset.prevent="resetForm"
            method="post"
          >
            <v-container class="pt-0 pb-0">
              <v-row>
                <v-col cols="12" md="12">
                  <div>selfAssessment-ID/รหัสประเมินตนเอง:</div>
                  <v-text-field
                    type="text"
                    name="self_assessment_id"
                    v-model="selfAssessment.self_assessment_id"
                    placeholder="SA-ID/รหัสประเมินตนเอง"
                    prepend-inner-icon="mdi-key"
                    variant="outlined"
                    required
                    disabled
                    class="form-control form-control-lg"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <div>Career-ID/รหัสอาชีพ:</div>
                  <v-select
                    :size="4"
                    label="เลือก"
                    v-model="selfAssessment.Plan_Career_id"
                    :required="true"
                    return-object
                    @change="(val) => getQualification(val)"
                    :items="careers"
                    item-value="Plan_Career_id"
                    item-text="career"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="grey--text">กำหนดรหัสอาชีพ:</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <span> {{ item.Plan_Career_id }}-{{ item.career }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span> {{ item.Plan_Career_id }}-{{ item.career }}</span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>Qualification-ID/รหัสคุณสมบัติ</div>
                  <v-select
                    :size="4"
                    v-model="selfAssessment.qa_plan_career_id"
                    :items="career_qualifications"
                    label="เลือก"
                    return-object
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
              </v-row>

              <v-row>
                <v-col>
                  <div>AssessmentDate/วันที่ประเมินตนเอง:</div>

                  <v-dialog
                    ref="dialog"
                    v-model="modal_self_assessment_date"
                    :return-value.sync="selfAssessment.self_assessment_date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="selfAssessment.self_assessment_date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="selfAssessment.self_assessment_date"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="modal_self_assessment_date = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.dialog.save(selfAssessment.self_assessment_date)
                        "
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="12">
                  <div for="level">SelfAssessment/ประเมินตนเอง:</div>
                  <v-select
                    :size="4"
                    v-model="selfAssessment.perform_id"
                    :required="true"
                    :items="performs"
                    return-object
                    label="เลือก"
                    item-value="perform_id"
                    item-text="perform_name"
                    @change="(val) => onPerformChange(val)"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="grey--text"
                              >ระดับการประเมินตนเอง:</span
                            >
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <span> {{ item.perform_name }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span> {{ item.perform_name }}</span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row> </v-row>
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
              <v-col>SA-ID</v-col>
              <v-col>QA-ID</v-col>
              <v-col>Assessment Date</v-col>
              <v-col>Self Assessment</v-col>
              <v-col>Action</v-col>
            </v-row>
            <v-row
              v-for="row in selfAssessments"
              :key="row.self_assessment_id"
              cols="12"
              md="6"
            >
              <v-col>{{ row.self_assessment_id }}</v-col>
              <v-col>{{ row.qa_plan_career_id }}</v-col>
              <v-col>{{ row.self_assessment_date }}</v-col>
              <v-col>{{ row.perform_id }}</v-col>

              <v-col
                ><v-btn @click="editUser(row.self_assessment_id)"
                  ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
                >
                <v-btn @click="deleteUser(row.self_assessment_id)"
                  ><v-icon small class="mr-2"> mdi-delete </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-main>
    </v-card>
    <!-- data-table -->

    <!-- /data-table -->
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
  name: "FormSelfAssessment",
  data() {
    return {
      pageTitle: "ประเมินตัวเอง",
      modal_self_assessment_date: false,
      message: "Form Self Acessment",
      currentYear: new Date().getFullYear(),
      performs: [],
      selfAssessments: [],
      selfAssessments_: [],
      careers: [],
      career_qualifications: [],
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      selfAssessment: {
        self_assessment_id: "",
        qualificationId: "",
        qualification_name: "",
        perform_id: "",
        perform_name: "",
        self_assessment_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        planCareerId: "",
        Plan_Career_id: "",
        qa_plan_career_id: "",
      },
      Line: {
        career: " ",
        PerformName: " ",
        qualificationName: " ",
      },
      isEdit: false,
      status: "Save/บันทึก",
    };
  },
  methods: {
    resetForm() {
      this.status = "Save/บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.selfAssessment.selfAssessmentId = 0;
      // this.selfAssessment.qualificationId = 0;
      this.selfAssessment.qa_plan_career_id = "";
      this.selfAssessment.Plan_Career_id = "";
      this.selfAssessment.self_assessment_date = "";
      this.selfAssessment.perform_id = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.selfAssessments = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("qualification:", this.selfAssessment);
        const newSelfAssessment = {
          self_assessment_id: this.selfAssessment.self_assessment_id,
          qa_plan_career_id: this.selfAssessment.qa_plan_career_id,
          self_assessment_date: this.selfAssessment.self_assessment_date,
          perform_id: this.selfAssessment.perform_id.perform_id,
        };
        this.$emit("saveData", newSelfAssessment);

        axios
          .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
            action: "insert",
            self_assessment_id: this.selfAssessment.self_assessment_id,
            qa_plan_career_id:
              this.selfAssessment.qa_plan_career_id.qa_plan_career_id,
            self_assessment_date: this.selfAssessment.self_assessment_date,
            perform_id: this.selfAssessment.perform_id.perform_id,
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
          .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
            action: "update",
            self_assessment_id: this.selfAssessment.self_assessment_id,
            qa_plan_career_id: this.selfAssessment.qa_plan_career_id,
            self_assessment_date:
              this.selfAssessment.self_assessment_date.self_assessment_date,
            perform_id: this.selfAssessment.perform_id.perform_id,
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
    getPerform() {
      console.log(" ค่าประเมินตนเอง ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
          action: "getPerform",
        })
        .then(function (res) {
          self.performs = res.data;
          console.log("perform:", self.performs);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
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
      //this.Line.career =val.career;
      console.log("เลิอก", val.career);
      console.log("แผนอาชีพ", val.Plan_Career_id);
      console.log("แผนอาชีพ", this.selfAssessment.Plan_Career_id.Plan_Career_id);
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
          action: "getCareer_Qualifiation",

          Plan_Career_id: this.selfAssessment.Plan_Career_id.Plan_Career_id,
        })
        .then(function (res) {
          console.log("แก้ไขแผนอาชีพ", res.data);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editUser(self_assessment_id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
          action: "edit",
          self_assessment_id: self_assessment_id,
        })
        .then(function (response) {
          console.log(response);
          self.selfAssessment.self_assessment_id =
            response.data.self_assessment_id;
          self.selfAssessment.Plan_Career_id = response.data.plan_career_id;
          self.getQualification();
          self.selfAssessment.qa_plan_career_id =
            response.data.qa_plan_career_id;
          (self.selfAssessment.perform_id = response.data.perform_id),
            (self.selfAssessment.self_assessment_date =
              response.data.self_assessment_date),
            (self.selfAssessments_ = response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(self_assessment_id) {
      if (confirm("คุณต้องการลบรหัส " + self_assessment_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api-self-assessment.php", {
            action: "delete",
            self_assessment_id: self_assessment_id,
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
                    text: "การประเมินตนเอง",
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
                            text: "วันที่ประเมินแผน",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.selfAssessment.self_assessment_date,
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
                            text: "ระดับการประเมิน",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.Line.PerformName,
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
                      label: "Home",
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/",
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
    onPerformChange(val) {
      this.Line.PerformName = val.perform_name;
      console.log("onLevelName", val.perform_name);
    },
    onQualificationChange(val) {
      this.Line.qualificationName = val.qualification_name;
      console.log("เลือก", this.Line.qualificationName);
    },
  },
  created() {
    this.getAllUser();
    this.getCareer();
    this.getPerform();
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
