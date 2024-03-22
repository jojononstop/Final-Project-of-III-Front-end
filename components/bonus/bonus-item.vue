<template>
  <div class="shop__bonus__item">
    <div class="shop__bonus__item-thumb">
      <nuxt-link :to="`/shop-details/${bonusProduct.id}`">
        <img :src="`/images/bonus/${bonusProduct.productTypeId}/${bonusProduct.url}`" typeof="btn" />
      </nuxt-link>
      <!-- 最愛按鈕 -->
      <nuxt-link to="#" class="wishlist-button">
        <i class="far fa-heart"></i>
      </nuxt-link>
    </div>

    <div class="shop__item-line"></div>
    <div class="shop__item-content">
      <div class="shop__item-content-top">
        <h4 class="title">
          <nuxt-link :to="`/shop-details/${bonusProduct.id}`">{{
            bonusProduct.name
          }}</nuxt-link>
        </h4>
        
      </div>
      <div class="shop__item-content-top">
        <nuxt-link to="/shop">{{ getProductTypeName(bonusProduct.productTypeId) }}</nuxt-link>
        <!-- 價格 -->
        <div class="shop__item-price">${{ bonusProduct.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  bonusProduct: Object,
  bonusProductTypes: Object
});

function getProductTypeName(productTypeId) 
{
  //都有傳進來
  if (props.bonusProductTypes && props.bonusProductTypes[productTypeId])
   {
    //傳出對應ID的名稱
    return props.bonusProductTypes[productTypeId].name;
  } 
  else 
  {
    return '';
  }
}
</script>
