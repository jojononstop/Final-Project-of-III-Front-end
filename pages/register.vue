<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
        <div style="display: grip; justify-content: center;place-items: center;">
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">帳號</p><br>
                <input  v-model="postData.account" id="account"  style="display: inline-block; ">
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">暱稱</p><br>
                <input v-model="postData.name"  id="name"  style="display: inline-block; ">
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">密碼</p><br>
                <input v-model="postData.password"  id="password" type="password"  style="display: inline-block; ">
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">重複密碼</p><br>
                <input  id="rePassword" type="password"  style="display: inline-block; ">
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">郵箱</p><br>
                <input v-model="postData.email"  id="email" type="email"  style="display: inline-block; ">
            </div>
            <div style="margin-left: 35%;margin-top:3vh;">
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


</script>