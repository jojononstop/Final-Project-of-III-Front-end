<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-three title="BONUS" subtitle="BONUS LIST"> </breadcrumb-three>
    <!-- breadcrumb area end -->
    <!-- item -->
    <bonus-area :bonusProducts="bonusProducts" :bonusProductTypes="bonusProductTypes" @data-from-bonus="handleDataFromBonus"></bonus-area>
    
  </div>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";
import { VueCookieNext as $cookie } from 'vue-cookie-next'

// 透過axios GET & POST請求
import axios from "axios";

let id = $cookie.getCookie("Id");
console.log(id)

const bonusProducts = ref(null);
const bonusProductTypes = ref(null);
const bonusSearchName =ref(null);

onMounted(async () => {

  try {
    const response = await axios.get("https://localhost:7048/api/BonusProducts");
    // 把接到的請求資料丟到bonusProducts
    bonusProducts.value = response.data;
    
    // const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
    // // 把接到的請求資料丟到bonusProducts
    // bonusProducts.value = responseTypes.data;
  } catch (error) {
    console.error("未正確找到紅利商品", error);
  }
});
async function handleDataFromBonus(keyword)
{
  if(keyword === '')
  {
    try
    {
      const response = await axios.get("https://localhost:7048/api/BonusProducts");
      // 把接到的請求資料丟到bonusProducts
      bonusProducts.value = response.data;
    }
    catch(error)
    {
      console.error("未正確找到紅利商品", error);
    }
  }
  else
  {
    try
    {
      const responseSearchName = await axios.get(`https://localhost:7048/api/BonusProducts/Name/${keyword}`);
      // 把接到的請求資料丟到bonusProducts
      bonusProducts.value = responseSearchName.data;
    }
    catch(error)
    {
      console.error("未正確找到紅利商品", error);
    }
  }
}
</script>
