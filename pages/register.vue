<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
        <div style="display: grip; justify-content: center;place-items: center;">
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">帳號</p><br>
                <input  v-model="postData.account" id="account"  style="display: inline-block; "@blur="focusoutaccount">
                <p v-if="isAccountOK" class="dangertext">帳號已存在</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">暱稱</p><br>
                <input v-model="postData.name"  id="name"  style="display: inline-block; "@focusout="">
                <p v-if="isNicknameOK" class="dangertext">暱稱已存在</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">密碼</p><br>
                <input v-model="postData.password"  id="password" type="password"  style="display: inline-block; "@focusout="">
                <p v-if="isPasswordOK" class="dangerrepasswordtext">請確認密碼格式正確:</p>
                <p v-if="isPasswordOK" class="dangerrepasswordtext">需有大小寫英文和數字 長度介於6-12間</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">重複密碼</p><br>
                <!-- @focusout="" -->
                <input  id="rePassword" type="password"  style="display: inline-block; "@focusout="">
                <p v-if="isRePasswordOK" class="dangertext">密碼需一致</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">郵箱</p><br>
                <input v-model="postData.email"  id="email" type="email"  style="display: inline-block; "@focusout="">
                <p v-if="isEmailOK" class="dangertext">郵箱格式不正確</p>
            </div>
            <div style="margin-left: 33%;margin-top:3vh;">
                <button  @click="register" style="justify-content: center;">註冊帳號</button>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { VueCookieNext as $cookie } from 'vue-cookie-next'
  import { ref, onBeforeMount  } from 'vue'; // 引入 ref 函数用于创建响应式数据

  const router = useRouter();

  const isAccountOK = ref<boolean>(false);
  const isNicknameOK = ref<boolean>(false);
  const isPasswordOK = ref<boolean>(false);
  const isRePasswordOK = ref<boolean>(false);
  const isEmailOK = ref<boolean>(false);

    // 创建响应式数据对象用于存储帐号和密码
  const postData = ref({
    account: '',
    password: '',
    name:'',
    email:'',
    google:null
  });

  onBeforeMount(() => {
  if($cookie.getCookie("google")){
    postData.value.google = $cookie.getCookie("google");
  
 }
});
const register = () => {
    console.log(postData)
    axios.post('https://localhost:7048/api/Members/Create', postData.value)
    .then(response => {
    if(response.data =="註冊成功"){

      console.log(response.data);    

    }
    else{
      console.log(response.data);
    }
  })
  .catch(error => {
    console.log(error);
  });
};

const focusoutaccount = () => {
  let state;
  console.log("1")
    axios.post(`https://localhost:7048/api/Members/TestMemberAccount?account=${postData.value.account}`, postData.value.account)
         .then(response => {
          state =response.data
          console.log(state)
            })
         .catch(error => {
            console.log(error);
          });
  if(state==false)
  {
    isAccountOK.value ==true
  }
  else{
    isAccountOK.value ==false
  }
}
</script>

<style scoped>

.dangertext {
  color: red;
  text-align: center;
  font-size: 14px;
}
.dangerrepasswordtext {
  color: red;
  margin-top: 0;
  font-size: 14px;
}
</style>