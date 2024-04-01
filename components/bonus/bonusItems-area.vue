<style lang="scss">
@import "@/assets/css/my-style.css";
</style>

<template>
  <section class="bonus-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-4 col-md-11 order-2 order-lg-0">
          <!-- 搜尋功能列 -->
          <bonus-sidebar @search="handleSearch" />
        </div>
        <div class="col-xl-9 col-lg-8 col-md-11">
        <!-- cookie檢查 -->
          <div>
            <div>{{ cookiedetails }}</div>
          </div>
          <!--物品清單-->
          <div
            class="row justify-content-start row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1"
          >
            <!-- 把接到的請求資料丟到bonusProducts -->
            <div v-for="bonusProductItem in bonusProductsInArea" :key="bonusProductItem.id" class="col">
              <bonus-item
                :bonusProductsInItem="bonusProductItem"
                :bonusProductTypesInItem="bonusProductTypesInArea"
                :modalId="'exampleModal_' + bonusProductItem.id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";

//cookie
import { VueCookieNext as $cookie } from 'vue-cookie-next'
let id = $cookie.getCookie("Id");
let bonus = $cookie.getCookie("bonus");
let cookiedetails = $cookie

const props = defineProps({
  bonusProductsInArea: Object,
  bonusProductTypesInArea: Object,
});

onMounted(() => {
  // console.log(props.bonusProductsInArea, props.bonusProductTypesInArea);
  console.log(cookiedetails)
});


const emits = defineEmits(["data-from-bonus"]);

function handleSearch(keyword) {
  // console.log("Search keyword",keyword);
  emits("data-from-bonus", keyword);
}
</script>
