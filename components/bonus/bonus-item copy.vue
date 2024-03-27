<template>
  <div class="shop__bonus__item">
    <div class="shop__bonus__item-thumb">
      <img :src="`/images/bonus/${bonusProduct.productTypeId}/${bonusProduct.url}`" typeof="btn"/>
      <!-- <nuxt-link :to="`/shop-details/${bonusProduct.id}`">
        <img :src="`/images/bonus/${bonusProduct.productTypeId}/${bonusProduct.url}`" typeof="btn" />
      </nuxt-link> -->
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
    <!-- 定義模態框 -->
    <div class="modal" tabindex="-1" role="dialog" ref="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>test TEXT</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
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

// 新增模態框相關程式碼
function openModal() {
  // 在此處觸發模態框的顯示
  // 可以使用 Vue 或其他 JavaScript 框架/函式庫來實現模態框的顯示
}
</script>
