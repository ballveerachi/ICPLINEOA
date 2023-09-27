<template>
  <div>
    <v-app-bar  dense flat dark>
      <v-toolbar-title>คุณสมบัติ/ทักษะ</v-toolbar-title>
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
                    class="form-control form-control-lg"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <div>รหัสแผนอาชีพ:</div>
                  <v-select
                    :items="items"
                    density="compact"
                    label="อาชีพที่ต้องการ:"
                    v-model="qualification.planCareerId"
                    ><option disabled selected>กำหนดรหัสแผนอาชีพ:</option>

                    <option
                      v-for="career in careers"
                      :value="career.Plan_Career_id"
                      :key="career.index"
                    >
                      {{ career.Plan_Career_id }} {{ career.career }}
                    </option>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>คุณสมบัติ:</div>
                  <v-select
                    v-model="qualification.qualificationId"
                    :required="true"
                  >
                    <option disabled selected>คุณสมบัติที่กำหนด:</option>
                    <option
                      v-for="qualification in qualifications"
                      :value="qualification.qualificationId"
                      :key="qualification.index"
                    >
                      {{ qualification.qualificationId }}
                      {{ qualification.qualification_name }}
                    </option>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <div for="level">ระดับความสำคัญ:</div>

                  <v-select v-model="qualification.level_id">
                    <!-- <option disabled selected>ระดับความสำคัญ:</option> -->
                    <option
                      v-for="level in levels"
                      :value="level.level_id"
                      :key="level.index"
                    >
                      {{ level.level_id }}
                      {{ level.level_description }}
                    </option>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <div>target/เป้าหมาย:</div>

                  <v-select v-model="qualification.target_id">
                    <option disabled selected>เป้าหมาย:</option>
                    <option
                      v-for="target in targets"
                      :value="target.target_id"
                      :key="target.index"
                    >
                      {{ target.target_id }}
                      {{ target.target_name }}
                    </option>
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
        </v-container>
      </v-main>
    </v-card>
    <!-- data-table -->
    <v-card class="mx-auto table" max-width="800px" cols="12" md="6">
      <!-- <v-card-title>แก้ไขข้อมูล</v-card-title> -->
      <v-row>
        <v-col> Qualification-ID</v-col>
        <v-col>PlanCareer-ID</v-col>
        <v-col>PlanCareer-Name</v-col>
        <v-col>Qualification</v-col>
        <v-col>Level</v-col>
        <v-col>target</v-col>
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

    <!-- /data-table -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'FormQualification',
  components: {},
  data() {
    return {
      message: 'Form Qualification',
      selected: '',
      getall: Array,
      targets: Array,
      levels: Array,
      qualifications: Array,
      qualifications_: Array,
      employee_id: this.$store.getters.myMember_id,
      careerPath: '',
      careers: Array,
      career_qualifications: Array,
      qualification: {
        qa_plan_career_id: '',
        qualificationId: '',
        planCareerId: '',
        qualification_name: '',
        level_id: '',
        target_id: '',
        qualification_id: '',
        // month: "มกราคม",
        // self_assessment: "Yes",
      },
      isEdit: false,
      status: 'Save/บันทึก',
    }
  },
  methods: {
    resetForm() {
      this.status = 'Save/บันทึก'
      this.isEdit = false
      console.log('ยกเลิกการบันทึกข้อมูล')
      // this.qualification.qualificationId = 0;
      this.qualification.planCareerId = ''
      this.qualification.qualification_name = ''
      this.qualification.qualificationId = ''
      this.qualification.level_id = ''
      this.qualification.target_id = ''
      // this.qualification.month = "";
      // this.qualification.self_assessment = "";
    },
    getAllUser() {
      console.log(' แสดงข้อมูลทั้งหมด ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-qa-plan-career.php', {
          action: 'getall',
        })
        .then(function (res) {
          console.log('ข้อมูลแผนคุณสมบัติ', res.data)
          self.getall = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getCareer() {
      console.log(' ข้อมูลอาชีพ ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-qualification.php', {
          action: 'getEmpCareer',
          employee_id: this.employee_id,
        })
        .then(function (res) {
          self.careers = res.data
          console.log('careers:', self.careers)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getQualifications() {
      console.log(' แสดงข้อมูลคุณสมบัติ ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-qualification.php', {
          action: 'getQualifiation',
          // career_id: this.qualification.planCareerId,
        })
        .then(function (res) {
          self.qualifications = res.data
          console.log('qualification:', self.qualifications)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getLevel() {
      console.log(' แสดงข้อมูลระดับ ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-qualification.php', {
          action: 'getLevel',
        })
        .then(function (res) {
          self.levels = res.data
          console.log('level:', self.levels)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getTarget() {
      console.log(' ข้อมูลค่าเป้าหมาย ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-qualification.php', {
          action: 'getTarget',
        })
        .then(function (res) {
          self.targets = res.data
          console.log('target:', self.targets)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitForm() {
      if (!this.isEdit) {
        console.log('บันทึกข้อมูล')
        console.log('รหัสคุณสมบัติ', this.qa_plan_career_id)
        console.log('แผนอาชีพ', this.qualification.planCareerId)
        console.log('คุณสมบัติ', this.qualification.qualificationId)
        console.log('เป้าหมาย', this.qualification.target_id)
        console.log('ระดับ', this.qualification.level_id)
        const newQualification = {
          plan_career_id: this.qualification.planCareerId,
          qualification_id: this.qualification.qualificationId,
          target_id: this.qualification.target_id,
          level_id: this.qualification.level_id,
        }
        this.$emit('saveData', newQualification)

        axios
          .post('http://localhost/ICPScoreCard/api-qa-plan-career.php', {
            action: 'insert',
            plan_career_id: this.qualification.planCareerId,
            qualification_id: this.qualification.qualificationId,
            target_id: this.qualification.target_id,
            level_id: this.qualification.level_id,
          })
          .then((res) => {
            console.log('insert:', res)
            this.resetForm()
            this.getAllUser()
            // this.getUpdate();
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        console.log('qa_plan_career_id:', this.qualification.qa_plan_career_id)
        console.log('plan_career_id:', this.qualification.planCareerId)
        console.log('qualificationId:', this.qualification.qualificationId)
        console.log('target_id:', this.qualification.target_id)
        console.log('level_id:', this.qualification.level_id)

        axios
          .post('http://localhost/ICPScoreCard/api-qa-plan-career.php', {
            action: 'update',
            qa_plan_career_id: this.qualification.qa_plan_career_id,
            plan_career_id: this.qualification.planCareerId,
            qualificationId: this.qualification.qualificationId,
            target_id: this.qualification.target_id,
            level_id: this.qualification.level_id,

            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
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
    editUser(qa_plan_career_id) {
      this.status = 'Update/อัพเดท'
      this.isEdit = true
      var self = this
      console.log('qa_plan_career_id:', qa_plan_career_id)
      axios
        .post('http://localhost/ICPScoreCard/api-qa-plan-career.php', {
          action: 'edit',
          qa_plan_career_id: qa_plan_career_id,
        })
        .then(function (response) {
          console.log(response)
          self.qualification.qa_plan_career_id = response.data.qa_plan_career_id
          self.qualification.qualificationId = response.data.qualificationId
          self.qualification.planCareerId = response.data.plan_career_id
          self.qualification.target_id = response.data.target_id
          self.qualification.level_id = response.data.level_id
          self.qualifications_ = response.data
          console.log('แก้ไขคุณสมบัติ:', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteUser(qa_plan_career_id) {
      if (confirm('คุณต้องการลบรหัส ' + qa_plan_career_id + ' หรือไม่ ?')) {
        var self = this
        axios
          .post('http://localhost/ICPScoreCard/api-qa-plan-career.php', {
            action: 'delete',
            qa_plan_career_id: qa_plan_career_id,
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
  },
  created() {
    this.getAllUser()
    this.getCareer()
    this.getQualifications()
    this.getLevel()
    this.getTarget()
  },
}
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
  padding-top: 45px;
  margin-top: 45px;
}
</style>
