<template>
  <div class="cart-page">
    <h1>購物車</h1>
    <Cart/>
    <div class="total">
      <p>總價:</p>
    </div>
    <button @click="checkout">LinePay結帳</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 計算總價格
// const total = computed(() => {
//   return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
// });

// 結帳函數
function checkout() {
  // 實現結帳的邏輯
  console.log('正在跳轉...');
}
</script>

<style scoped>
/* 在這裡添加您的樣式 */
.cart-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.total {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
