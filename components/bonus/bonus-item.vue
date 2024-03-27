<template>
  <div class="shop__bonus__item">
    <div class="shop__bonus__item-thumb" >
      <img :src="`/images/bonus/${bonusProduct.productTypeId}/${bonusProduct.url}`" typeof="btn" @click="imgclickEvent( bonusProduct.id)" style="cursor: pointer;"data-bs-toggle="modal" data-bs-target="#exampleModal"/>
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
          <div v-if="isModalOpen">測試元件開關</div>
        </h4>
      </div>
      <div class="shop__item-content-top">
        <nuxt-link to="/shop">{{ getProductTypeName(bonusProduct.productTypeId) }}</nuxt-link>
        <!-- 價格 -->
        <div class="shop__item-price">${{ bonusProduct.price }}</div>
      </div>
    </div>

    <!-- 定義模態框 -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            內容
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">1</button>
            <button type="button" class="btn btn-primary">2</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref,defineProps } from "vue";
import { VueCookieNext as $cookie } from 'vue-cookie-next'

let id = ref('');
id = $cookie.getCookie("Id");

const props = defineProps({
  bonusProduct: Object,
  bonusProductTypes: Object
});
let isModalOpen= ref(false);

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

function imgclickEvent(id)
{
  openModal();
  console.log(id);
}

const openModal = () => {
  // 點擊圖片時打開模態框
  isModalOpen.value = true;
};

const closeModal = () => {
  // 關閉模態框
  isModalOpen.value = false;
};
</script>