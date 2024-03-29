<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
        <div style="display: grip; justify-content: center;place-items: center;">
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">帳號</p><br>
                <input  v-model="postData.account" id="account"  style="display: inline-block; "@blur="focusoutaccount();validatebutton()">
                <p v-if="isAccountOK" class="dangertext">帳號已存在</p>
                <p v-if="isAccountEmpty" class="dangertext">帳號不得為空</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">暱稱</p><br>
                <input v-model="postData.name"  id="name"  style="display: inline-block; "@blur="focusoutname();validatebutton()">
                <p v-if="isNicknameOK" class="dangertext">暱稱已存在</p>
                <p v-if="isNicknameEmpty" class="dangertext">暱稱不得為空</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">密碼</p><br>
                <input v-model="postData.password"  id="password" type="password"  style="display: inline-block; "@blur="focusoutPassword();validatebutton()">
                <p v-if="isPasswordOK" class="dangerrepasswordtext">請確認密碼格式正確:</p>
                <p v-if="isPasswordOK" class="dangerrepasswordtext">需有大小寫英文和數字 長度介於6-12間</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">重複密碼</p><br>
                <!-- @focusout="" -->
                <input v-model="rePassword"  id="rePassword" type="password"  style="display: inline-block; "@blur="focusoutRePassword();validatebutton()">
                <p v-if="isRePasswordOK" class="dangertext">密碼需一致</p>
            </div>
            <div style="margin-top:2vh;">
                <p style="display: inline-block; ">郵箱</p><br>
                <input v-model="postData.email"  id="email" type="email"  style="display: inline-block; "@blur="">
                <p v-if="isEmailOK" class="dangertext">郵箱格式不正確</p>
            </div>
            <div style="margin-left: 33%;margin-top:3vh;">
                <button  @click="register" :disabled="isButtonDisabled" style="justify-content: center; ">註冊帳號</button>
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
  const isAccountEmpty = ref<boolean>(false);
  const isNicknameOK = ref<boolean>(false);
  const isNicknameEmpty = ref<boolean>(false);
  const isPasswordOK = ref<boolean>(false);
  const isRePasswordOK = ref<boolean>(false);
  const isEmailOK = ref<boolean>(false);
  const isButtonDisabled = ref<boolean>(false);

    // 创建响应式数据对象用于存储帐号和密码
  const postData = ref({
    account: '',
    password: '',
    name:'',
    email:'',
    google:null
  });

  const rePassword =ref("");
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
let state;

// 帳號驗證
const focusoutaccount = () => {

  isAccountEmpty.value = false;
  isAccountOK.value = false;

  if(postData.value.account=="")
  {
    isAccountEmpty.value = !isAccountEmpty.value;
    console.log("112")
  }
  else{
    axios.post(`https://localhost:7048/api/Members/TestMemberAccount?account=${postData.value.account}`, postData.value.account)
         .then(response => {
          state =response.data
          if(state==false)
          {
             isAccountOK.value = !isAccountOK.value;

          }
            })
         .catch(error => {
            console.log(error);
          });
  }
}

//暱稱驗證
const focusoutname = () => {

isNicknameEmpty.value = false;
isNicknameOK.value = false;

if(postData.value.name=="")
{
  isNicknameEmpty.value = !isNicknameEmpty.value;

  console.log("112")
}
else{
  axios.post(`https://localhost:7048/api/Members/TestMemberName?name=${postData.value.name}`, postData.value.name)
       .then(response => {
        state =response.data
        if(state==false)
        {
           isNicknameOK.value = !isNicknameOK.value;

        }
          })
       .catch(error => {
          console.log(error);
        });
 }
}

//驗證密碼
const focusoutPassword = () => {
    const password = postData.value.password;

    isPasswordOK.value = false;

    // 正则表达式用于验证密码格式
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;

    // 检查密码是否符合格式
    if (!passwordRegex.test(password)) {
      isPasswordOK.value = !isPasswordOK.value;

    }
}

//驗證重複密碼
const focusoutRePassword = () => {
    if(rePassword.value!=postData.value.password){
      isRePasswordOK.value =true
    }
    else{
      isRePasswordOK.value =false
    }
}

//驗證郵箱
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const email = 'example@example.com';
if (validateEmail(email)) {
  console.log('Email 格式正确');
} else {
  console.log('Email 格式不正确');
}

//驗證按鈕
const validatebutton =() => {
  if(isAccountOK.value == false&&isAccountEmpty.value==false&&isNicknameOK.value==false&&
  isNicknameEmpty.value==false&&isPasswordOK.value==false&&isRePasswordOK.value==false&&isEmailOK.value==false){
    isButtonDisabled.value = false
  }
  else{
    isButtonDisabled.value = true
  }
}

</script>

<style scoped>

.dangertext {
  color: red;
  text-align: center;
  font-size: 14px;
  margin-right: 10px;
}
.dangerrepasswordtext {
  color: red;
  margin-top: 0;
  font-size: 14px;
}
</style>