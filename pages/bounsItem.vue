<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-three title="紅利商品收藏庫" subtitle="BONUSITEM LIST"> </breadcrumb-three>
    <!-- breadcrumb area end -->
    <!-- item -->
    <bonusItems-area v-if="dbData_bonusProductTypes"
    :bonusProductsInArea="dbData_bonusProducts" 
    :bonusProductTypesInArea="dbData_bonusProductTypes" 
    @data-from-bonus="handleDataFromBonus"></bonusItems-area>
  </div>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";

// 透過axios GET & POST請求
import axios from "axios";

const dbData_bonusProductsByMemberId = ref(null);
const dbData_bonusProductTypes = ref(null);

onMounted(async () => {
  try {
    //Get All BonusProduct By MenberId
    // const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/${memberId}`);
    // dbData_bonusProductsByMemberId.value = responseByMenberId.data;

    //Get All BonusProduct By MenberId
    const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/1`);
    dbData_bonusProductsByMemberId.value = responseByMenberId.data;

    //Get All BonusType
    // 把請求的資料丟到bonusProductTypes
    const responseAllTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    dbData_bonusProductTypes.value = responseAllTypes.data;
    
    // // Get BonusProduct By TypeId
    // const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
    // bonusProducts.value = responseTypes.data;

    // Update MemberBonusItem Using
    // 把請求丟到memberProductItem，並將修改更新到資料庫
    // const responseMemberProductItem = await axios.get(`https://localhost:7048/api/BonusProducts/update?memberId=${memberId}&bonusId=${bonusId}&usingStatus=${using}`);
    // dbData_mamberProductItemStatus.value = responseMemberProductItem.data;
    
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
