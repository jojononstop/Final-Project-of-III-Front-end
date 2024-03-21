<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-three title="BONUS" subtitle="BONUS LIST"> </breadcrumb-three>
    <!-- breadcrumb area end -->
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
const bonusSearchName =ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("https://localhost:7048/api/BonusProducts");
    // 把接到的請求資料丟到bonusProducts
    bonusProducts.value = response.data;

    const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
    // 把接到的請求資料丟到bonusProductTypes
    bonusProductTypes.value = responseTypes.data;

    const responseSearchName = await axios.get(`https://localhost:7048/api/BonusProducts/Name/${productName}`);
    // 把接到的請求資料丟到bonusSearchName
    bonusSearchName.value = responseSearchName.data;

  } catch (error) {
    console.error("未正確找到紅利商品", error);
  }
});
</script>
