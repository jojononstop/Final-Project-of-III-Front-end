<template>
  <div class="shop__bonus__item">
    <div class="shop__bonus__item-thumb" ><p>{{ memberBonusPoint }}</p>
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
        <div class="modal-content" style="background-color: #182029;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            內容
          </div>
          <div>
            <button type="button" class="btn btn-primary" @click="switchBtn">切換</button>
          </div>

          <div class="modal-footer">
            <button v-if="isApplyMode" type="button" class="btn btn-primary" @click="applyBonusProduct">套用</button>
            <button v-else type="button" class="btn btn-primary" @click="buyBonusProduct">購買</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref,defineProps } from "vue";
import { VueCookieNext as $cookie } from 'vue-cookie-next'

//cookie
let memberId = ref('');
memberId = $cookie.getCookie("Id");

let memberBonusPoint = ref('');
memberBonusPoint = $cookie.getCookie("bouns");

let isModalOpen= ref(false);
let isApplyMode = ref(true);



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

function imgclickEvent(id)
{
  openModal();
  console.log(id);
}

function switchBtn()
{
  console.log("切換按鈕")
  isApplyMode.value = !isApplyMode.value;
}

function buyBonusProduct()
{
  console.log("購買按鈕")
}

function applyBonusProduct() {
  console.log("套用按鈕");
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