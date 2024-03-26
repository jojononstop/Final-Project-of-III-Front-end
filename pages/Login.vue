<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
        <div style="display: grip; justify-content: center;align-items: center;">
          <!-- height: 30vh;width:50vh; -->
        <!-- background-color:#242633  -->
            <div style="margin-left:12vh;margin-top:3vh;">
                <p style="display: inline-block; ">帳號: </p>
                <input  v-model="postData.account" id="account"  style="display: inline-block; margin-left: 10px;">
            </div>
            <div style="margin-left:12vh;margin-top:2vh;">
                <p style="display: inline-block; ">密碼: </p>
                <input  v-model="postData.password" id="password" type="password"  style="display: inline-block; margin-left: 10px;">
            </div>
            <button v-on:click="login" style="display: flex; justify-content: center; align-items: center; margin-left: 20vh; margin-top: 2vh; width: 10vh; text-align: center;">登入</button>
            <!-- Google Sign-In 按钮 -->
            <div class="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="flex w-full max-w-md flex-col items-center justify-center">
      <!-- <h1 class="my-8 flex text-center text-3xl font-bold tracking-tight text-emerald-500">
        Nuxt App
      </h1> -->
      <!-- <ClientOnly> -->
        <!-- <GoogleLogin :callback="callback" popup-type="TOKEN" > -->
          <button 
          class="flex rounded-md border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" style="margin-left:12vh;margin-top:8vh;"
          @click="handleGoogleLogin"
          >
          <!--             class="flex rounded-md border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" -->
            <span class="text-slate-500 group-hover:text-slate-600">使用 Google 進行登入</span>
          </button>
          <!-- <button @click="test">test</button> -->
        <!-- </GoogleLogin> -->
      <!-- </ClientOnly> -->
      <!-- <popup-googlelogin :isActive="isActive" @closeLogin="handleCloseLogin"></popup-googlelogin> -->
      <LoginModal2 v-show="isActive"/>
    </div>
  </div>
<!--  -->

        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { googleTokenLogin } from 'vue3-google-login'
  import axios from 'axios';
  import { VueCookieNext as $cookie } from 'vue-cookie-next'
  import { ref } from 'vue'; // 引入 ref 函数用于创建响应式数据

  const isActive = ref<boolean>(false);


  // import { ElMessageBox } from 'element-plus';
  
  var id ="";
  let globalId;
  useSeoMeta({ title: "Login" });

  const runtimeConfig = useRuntimeConfig()
  const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

  const userInfo = ref(null)

  const router = useRouter();
  const callback = (response:any) => {
  console.log(response)
}
// 開彈窗
// const handleOpenLogin = (audioPath: string) => {
//   const audio = new Audio(audioPath);
//   audio.play();
//   isActive.value = !isActive.value;
// };
// 關彈窗
const handleCloseLogin = (audioPath: string) => {
  const audio = new Audio(audioPath);
  audio.play();
  isActive.value = !isActive.value;
};

  // 创建响应式数据对象用于存储帐号和密码
const postData = ref({
  account: '',
  password: ''
});
const login = () => {
  console.log(postData)
  axios.post('https://localhost:7048/api/Members/Login', postData.value)
  .then(response => {
  
    if(response.data[0]=="登入成功"){
      // 設置 'account' Cookie，過期時間為一小時後
      
      $cookie.setCookie('accountId', response.data[1]);
      $cookie.setCookie('avatarUrl', response.data[2]);
      $cookie.setCookie('bouns', response.data[3]);
      $cookie.setCookie('name', response.data[4]);

      console.log(response.data[0]);
      id= $cookie.getCookie("accountId")
      console.log( id);
//
      // console.log( header.isAccountIdExists);
      // header.isAccountIdExists = true;
//
      router.push('/');
      
      //從cookies中拿Id
      axios.post(`https://localhost:7048/api/Members/MemberId?protectId=${id}`, id)
         .then(response => {
          console.log(response.data);
          globalId =response.data;
          console.log(globalId);
            console.log( $cookie.getCookie("accountId")); 
            })
         .catch(error => {
            console.log(error);
          });
      
    }
    else{
      console.log(response.data[0]);
    }
  })
  .catch(error => {
    console.log(error);
  });
};
  const test = async() =>{
    let name= $cookie.getCookie("name")
    console.log(name);
  };

  const handleGoogleLogin = async () => {
    const accessToken = await googleTokenLogin({
      clientId: GOOGLE_CLIENT_ID
    }).then((response) => response?.access_token)
  
    if (!accessToken) {
      // 登入失敗
      return
    }
    const { data } = await useFetch('/api/auth/google-auth-token', {
      method: 'POST',
      body: {
        accessToken
      }
    })
    console.log(data.value.id);
    axios.post(`https://localhost:7048/api/Members/GoogleId?googleId=${data.value.id}`, data.value.id)
         .then(response => {

          if(response.data[0]=="登入成功")
          {
            console.log(response.data[1]);
            $cookie.setCookie('accountId', response.data[1]);
            $cookie.setCookie('avatarUrl', response.data[2]);
            $cookie.setCookie('bouns', response.data[3]);
            $cookie.setCookie('name', response.data[4]);
            router.push('/');
          }
          else 
          {
            const audio = new Audio('/audio/click.wav');
            audio.play();
            isActive.value = !isActive.value;
            console.log(isActive.value);
          };

            })
         .catch(error => {
            console.log(error);
          });
    
  }

</script>