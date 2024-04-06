<template>
  <div>
    <LazyHomeAutoplay></LazyHomeAutoplay>
    <team-area></team-area>
    <div className="area-background" style="background-image: url(/images/bg/area_bg01.jpg)">
      <about-area></about-area>
    </div>
    <streamers-area></streamers-area>


    <!-- nft item area start -->
    <nft-item-area></nft-item-area>
    <!-- nft item area end -->


    <HomeGameArea></HomeGameArea>
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
