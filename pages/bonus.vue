<template>
  <ClientOnly>
  <div>
    <breadcrumb-three title="紅利點數商店" subtitle="BONUS LIST"> </breadcrumb-three> 
    <bonus-area v-if="dbData_bonusProducts && dbData_bonusProductTypes"
    :bonusProductsInArea="dbData_bonusProducts" 
    :bonusProductTypesInArea="dbData_bonusProductTypes"
    :bonusItemInArea="dbData_bonusProductsByMemberId"
    :errormessageInArea="errormessage"
    @data-from-bonus="handleDataFromBonus"></bonus-area>
  </div>
  </ClientOnly>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";

// 透過axios GET & POST請求
import axios from "axios";
//cookie
import { VueCookieNext as $cookie } from "vue-cookie-next";
const dbData_bonusProducts = ref(null);
const dbData_bonusProductTypes = ref(null);
const dbData_bonusProductsByMemberId = ref(null);

let errormessage = ``;

onMounted(async () => 
{
  let memberId = $cookie.getCookie("Id");
  let cookiedetails = $cookie
  try 
  {
    // Get All BonusProduct
    const responseAllBonusProduct = await axios.get("https://localhost:7048/api/BonusProducts");
    dbData_bonusProducts.value = responseAllBonusProduct.data;

    // Get All BonusType
    const responseAllTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    dbData_bonusProductTypes.value = responseAllTypes.data;
    
    // Get All BonusProduct By MenberId
    const responseByMenberId = await axios.get(`https://localhost:7048/api/BonusProducts/MemberId/${memberId}`);
    dbData_bonusProductsByMemberId.value = responseByMenberId.data;

    // console.log(responseByMenberId.data)

    // Add BonusProduct to BonusItem
    // 購買 API
    // const responseAddBonusItem = await axios.get(`https://localhost:7048/api/BonusProducts/${0}?memberId=${0}`);
    // dbData_addBonusItem.value = responseAddBonusItem.data;

    // // Get BonusProduct By TypeId
    // const responseTypes = await axios.get(`https://localhost:7048/api/BonusProducts/Type/${producttypeid}`);
    // bonusProducts.value = responseTypes.data;
  } 
  catch (error)
  {
    alert("未正確找到商品");
    console.error("未正確找到紅利商品", error);
  }
});
async function handleDataFromBonus(keyword)
{
  if(keyword === '' || keyword == null)
  {
    // Get All BonusProduct
    // 把接到的請求資料丟到bonusProducts
    const responseAllBonusProduct = await axios.get("https://localhost:7048/api/BonusProducts");
    dbData_bonusProducts.value = responseAllBonusProduct.data;

    console.log("KeyWordNull")
  }
  else
  {
    // 把接到的請求資料丟到bonusProducts
    const responseSearchName = await axios.get(`https://localhost:7048/api/BonusProducts/Name/${keyword}`);
    dbData_bonusProducts.value = responseSearchName.data;
      
    // console.log(dbData_bonusProducts.value);
    if(dbData_bonusProducts.value == "")
    {
      errormessage = `噢不！好像沒有找到\"${keyword}\"相關的商品`;
    }
  }
}
</script>
