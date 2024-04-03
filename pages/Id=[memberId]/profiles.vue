

<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="SHAKH DANIAL"
      subtitle="TEAM DETAILS"
      bg="/images/bg/breadcrumb_bg01.jpg"
      brd_img="http://localhost:3000/images/Bonus/2/CatImage.gif"
      Frame_img="http://localhost:3000/images/Bonus/4/ApexFrame.png"
    ></breadcrumb-one>
    <!-- breadcrumb area end -->
  
    <!-- team info area start -->
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="team__info-wrap">
            <div style="width: 100%; height: 80px">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: red;
                  width: 100%;
                  height: 100%;
                "
              >
                <div style="margin-right: auto; margin-left: 20px">
                  <p style="display: inline-block; color: white">暱稱</p>
                  <input type="text" id="nickname" v-model="postData.NickName" />
                </div>
                <!-- <div>
                  <p style="display: inline-block; color:white">個人資訊</p>
                  
                  <input type="text" >
                        </div> -->
                <!-- <div style="margin-left: auto; margin-right: 20px">
                  <p style="display: inline-block; color: white">生日</p>
                  <input type="date" id="birthday" v-model="postData.Birthday" />
                </div> -->
              </div>

              <div class="input-grp message-grp">
                <Field name="name" v-slot="{ field }">
                  <input v-bind="field" name="name" type="text" placeholder="暱稱" />
                </Field>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <team-info-area></team-info-area> -->
    <!-- team info area end -->
  </div>
</template>

<script setup lang="ts">
onBeforeMount(() => {
  definePageMeta({
    middleware: "nologin",
  });
});

import axios from "axios";
import { VueCookieNext as $cookie } from "vue-cookie-next";
import { useRoute } from "vue-router";
import { Field } from "vee-validate";

const router = useRoute();

const memberId = router.params.memberId;
const postData = ref({
  NickName: "",
});

let oldnickname = "";


// onMounted(() => {
//   axios.get(`https://localhost:7048/api/Members/${memberId}`)
//       .then(response => {
//         console.log(response.data[0])
//         console.log(response.data[1])
//         oldnickname =response.data.NickName
//         oldbirthday =response.data.Birthday
//         console.log(response)
//         if(oldbirthday==null){
//           oldbirthday = "2000-01-01";
//         }
//         })
//         postData.value.NickName=oldnickname
//         postData.value.Birthday=oldbirthday
//         console.log(oldnickname)
//         console.log(oldbirthday)

// });

// onMounted(() => {
//   axios.get(`https://localhost:7048/api/Members/${memberId}`)
//     .then((response) => {
//       console.log(response.data);
//       oldnickname = response.data.nickName;
//       postData.value.NickName = oldnickname;
//       console.log(oldnickname);

//     })
//     .catch((error) => {
//       console.error("Error fetching member data:", error);
//     });
// });
</script>
