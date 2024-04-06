<style lang="scss">
@import "@/assets/css/my-style.css";
.my-outer-container {
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-image {
  position: absolute;
  top: 50%; /* 依附於父物件的垂直中心點 */
  left: 50%; /* 依附於父物件的水平中心點 */
  transform: translate(-50%, -50%); /* 把圖從第1象限調整至第3象限調整中心點(應該?) */
  width: 93%;
  height: auto;
}
.my-Frameimage {
  position: absolute;
  top: 50%; /* 依附於父物件的垂直中心點 */
  left: 50%; /* 依附於父物件的水平中心點 */
  transform: translate(-50%, -50%); /* 把圖從第1象限調整至第3象限調整中心點(應該?) */
  width: 100%;
  height: auto;
}
</style>

<template>
  <section class="bonus-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-4 col-md-11 order-2 order-lg-0">
          <!-- 使用這頭像 -->
          <div class="my-outer-container" >
            <img :src="`${memberAvatarURL}`" alt="使用者頭像" class="my-image" />
            <img v-if="isUsingFrame" :src="frameImagePath" alt="使用外框" class="my-Frameimage">
            <img v-else src="/public/images/Bonus/4/nullImg.png" alt="空外框" class="my-Frameimage" />
          </div>
          <!-- 搜尋功能列 -->
          <bonusUserCollect-sidebar @search="handleSearch" />
        </div>
        <div class="col-xl-9 col-lg-8 col-md-11">
        <!-- cookie檢查 -->
          <div>
            <!-- <div>{{ memberId }}</div> -->
          </div>
          <!--物品清單-->
          <div
            class="row justify-content-start row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1"
          >
            <!-- 把接到的請求資料丟到bonusProducts -->
            <div v-for="bonusProductItem in bonusProductsByMemberIdInArea"
            :key="bonusProductItem.id"
            class="col">
              <bonusUserCollect-item
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

let memberId = $cookie.getCookie("Id");
let memberAvatarURL = $cookie.getCookie("avatarUrl");

const props = defineProps({
  bonusProductsByMemberIdInArea: Object,
  bonusProductTypesInArea: Object,
});

// 判斷是否使用頭像
const isUsingAvatar = computed(() => {
  //遍歷持有物品，找到頭像類型
})


// 判斷是否有使的外框
const isUsingFrame = computed(() => {
  // 遍歷持有物品，找到外框的類型
  const frameProduct = props.bonusProductsByMemberIdInArea.find(product => {
    return product.productTypeId === 4 && product.using === true;
  });
  // 找出符合類型且有被使用的物品，返回true；否則返回false
  return !!frameProduct;
});

// 根据是否使用外框來決定外框路徑
const frameImagePath = computed(() => {
  // 遍歷持有物品，找找到外框的類型
  const frameProduct = props.bonusProductsByMemberIdInArea.find(product => {
    return product.productTypeId === 4 && product.using === true;
  });

  // 使用了返回使用路徑，沒使用則返回預設
  return isUsingFrame.value ? `/images/Bonus/4/${frameProduct.name}.png` : '/public/images/Bonus/4/nullImg.png';
});

onMounted(() =>
{
  // console.log(props.bonusProductsByMemberIdInArea);
  // console.log(props.bonusProductTypesInArea);
// console.log(cookiedetails)
});


const emits = defineEmits(["data-from-bonus"]);

function handleSearch(keyword) {
  // console.log("Search keyword",keyword);
  emits("data-from-bonus", keyword);
}
</script>
