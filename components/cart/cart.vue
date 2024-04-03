<template>
  <div>
    <div v-if="cartItem">
      <div v-for="item in cartItem.items" :key="item.id">
        <!-- <p>測試</p>
        <p>項目 ID：{{ item.id }}</p>
        <p>數量：{{ item.qty }}</p> -->
        <p>購買遊戲：{{ item.gameName }}, {{ item.image }}</p>
        <p>價格：{{ item.id }}</p>

        
      </div>
    </div>
    <div v-else>
      <p>購物車為空</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cartItem = ref(null);

onMounted(async()=>{
  // try {
  //   const res = await axios.get("https://localhost:7048/api/Cart/1");
  //   cartItem.value = res.data;
  //   console.log(res.data);
  // } catch (error) {
  //   console.error("獲取購物車時發生錯誤：", error);
  // }
  // console.log(cartItem.value.id)
}

)

</script>
