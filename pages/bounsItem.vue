<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-three title="BONUS" subtitle="BONUS LIST"> </breadcrumb-three>
    <!-- breadcrumb area end -->
    <!-- item -->
    <bonusItems-area ></bonusItems-area>
  </div>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";

// 透過axios GET & POST請求
import axios from "axios";

const dbData_bonusProducts = ref(null);
const dbData_bonusProductTypes = ref(null);

onMounted(async () => {
  try {
    //Get All BonusProduct
    // 把接到的請求資料丟到bonusProducts
    const responseAllBonusProduct = await axios.get("https://localhost:7048/api/BonusProducts");
    dbData_bonusProducts.value = responseAllBonusProduct.data;

    //Get All BonusType
    // 把請求的資料丟到bonusProductTypes
    const responseAllTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    dbData_bonusProductTypes.value = responseAllTypes.data;

    // console.log(dbData_bonusProducts.value,dbData_bonusProductTypes.value)
    
    // // 把接到的請求資料丟到bonusProducts
    // const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
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
      //
      // 把接到的請求資料丟到bonusProducts
      const response = await axios.get("https://localhost:7048/api/BonusProducts");
      dbData_bonusProducts.value = responseAllBonusProduct.data;
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
      dbData_bonusProducts.value = responseSearchName.data;
    }
    catch(error)
    {
      console.error("未正確找到紅利商品", error);
    }
  }
}
</script>
