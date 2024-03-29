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
          <div>
            <h4>投影片部分</h4>
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="false"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <h4>第一頁</h4>
                </div>
                <div class="carousel-item">
                  <h4>第二頁</h4>
                </div>
                <div class="carousel-item">
                  <h4>第三頁</h4>
                </div>
              </div>
              <div id="button-container">
              
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <!--物品清單-->
          <div
            class="row justify-content-start row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1"
          >
            <!-- 把接到的請求資料丟到bonusProducts -->
            <!-- V1 -->
            <div v-for="bonusProductItem in dbToArea_bonusProducts" :key="bonusProductItem.id" class="col">
              <bonus-item
                :AreaToItem_bonusProduct="bonusProductItem"
                :AreaToItem_bonusProductTypes="dbToArea_bonusProductTypes"
                :modalId="'exampleModal_' + bonusProductItem.id"
              />
            </div>

            <!-- V2 -->
            <div v-for="bonusProduct in bonusProducts" :key="bonusProduct.id" class="col">
              <bonus-item
                :bonusProduct="bonusProduct"
                :bonusProductTypes="bonusProductTypes"
                :modalId="'exampleModal_' + bonusProduct.id"
              />
            </div>
          </div>
          <!-- 換頁按鈕 -->
          <div class="pagination__wrap">
            <ul class="list-wrap d-flex flex-wrap justify-content-center">
              <li><nuxt-link to="#" class="page-numbers">01</nuxt-link></li>
              <li><span class="page-numbers current">02</span></li>
              <li><nuxt-link to="#" class="page-numbers">03</nuxt-link></li>
              <li><nuxt-link to="#" class="page-numbers">....</nuxt-link></li>
              <li>
                <nuxt-link to="#" class="next page-numbers">
                  <i class="fas fa-angle-double-right"></i>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import product_data from "@/data/product-data";
import { defineProps, defineEmits, onMounted } from "vue";

// const props = defineProps({
//   bonusProducts: Object,
//   bonusProductTypes: Object,
// });

const props = defineProps({
  dbToArea_bonusProducts: Object,
  dbToArea_bonusProductTypes: Object,
});

onMounted(() => {
  // console.log(props.dbToArea_bonusProducts, props.dbToArea_bonusProductTypes);
});


const emits = defineEmits(["data-from-bonus"]);

function handleSearch(keyword) {
  // console.log("Search keyword",keyword);
  emits("data-from-bonus", keyword);
}
</script>
