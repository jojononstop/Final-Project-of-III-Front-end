<template>
  <div>
    
    <!-- breadcrumb area start -->
    <breadcrumb-three title="BONUS" subtitle="BONUS LIST"> </breadcrumb-three>
    <!-- breadcrumb area end -->
    
    <bonus-area-test :bonusProducts="bonusProducts"></bonus-area-test>
    
    <!-- item -->
    <bonus-area :bonusProducts="bonusProducts" :bonusProductTypes="bonusProductTypes"></bonus-area>
    
  </div>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";
// 透過axios GET & POST請求
import axios from "axios";

const bonusProducts = ref(null);
const bonusProductTypes = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("https://localhost:7048/api/BonusProducts");
    // 把接到的請求資料丟到bonusProducts
    bonusProducts.value = response.data;

    const responseTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    // 把接到的請求資料丟到bonusProductTypes
    bonusProductTypes.value = responseTypes.data;


  } catch (error) {
    console.error("未正確找到紅利商品", error);
  }
  console.log(bonusProducts.value) //GET Array test 渲染成功找一次
  console.log(bonusProductTypes.value)
});
</script>
