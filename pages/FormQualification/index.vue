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
                <v-col cols="12" md="6">
                <div>รหัสสมาชิก:</div>
                <v-text-field
                  type="text"
                  v-model="member.id"
                  placeholder="Id/รหัส"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div>ชื่อ-สกุล:</div>
                <v-text-field
                  type="text"
                  v-model="member.name"
                  placeholder="Id/รหัส"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  required
                  disabled
                  class="form-control form-control-lg"
                ></v-text-field>
              </v-col>
                <v-col cols="12" md="6">
                  <div>รหัสคุณสมบัติ:</div>
                  <v-text-field
                    type="text"
                    name="qa_plan_career_id-id"
                    v-model="qualification.qa_plan_career_id"
                    placeholder="รหัสคุณสมบัติ"
                    prepend-inner-icon="mdi-key"
                    variant="outlined"
                    required
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>รหัสแผนอาชีพ:</div>
                  <v-select
                    label="เลือก"
                    variant="outlined"
                    v-model="qualification.planCareerId"
                    :size="4"
                    :items="careers"
                    return-object
                    item-value="Plan_Career_id"
                    item-text="career"
                    dense
                    @change="(val) => onQaPlanCareerChange(val)"
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
                      <span>{{ item.Plan_Career_id }} - {{ item.career }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span>{{ item.Plan_Career_id }} - {{ item.career }}</span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>คุณสมบัติ:</div>
                  <v-select
                    label="เลือก"
                    variant="outlined"
                    v-model="qualification.qualificationId"
                    :items="qualifications"
                    return-object
                    item-value="qualificationId"
                    item-text="qualification_name"
                    @change="(val) => onQualificationChange(val)"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="grey--text">กำหนดคุณสมบัติ:</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <span
                        >{{ item.qualificationId }} -
                        {{ item.qualification_name }}</span
                      >
                    </template>
                    <template v-slot:item="{ item }">
                      <span
                        >{{ item.qualificationId }} -
                        {{ item.qualification_name }}</span
                      >
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <div for="level">ระดับความสำคัญ:</div>
                  <v-select
                    :size="4"
                    v-model="qualification.level_id"
                    :items="levels"
                    return-object
                    item-value="level_id"
                    item-text="level"
                    label="เลือก"
                    variant="outlined"
                    @change="(val) => onLevelChange(val)"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="grey--text">กำหนดระดับความสำคัญ:</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <span
                        >{{ item.level_id }} -
                        {{ item.level_description }}</span
                      >
                    </template>
                    <template v-slot:item="{ item }">
                      <span
                        >{{ item.level_id }} -
                        {{ item.level_description }}</span
                      >
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <div>target/เป้าหมาย:</div>
                  <v-select
                    :size="4"
                    v-model="qualification.target_id"
                    :items="targets"
                    return-object
                    item-value="target_id"
                    item-text="target"
                    label="เลือก"
                    variant="outlined"
                    @change="(val) => onTargetChange(val)"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="grey--text">กำหนดเป้าหมาย:</span>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                      <span>{{ item.target_id }} - {{ item.target_name }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span>{{ item.target_id }} - {{ item.target_name }}</span>
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
              <v-col>Qualification-ID</v-col>
              <v-col>PlanCareer-ID</v-col>
              <v-col>PlanCareer-Name</v-col>
              <v-col>Qualification</v-col>
              <v-col>Level</v-col>
              <v-col>target</v-col>
              <v-col>Action</v-col>
            </v-row>
            <v-row v-for="row in getall" :key="row.index" cols="12" md="6">
              <v-col>{{ row.qa_plan_career_id }}</v-col>
              <v-col>{{ row.Plan_Career_id }}</v-col>
              <v-col>{{ row.career }}</v-col>
              <v-col>{{ row.qualification_name }}</v-col>
              <v-col>{{ row.level_description }}</v-col>
              <v-col>{{ row.target_name }}</v-col>
              <v-col
                ><v-btn @click="editUser(row.qa_plan_career_id)"
                  ><v-icon small class="mr-2"> mdi-pencil </v-icon></v-btn
                >
                <v-btn @click="deleteUser(row.qa_plan_career_id)"
                  ><v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-main>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import liff from "@line/liff";
export default {
  mounted() {
    liff.init({ liffId: "2000700725-Mxyp2AAD" });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.userId = profile.userId;
          console.log("ข้อมูลจากLine", profile);
          console.log("LineID", this.userId);
          this.checkMember(this.userId,this.userId);
        });
      } else {
        liff.login();
      }
    });
  },
  name: "FormQualification",
  components: {},
  data() {
    return {
      pageTitle: "คุณสมบัติ/ทักษะ",
      message: "Form Qualification",
      selected: " ",
      getall: [],
      targets: [],
      levels: [],
      qualifications: [],
      qualifications_: [],
      // employee_id: this.$store.getters.myMember_id,
      employee_id: " ",
      careerPath: " ",
      careers: [],
      career_qualifications: [],
      member:{
        id:" ",
        name:" ",
      },
      qualification: {

        qa_plan_career_id: " ",
        qualificationId: " ",
        planCareerId: " ",
        qualification_name: " ",
        level_id: " ",
        target_id: " ",
        qualification_id: " ",
        Plan_Career_id: " ",
        // month: "มกราคม",
        // self_assessment: "Yes",
      },
      Line: {
        QaName: " ",
        qualificationName: " ",
        LevelName: " ",
        TargetName: " ",
      },

      isEdit: false,
      status: "Save/บันทึก",
      show: {},
    };
  },
  methods: {
    resetForm() {
      this.status = "Save/บันทึก";
      this.isEdit = false;
      console.log("รีเซ็ตฟรอม");
      // this.qualification.qualificationId = 0;
      this.qualification.planCareerId = "";
      this.qualification.qualification_name = "";
      this.qualification.qualificationId = "";
      this.qualification.level_id = "";
      this.qualification.target_id = "";
      // this.qualification.month = "";
      // this.qualification.self_assessment = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qa-plan-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log("ข้อมูลแผนคุณสมบัติ", res.data);
          self.getall = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qualification.php", {
          action: "getEmpCareer",
          // employee_id: this.employee_id,
          employee_id: self.member.id,
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers:", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQualifications() {
      console.log(" แสดงข้อมูลคุณสมบัติ ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qualification.php", {
          action: "getQualifiation",
          // career_id: this.qualification.planCareerId,
        })
        .then(function (res) {
          self.qualifications = res.data;
          console.log("qualification:", self.qualifications);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLevel() {
      console.log(" แสดงข้อมูลระดับ ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qualification.php", {
          action: "getLevel",
        })
        .then(function (res) {
          self.levels = res.data;
          console.log("level:", self.levels);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTarget() {
      console.log(" ข้อมูลค่าเป้าหมาย ");
      var self = this;
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qualification.php", {
          action: "getTarget",
        })
        .then(function (res) {
          self.targets = res.data;
          console.log("target:", self.targets);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("รหัสคุณสมบัติ", this.qa_plan_career_id);
        console.log("แผนอาชีพ", this.qualification.planCareerId.Plan_Career_id);
        console.log(
          "คุณสมบัติ",
          this.qualification.qualificationId.qualificationId
        );
        console.log("เป้าหมาย", this.qualification.target_id.target_id);
        console.log("ระดับ", this.qualification.level_id.level_id);
        const newQualification = {
          plan_career_id: this.qualification.planCareerId.Plan_Career_id,
          qualification_id: this.qualification.qualificationId.qualificationId,
          target_id: this.qualification.target_id.target_id,
          level_id: this.qualification.level_id.level_id,
        };
        this.$emit("saveData", newQualification);

        axios
          .post("https://icp2022.net/ICPScoreCard/api-qa-plan-career.php", {
            action: "insert",
            plan_career_id: this.qualification.planCareerId.Plan_Career_id,
            qualification_id:this.qualification.qualificationId.qualificationId,
            target_id: this.qualification.target_id.target_id,
            level_id: this.qualification.level_id.level_id,
          })
          .then((res) => {
            console.log("insert:", res);
            this.sendMessages();
            this.resetForm();
            this.getAllUser();
            // this.getUpdate();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("qa_plan_career_id:", this.qualification.qa_plan_career_id);
        console.log(
          "plan_career_id:",
          this.qualification.planCareerId
        );
        console.log(
          "qualificationId:",
          this.qualification.qualificationId.qualificationId
        );
        console.log("target_id:", this.qualification.target_id.target_id);
        console.log("level_id:", this.qualification.level_id.level_id);

        axios
          .post("https://icp2022.net/ICPScoreCard/api-qa-plan-career.php", {
            action: "update",
             qa_plan_career_id: this.qualification.qa_plan_career_id,
             plan_career_id: this.qualification.planCareerId,
             qualificationId:this.qualification.qualificationId.qualificationId,
             target_id: this.qualification.target_id.target_id,
             level_id: this.qualification.level_id.level_id,
            //qa_plan_career_id: 167,
            //plan_career_id: 249,
            //qualificationId:2,
            //target_id:2,
            //level_id: 2,
            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
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
    editUser(qa_plan_career_id) {
      this.status = "Update/อัพเดท";
      this.isEdit = true;
      var self = this;
      console.log("qa_plan_career_id:", qa_plan_career_id);
      axios
        .post("https://icp2022.net/ICPScoreCard/api-qa-plan-career.php", {
          action: "edit",
          qa_plan_career_id: qa_plan_career_id,
        })
        .then(function (response) {
          console.log("แก้ไขขขขข",response);
          self.qualification.qa_plan_career_id =response.data.qa_plan_career_id;
          self.qualification.qualificationId = response.data.qualificationId;
          self.qualification.planCareerId = response.data.plan_career_id;
          self.qualification.target_id = response.data.target_id;
          self.qualification.level_id = response.data.level_id;
          self.qualifications_ = response.data;
          console.log("แก้ไขคุณสมบัติ:", response.data);
          // console.log("planCareerId:", self.qualification.planCareerId);

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(qa_plan_career_id) {
      if (confirm("คุณต้องการลบรหัส " + qa_plan_career_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("https://icp2022.net/ICPScoreCard/api-qa-plan-career.php", {
            action: "delete",
            qa_plan_career_id: qa_plan_career_id,
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
          self.member.id = member_id;
          self.member.name = full_name;
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
                    text: "คุณสมบัติ/ทักษะ",
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
                            text: this.Line.QaName,
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
                            text: "ระดับความสำคัญ",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.Line.LevelName,
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
                            text: "เป้าหมาย",
                            weight: "regular",
                            size: "sm",
                            color: "#000000FF",
                            margin: "sm",
                            contents: [],
                          },
                          {
                            type: "text",
                            text: this.Line.TargetName,
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
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormPlan",
                    },
                    height: "sm",
                    style: "primary",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "Back",
                      uri: "https://elegant-buttercream-fd2e73.netlify.app/FormPlanCareer",
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
    onQaPlanCareerChange(val) {
      this.Line.QaName = val.career;
      console.log("QaName", val.career);
    },
    onQualificationChange(val) {
      this.Line.qualificationName = val.qualification_name;
      console.log("onqualificationName", val.qualification_name);
    },
    onLevelChange(val) {
      this.Line.LevelName = val.level_description;
      console.log("onLevelName", val.level_description);
    },
    onTargetChange(val) {
      this.Line.TargetName = val.target_name;
      console.log("onTargetName", val.target_name);
    },
  },
  created() {
    this.getAllUser();
    this.getCareer();
    this.getQualifications();
    this.getLevel();
    this.getTarget();
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
