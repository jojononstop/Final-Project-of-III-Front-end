<template>
    <div>
      <button class="btn btn-info" @click="postlinepay">正在跳轉</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const cartItem = ref(null);
  
  onMounted(async()=>{
    try {
      const res = await axios.("https://localhost:7048/api/LinePay/Create");
      cartItem.value = res.data;
      console.log(res.data);
    } catch (error) {
      console.error("獲取購物車時發生錯誤：", error);
    }
    console.log(cartItem.value.id)
  }
  
  )
  
  </script>
  