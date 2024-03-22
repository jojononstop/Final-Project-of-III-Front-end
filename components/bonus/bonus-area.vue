<template>
  <section class="bonus-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-4 col-md-11 order-2 order-lg-0">
          <!-- 搜尋功能列 -->
          <bonus-sidebar-test @search="handleSearch"/>
        </div>
        <div class="col-xl-9 col-lg-8 col-md-11">
          <div class="row justify-content-center row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1"><!--物品清單-->
            <!-- 把接到的請求資料丟到bonusProducts -->
            <div v-for="bonusProduct in bonusProducts" :key="bonusProduct.id" class="col">
              <bonus-item :bonusProduct="bonusProduct" :bonusProductTypes="bonusProductTypes" />
            </div>
          </div>
          <div class="pagination__wrap"><!-- 換頁按鈕 -->
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
import product_data from "@/data/product-data";
import { defineProps ,defineEmits} from "vue";

const props = defineProps({
  bonusProducts: Object,
  bonusProductTypes: Object
});

const emits = defineEmits(['data-from-bonus'])

function handleSearch(keyword)
{
  // console.log("Search keyword",keyword);
  emits('data-from-bonus',keyword);
}
</script>
