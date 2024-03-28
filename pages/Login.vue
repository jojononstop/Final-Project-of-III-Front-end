<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px"
    data-background="/images/slider/slider_bg.jpg">
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
      <div style="display: grip; justify-content: center;align-items: center;">
        <!-- height: 30vh;width:50vh; -->
        <!-- background-color:#242633  -->
        <div style="margin-left:12vh;margin-top:3vh;">
          <p style="display: inline-block; ">帳號: </p>
          <input v-model="postData.account" id="account" style="display: inline-block; margin-left: 10px;">
        </div>
        <div style="margin-left:12vh;margin-top:2vh;">
          <p style="display: inline-block; ">密碼: </p>
          <input v-model="postData.password" id="password" type="password"
            style="display: inline-block; margin-left: 10px;">
        </div>
        <button v-on:click="login"
          style="display: flex; justify-content: center; align-items: center; margin-left: 20vh; margin-top: 2vh; width: 10vh; text-align: center;">登入</button>
        <!-- Google Sign-In 按钮 -->
        <div class="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8" style="margin-top:6vh;">
          <div class="flex w-full max-w-md flex-col items-center justify-center"
            style="margin-left:12vh;margin-top:2vh;">
            <img src="../public/images/login/googleSign.png" alt="" @click="handleGoogleLogin">
            <!-- <button 
          class="flex rounded-md border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" style="margin-left:12vh;margin-top:8vh;background-image:url(../public/images/login/googleSign.png)"
          @click="handleGoogleLogin"
          >

             <span class="text-slate-500 group-hover:text-slate-600">使用 Google 進行登入</span>
          </button> -->
            <LoginModal v-if="isActive" @closeModal="handleGoogleCloseLogin" />
          </div>
        </div>
        <div class="flex w-full max-w-md flex-col items-center justify-center" style="margin-left:15vh;margin-top:2vh;">
          <p style="font-size: 14px;">沒有帳號嗎?點擊此處<router-link to="/register">註冊新帳號</router-link></p>
          <!-- <button  @click="register">註冊帳號</button> -->
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
import connection from '@/data/signalR';


const isActive = ref<boolean>(false);


// import { ElMessageBox } from 'element-plus';

var id = "";
let globalId;
useSeoMeta({ title: "Login" });

const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

const userInfo = ref(null)

const router = useRouter();
const callback = (response: any) => {
  console.log(response)
}
// 開彈窗
// const handleOpenLogin = (audioPath: string) => {
//   const audio = new Audio(audioPath);
//   audio.play();
//   isActive.value = !isActive.value;
// };
// 關彈窗
const handleGoogleCloseLogin = (audioPath: string) => {
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

      if (response.data[0] == "登入成功") {
        // 設置 'account' Cookie，過期時間為一小時後

        $cookie.setCookie('accountId', response.data[1]);
        $cookie.setCookie('avatarUrl', response.data[2]);
        $cookie.setCookie('bouns', response.data[3]);
        $cookie.setCookie('name', response.data[4]);
        $cookie.setCookie('Id', response.data[5]);

        connection.start().then(() => {
          console.log('SignalR 成功連線');
        }).catch(err => {
          console.error('SignalR connection failed:', err.toString());
        });

        connection.on('userconnected', (ConnectionId) => {
          // 在這裡處理從伺服器端接收到的通知
          console.log('新使用者已連接：', ConnectionId);
          console.log('新使用者ID：', ConnectionId.ConnectionId);
        });
        connection.on('userdisconnected', (ConnectionId) => {
          // 在這裡處理從伺服器端接收到的通知
          console.log('使用者已離線：', ConnectionId);
          console.log('離線使用者ID：', ConnectionId.ConnectionId);
        });

        console.log(response.data[0]);
        id = $cookie.getCookie("accountId")
        console.log(id);
        //
        // console.log( header.isAccountIdExists);
        // header.isAccountIdExists = true;
        //
        router.push('/');

        //從cookies中拿Id
        axios.post(`https://localhost:7048/api/Members/MemberId?protectId=${id}`, id)
          .then(response => {
            console.log(response.data);
            globalId = response.data;
            console.log(globalId);
            console.log($cookie.getCookie("accountId"));
          })
          .catch(error => {
            console.log(error);
          });

      }
      else {
        console.log(response.data[0]);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
const test = async () => {
  let name = $cookie.getCookie("name")
  console.log(name);
};

const register = async () => {
  router.push('/register');
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

  let google = data.value.id;
  console.log(google);
  axios.post(`https://localhost:7048/api/Members/GoogleId?googleId=${data.value.id}`, data.value.id)
    .then(response => {

      if (response.data[0] == "登入成功") {
        console.log(response.data[1]);
        $cookie.setCookie('accountId', response.data[1]);
        $cookie.setCookie('avatarUrl', response.data[2]);
        $cookie.setCookie('bouns', response.data[3]);
        $cookie.setCookie('name', response.data[4]);
        $cookie.setCookie('Id', response.data[5]);
        $cookie.setCookie('google', google);


        // 斷開事件處理程序
        connection.onclose(async () => {
          console.log('連線中斷,嘗試重連...');

          // 重新連接函數
          async function start() {
            try {
              // 重新連接
              await connection.start();
              console.log('重新連線成功.');
            } catch (err) {
              console.error('Error while reconnecting:', err);
              // 設置重連延遲時間，這裡可以根據需求調整
              await new Promise(resolve => setTimeout(resolve, 5000));
              // 再次嘗試重新連接
              await start();
            }
          }

          // 開始重新連接
          await start();
        });

        // 開始 SignalR 連接
        connection.start().then(() => {
          console.log('SignalR 連線成功.');
        }).catch(err => console.error('Error while establishing SignalR connection:', err));

        router.push('/');
      }
      else {
        const audio = new Audio('/audio/click.wav');
        audio.play();
        console.log(isActive.value);
        isActive.value = !isActive.value;
        console.log(isActive.value);
        // router.push('/register');
      };

    })
    .catch(error => {
      console.log(error);
    });

}

</script>