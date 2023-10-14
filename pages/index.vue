<template>
  <div>
    <v-toolbar-title class="mt-4">Individual Career Plan</v-toolbar-title>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="100%"
      rounded="lg"
    >
      <v-main>
        <v-container class="pt-0 pb-0">
          <v-row>
            <v-col cols="12" sm="4" md="12">
              <img class="img_respon" src="~/assets/disabled.png" alt="" />
              <p>
                เพื่อส่งเสริมโอกาสให้คนพิการที่มีการศึกษา
                มีศักยภาพสูงให้ได้ทํางานในสถานประกอบการ
                <br />
                โดยสิ่งสำคัญคือ การมีอาชีพ
                ที่ทําให้สามารถพึ่งพาตนเองได้ของนักศึกษาและบัณฑิตพิการ
              </p>
              <br />
              <h3>แนวคิดหลักของโครงการ คือ</h3>
              <ul>
                <li>
                  นักศึกษาออกแบบและวางแผนอาชีพ เป้าหมาย
                  ที่อาจจะมีมากกว่าหนึ่งอาชีพ และเตรียมตัวเชิงรุก
                  <br />
                  โดยการย้อนกลับถึง ทักษะเฉพาะที่จำเป็น
                  และการวางแผนเพื่อพัฒนาตัวเองในทักษะนั้นๆ
                  เพื่อให้ตอบโจทย์อาชีพที่วางไว้
                </li>
              </ul>
              <ul>
                <li>
                  <div class="container">
                    <img class="img_respon" src="~/assets/plan.png" alt="" />
                  </div>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
