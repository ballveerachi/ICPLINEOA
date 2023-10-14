<template>
  <div>
    <v-app-bar  dense flat dark>
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
    </v-app-bar>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="100%"
      rounded="lg"
    >
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <div>รหัสแผนอาชีพ:</div>
              <v-text-field
                type="text"
                name="Name_Plan_Career"
                v-model="qualification.planCareerId"
                placeholder="Career/อาชีพ"
                prepend-inner-icon="mdi-key"
                variant="outlined"
                required
                disabled
                class="form-control form-control-lg"
                ><v-select
                  :size="4"
                  v-model="qualification.planCareerId"
                  :required="true"
                  @change="getQualification(qualification.planCareerId)"
                  ><option value="" disabled selected>อาชีพ:</option>
                  <option
                    v-for="career in planCareers"
                    :value="career.Plan_Career_id"
                    :key="career.index"
                  >
                    {{ career.Plan_Career_id }} {{ career.Name_Plan_Career }}
                  </option>
                  <option value="ALL">ALL/ทุกอาชีพ</option>
                </v-select>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <div>รหัสคุณสมบัติ:</div>
              <v-text-field
                type="text"
                name="qualification"
                v-model="plan.qualificationId"
                placeholder="Qualification/คุณสมบัติ"
                prepend-inner-icon="mdi-key"
                variant="outlined"
                required
                disabled
                class="form-control form-control-lg"
                ><v-select :size="4" v-model="plan.qualificationId"
                  ><option disabled selected>กำหนดคุณสมบัติ:</option>
                  <option
                    v-for="career_qualification in qualifications"
                    :value="career_qualification.qualificationId"
                    :key="career_qualification.index"
                  >
                    {{ career_qualification.qualificationId }}
                    {{ career_qualification.skill }}
                  </option>
                  <option value="ALL">ALL/ทุกคุณสมบัติ</option>
                </v-select>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormPivotTable',
  components: {},
  data() {
    return {
      pageTitle: 'รายงานประเมินตัวเอง',
      dataChart: [],
      message: 'Form Pivot Table',
      query: '',
      employees: Array,
      planCareers: Array,
      qualifications: Array,
      plans: Array,
      assessments: Array,
      allAssessments: Array,
      chartSelfAssessment: {
        qualificationId: Array,
        level: Array,
        goal: Array,
        month: Array,
        assessment: Array,
      },
      chartAllSelfAssessment: {
        qualificationId: Array,
        level: Array,
        goal: Array,
        month: Array,
        assessment: Array,
      },
      employee: { id: 1 },
      planCareer: { Plan_Career_id: 1 },
      qualification: {
        qualificationId: 1,
        planCareerId: '',
      },
      selfAssessment: { selfAssessmentId: 1 },
      plan: {
        planId: 1,
        qualificationId: '',
      },
      isEdit: false,
      status: 'บันทึก',
      // var goals = this.chartSelfAssessment.goal;
      // var months = this.chartSelfAssessment.month;
      // var assessments = this.chartSelfAssessment.assessment;
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    }
  },
  methods: {
    getEmployees() {
      console.log(' get employees ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getEmployees',
          id: this.$store.getters.myMember_id,
        })
        .then(function (res) {
          console.log(res)
          self.employees = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPlanCareers() {
      console.log(' get qualifications ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getPlanCareer',
          employeeId: this.employee.id,
        })
        .then(function (res) {
          console.log(res)
          self.planCareers = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getQualifications() {
      console.log(' get qualifications ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getQualification',
          Plan_Career_id: this.planCareer.Plan_Career_id,
        })
        .then(function (res) {
          console.log(res)
          self.qualifications = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    getPlans() {
      console.log(' get plans ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getPlan',
          qualificationId: this.qualification.qualificationId,
        })
        .then(function (res) {
          console.log(res)
          self.plans = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getAssessments() {
      console.log(' get assessments ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getAssessment',
          qualificationId: this.qualification.qualificationId,
        })
        .then(function (res) {
          console.log(res)
          self.assessments = res.data
          // res.data.map(item=>item.month)
          console.log(
            'Qualification id: ',
            res.data.map((item) => item.qualificationId)
          )
          self.chartSelfAssessment.qualificationId = res.data.map(
            (item) => item.qualificationId
          )
          console.log(
            'Level: ',
            res.data.map((item) => item.level)
          )
          self.chartSelfAssessment.level = res.data.map((item) => item.level)
          console.log(
            'Goal: ',
            res.data.map((item) => parseInt(item.goal))
          )
          self.chartSelfAssessment.goal = res.data.map((item) =>
            parseInt(item.goal)
          )
          console.log(
            'Month: ',
            res.data.map((item) => item.month)
          )
          self.chartSelfAssessment.month = res.data.map((item) => item.month)
          console.log(
            'Selft Assessment: ',
            res.data.map((item) => parseInt(item.assessment))
          )
          self.chartSelfAssessment.assessment = res.data.map((item) =>
            parseInt(item.assessment)
          )
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getAllAssessments() {
      console.log(' get assessments ')
      var self = this
      axios
        .post('http://localhost/ICPScoreCard/api-pivot.php', {
          action: 'getAllAssessment',
        })
        .then(function (res) {
          console.log(res)
          self.allAssessments = res.data
          // res.data.map(item=>item.month)
          console.log(
            'Qualification id: ',
            res.data.map((item) => item.qualificationId)
          )
          self.chartAllSelfAssessment.qualificationId = res.data.map(
            (item) => item.qualificationId
          )
          console.log(
            'Level: ',
            res.data.map((item) => item.level)
          )
          self.chartAllSelfAssessment.level = res.data.map((item) => item.level)
          console.log(
            'Goal: ',
            res.data.map((item) => parseInt(item.goal))
          )
          self.chartAllSelfAssessment.goal = res.data.map((item) =>
            parseInt(item.goal)
          )
          console.log(
            'Month: ',
            res.data.map((item) => item.month)
          )
          self.chartAllSelfAssessment.month = res.data.map((item) => item.month)
          console.log(
            'Selft Assessment: ',
            res.data.map((item) => parseInt(item.assessment))
          )
          self.chartAllSelfAssessment.assessment = res.data.map((item) =>
            parseInt(item.assessment)
          )
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getEmployeeId(id) {
      console.log(id)
      this.employee.id = id
      this.getPlanCareers()
    },
    getPlanCareerId(Plan_Career_id) {
      console.log(Plan_Career_id)
      this.planCareer.Plan_Career_id = Plan_Career_id
      this.getQualifications()
    },
    getQualificationId(qualificationId) {
      console.log(qualificationId)
      this.qualification.qualificationId = qualificationId
      this.getPlans()
      this.getAssessments()
      this.updateChart()
    },
    updateChart() {
      console.log('Update Chart')
      // const max = 90;
      // const min = 20;
      const newData = this.chartAllSelfAssessment.assessment
      //this.series[0].data.map(() => {
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      //   return this.chartAllSelfAssessment.assessment;
      // });

      const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        chart: { id: 'vuechart-example' },
        xaxis: {
          categories: this.chartAllSelfAssessment.month,
          convertedCatToNumeric: false,
        },
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      }

      console.log('chartOptions:', this.chartOptions)
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ]
      console.log('series:', this.series)
    },
  },
  computed: {
    test_data() {
      var formatted1 = []
      var formatted2 = []
      var goals = this.chartSelfAssessment.goal
      var months = this.chartSelfAssessment.month
      var assessments = this.chartSelfAssessment.assessment
      var qualificationIds = this.chartSelfAssessment.qualificationId
      var data = []
      for (var d = 0; d < qualificationIds.length; d++) {
        if (d + 1 < qualificationIds.length) {
          if (qualificationIds[d] == qualificationIds[d + 1]) {
            console.log(qualificationIds[d], '=', qualificationIds[d + 1])
            //for (var i = 0; i < months.length; i++) {
            formatted1.push([months[d], assessments[d]])
            //}
            //for (var j = 0; j < months.length; j++) {
            formatted2.push([months[d], goals[d]])
            //}
          } else {
            data.push(
              { name: 'SA' + String(d - 1), data: formatted1 },
              { name: 'G' + String(d - 1), data: formatted2 }
            )
          }
        } else {
          data.push(
            { name: 'SA' + String(d - 1), data: formatted1 },
            { name: 'G' + String(d - 1), data: formatted2 }
          )
        }
      }
      // { name: "Self Assessments/ผลการประเมินตนเอง1", data: formatted1 },
      // { name: "Goals/ค่าเป้าหมาย1", data: formatted2 },
      // { name: "Self Assessments/ผลการประเมินตนเอง2", data: formatted1 },
      // { name: "Goals/ค่าเป้าหมาย2", data: formatted2 },

      return data
    },
    test_data2() {
      var formatted1 = []
      var formatted2 = []
      var goals = this.chartSelfAssessment.goal
      var months = this.chartSelfAssessment.month
      var assessments = this.chartSelfAssessment.assessment
      for (var i = 0; i < months.length; i++) {
        formatted1.push([months[i], assessments[i]])
      }
      for (var j = 0; j < months.length; j++) {
        formatted2.push([months[j], goals[j]])
      }

      var data = [
        { name: 'SA', data: formatted1 },
        { name: 'GO', data: formatted2 },
        { name: 'SA1', data: formatted1 },
        { name: 'GO1', data: formatted2 },
      ]
      return data
    },
    test_data1() {
      var formatted1 = []
      var data = []
      var qualificationIds = this.chartAllSelfAssessment.qualificationId
      var months = this.chartAllSelfAssessment.month
      var assessments = this.chartAllSelfAssessment.assessment
      var count = 1
      for (var i = 0; i < months.length; i++) {
        if (qualificationIds[i] != count && i > 0) {
          data.push({
            name: months[i - 1],
            data: formatted1,
          })
          count = count + 1
          formatted1 = []
        }
        formatted1.push([months[i], assessments[i]])
      }
      data.push({
        name: months[i - 1],
        data: formatted1,
      })
      return data
    },
  },

  created() {
    this.getEmployees()
    this.getPlanCareers()
    this.getQualifications()
    this.getPlans()
    this.getAssessments()
    this.getAllAssessments()
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
  padding-top: 15px;
  margin-top: 50px;
}
</style>

