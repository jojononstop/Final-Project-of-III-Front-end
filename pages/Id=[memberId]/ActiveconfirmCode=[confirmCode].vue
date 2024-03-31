<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <h2 v-if="loading">驗證中...</h2>
        <h2 v-if="message">{{ message }}</h2>
        <router-link to="/Login" v-if="trueactive">點此進行登入</router-link>
      </div>
  </section>
</template>



<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router';

const loading = ref(true);
const message = ref(null);
const trueactive = ref(false);
const router = useRoute();




(async () => {
  // 获取URL参数
  const memberId = router.params.memberId;
  const confirmCode = router.params.confirmCode;

  // 模拟异步验证
  try {
    // 这里你可以根据memberId和confirmCode进行验证操作，例如向后端API发送验证请求等
    console.log(memberId);
    console.log(typeof memberId);
    console.log(confirmCode);
    console.log(typeof confirmCode);
    await new Promise(resolve => setTimeout(resolve, 2000));

    active(memberId, confirmCode);


    // 假设这里直接验证通过


    // loading.value = false;
    // message.value = '已開通成功,謝謝!';
  } catch (error) {
    // loading.value = false;
    // message.value = '此用戶已通過驗證.';
  }
})();

const active = (memberId, confirmCode) => {
    const postData = {
      Id: memberId,
      confirmCode: confirmCode
    };
    console.log(postData);
    //https://localhost:7048/api/Members/ActiveRegister
    //https://localhost:7048/api/Members/ActiveRegister?id=${memberId}&confirmCode=${confirmCode}
    axios.post(`https://localhost:7048/api/Members/ActiveRegister`, postData)
    .then(response => {
      console.log(response.data);
    if(response.data ==1){
      loading.value = false;
      trueactive.value= true;
      message.value = '已開通成功,謝謝!';    
    }
    else{
      loading.value = false;
      message.value = '此用戶早已通過驗證.';
    }
  })
  .catch(error => {
    console.log(error);
  });
};

</script>



    <!-- async created() {
      // 获取URL参数
      const memberId = this.$route.query.memberId;
      const confirmCode = this.$route.query.confirmCode;
  
      // 模拟异步验证
      try {
        // 这里你可以根据memberId和confirmCode进行验证操作，例如向后端API发送验证请求等
        // 假设这里直接验证通过
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.loading = false;
        this.message = 'Email verified successfully!';
      } catch (error) {
        this.loading = false;
        this.message = '驗證失敗. 請重新申請.';
      }
    }
  }; -->