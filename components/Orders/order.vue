<template>
  <div class="container">
    <h1 class="text-center mb-4">訂單詳情</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
       
        <div class="mt-4">
          <input type="text" class="form-control" v-model="orderId" placeholder="輸入訂單編號">
          <button class="btn btn-primary mt-2" @click="fetchOrder">查詢訂單</button>
           <!-- <div class="card"> -->
            <div class="card-body">
            <div v-if="order">
              <p class="mb-0"><strong>訂單編號:</strong> {{ order.orderNumber }}</p>
              <p class="mb-0"><strong>總金額:</strong> {{ order.totalAmount }}</p>
            </div>
            <!-- <div v-else>
              <p class="mb-0 text-muted">未找到訂單</p>
            </div> -->
          </div>
        <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { VueCookieNext as $cookie } from 'vue-cookie-next';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const route = useRoute();
let amount = 0;
let cartItems = ref([]);
let id;

async function getAmount() {
  id = $cookie.getCookie('Id');
  const response = await axios.get(`https://localhost:7048/api/CartItems/${id}`);
  cartItems.value = response.data;
  
  for (let item of cartItems.value) {
    let gameResponse = await axios.get(`https://localhost:7048/api/Games/${item.gameId}`);
    let game = gameResponse.data;
    if (game.discountPrice !== 0) {
      amount += game.discountPrice;
    } else {
      amount += game.price;
    }
  }
}

onMounted(async () => {
  console.log(route.query.transactionId);
  if (route.query.transactionId !== undefined) {
    await getAmount();
    let postData = {
      currency: "TWD",
      amount: amount
    };
    console.log(cartItems.value);
    let response = await axios.post(`https://localhost:7048/api/LinePay/Confirm?transactionId=${route.query.transactionId}&orderId=${route.query.orderId}`, postData);
    if (response.data.returnCode === "0000") {
      for (let item of cartItems.value){
        let postData = {
          gameId: item.gameId,
          memberId: item.memberId
        };
        await axios.post('https://localhost:7048/api/Order', postData);
      }
      await axios.delete(`https://localhost:7048/api/CartItems/delete/${id}`);
    }
  }
});

let order = ref(null);
let orderId = ref('');
async function fetchOrder() {
  try {
    const response = await axios.get(`https://localhost:7048/api/Order/member/${orderId.value}`);
    order.value = response.data;
  } catch (error) {
    console.error('查詢訂單時出現錯誤：', error);
    order.value = null;
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
