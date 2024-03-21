<template>
  <div>
    <!-- hero banner start -->
    <hero-banner-one></hero-banner-one>
    <!-- hero banner end -->

    <!-- nft item area start -->
    <nft-item-area></nft-item-area>
    <!-- nft item area end -->

    <!-- area bg wrapper start -->
    <div
      className="area-background"
      style="background-image: url(/images/bg/area_bg01.jpg)"
    >
      <!-- about-area -->
      <about-area></about-area>
      <!-- about-area-end -->

      <!-- gallery area start -->
      <gallery-area></gallery-area>
      <!-- gallery area end -->
    </div>
    <!-- area bg wrapper end -->

    <!-- team area start -->
    <team-area></team-area>
    <!-- team area end -->

    <!-- video area start -->
    <video-area></video-area>
    <!-- video area end -->

    <!-- road map area start -->
    <road-map-area></road-map-area>
    <!-- road map area end -->

    <!-- trending nft items -->
    <nft-item-trending></nft-item-trending>
    <!-- trending nft items -->
  </div>
</template>

<script setup lang="ts">
//import { useRouter } from 'vue-router';
useSeoMeta({ title: "Home - MYKD" });

// // 在页面加载后执行刷新操作
// onMounted(() => {
//   refreshHeader();
// });

// const refreshHeader = () => {
//   router.go(); 
// };

</script>
