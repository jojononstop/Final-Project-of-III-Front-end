<template>
    <div>
      <button class="checkout" @click="postLinePay">LinePay結帳</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const cartItem = ref(null);
  
  const postLinePay = async () => {
    try {
      const data = {
  "amount": 1,
  "currency": "TWD",
  "orderId": "1",
  "packages": [
    {
      "id": "1",
      "amount": 1,
      "name": "POKEMON",
      "products": [
        {
          "name": "POKEMON",
          "quantity": 1,
          "price": 1
        }
      ]
    }
  ],
  "redirectUrls": {
    "confirmUrl": "string",
    "cancelUrl": "string"
  }
};
  
const res = await axios.post('https://localhost:7048/api/LinePay/Create', data);
    cartItem.value = res.data;
    
    // 檢查是否有 paymentUrl 屬性
    if (res.data.info && res.data.info.paymentUrl && res.data.info.paymentUrl.web) {
      const paymentUrl = res.data.info.paymentUrl.web;
      console.log("Payment URL:", paymentUrl);
      window.location.href = paymentUrl; // 將瀏覽器重定向到 LinePay 支付頁面
    } else {
      console.error("無法找到 paymentUrl 屬性或 paymentUrl.web 屬性。");
    }
  } catch (error) {
    console.error('調用 LINE PAY API 時出錯：', error);
  }
  };
  </script>
  
  <style scoped>
  .checkout {
    padding: 10px 20px;
    background-color: green;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  </style>
  