<template>
  <section class="bonus-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-4 col-md-11 order-2 order-lg-0">
          <!-- 使用這頭像 -->
          <div class="my-outer-container" >
            <img :src="`${memberAvatarURL}`" alt="Image 1" class="my-image" />
            <img src="/public/images/Bonus/4/nullImg.png" alt="Image 2" class="my-Frameimage" />
          </div>
          <!-- 搜尋功能列 -->
          <bonus-sidebar @search="handleSearch" />
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