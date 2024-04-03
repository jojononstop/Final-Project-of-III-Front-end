<template>
  <ClientOnly>
  <div>
    <breadcrumb-three title="紅利商品收藏庫" subtitle="COLLEECT LIST"> </breadcrumb-three>

    <bonusUserCollect-area v-if="dbData_bonusProductsByMemberId && dbData_bonusProductTypes"
    :bonusProductsByMemberIdInArea="dbData_bonusProductsByMemberId"
    :bonusProductTypesInArea="dbData_bonusProductTypes" 
    @data-from-bonus="handleDataFromBonus"></bonusUserCollect-area>
  </div>
</ClientOnly>
</template>

<script setup>
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";
//cookie
import { VueCookieNext as $cookie } from 'vue-cookie-next'
// 透過axios GET & POST請求
import axios from "axios";

const dbData_bonusProductsByMemberId = ref(null);
const dbData_bonusProductTypes = ref(null);
const dbData_mamberProductItemStatus = ref(null);

let bonusId;
let using;

onMounted(async () => 
{
  let memberId = $cookie.getCookie("Id");
  let cookiedetails = $cookie
  try 
  {
    // Get All BonusProduct By MenberId
    const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/${memberId}`);
    dbData_bonusProductsByMemberId.value = responseByMenberId.data;

    // console.log(dbData_bonusProductsByMemberId.value[0].id)

    //Get All BonusProduct By MenberId
    // const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/1`);
    // dbData_bonusProductsByMemberId.value = responseByMenberId.data;

    //Get All BonusType
    const responseAllTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    dbData_bonusProductTypes.value = responseAllTypes.data;
    
    // // Get BonusProduct By TypeId
    // const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
    // bonusProducts.value = responseTypes.data;

    // Update MemberBonusItem Using - 切換使用狀態
    // const responseMemberProductItem = await axios.get(`https://localhost:7048/api/BonusProducts/update?memberId=${memberId}&bonusId=${bonusId}&usingStatus=${using}`);
    // dbData_mamberProductItemStatus.value = responseMemberProductItem.data;
  }
  catch (error) 
  {
    console.error("未正確找到紅利商品", error);
  }
});
async function handleDataFromBonus(keyword)
{
  if(keyword === '')
  {
    //Get All BonusProduct By MenberId
    const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/1`);
    dbData_bonusProductsByMemberId.value = responseByMenberId.data;
    console.error("未正確找到紅利商品", error);
  }
  else
  {
    const responseSearchName = await axios.get(`https://localhost:7048/api/BonusProducts/Name/${keyword}`);
    // 把接到的請求資料丟到bonusProducts
    dbData_bonusProducts.value = responseSearchName.data;
    console.error("未正確找到紅利商品", error);
  }
}
</script>
