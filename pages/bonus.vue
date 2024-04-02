<template>
  <div>
    <breadcrumb-three title="BONUS" subtitle="BONUS LIST"> </breadcrumb-three>
    
    <bonus-area v-if="dbData_bonusProducts && dbData_bonusProductTypes"
    :bonusProductsInArea="dbData_bonusProducts" 
    :bonusProductTypesInArea="dbData_bonusProductTypes"
    :errormessageInArea="errormessage"
    @data-from-bonus="handleDataFromBonus"></bonus-area>
  </div>
</template>

<script setup >
useSeoMeta({ title: "BONUS - MYKD" });
import { ref ,onMounted } from "vue";

// 透過axios GET & POST請求
import axios from "axios";

const dbData_bonusProducts = ref(null);
const dbData_bonusProductTypes = ref(null);

let errormessage = ``;

onMounted(async () => 
{
  try 
  {
    // Get All BonusProduct
    // 把接到的請求資料丟到bonusProducts
    const responseAllBonusProduct = await axios.get("https://localhost:7048/api/BonusProducts");
    dbData_bonusProducts.value = responseAllBonusProduct.data;

    // Get All BonusType
    // 把請求的資料丟到bonusProductTypes
    const responseAllTypes = await axios.get("https://localhost:7048/api/BonusProducts/Type");
    dbData_bonusProductTypes.value = responseAllTypes.data;
    
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
