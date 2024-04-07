<template>
  <div>
    <HomeAutoplay></HomeAutoplay>
    <team-area></team-area>
    <div className="area-background" style="background-image: url(/images/bg/area_bg01.jpg)">
      <HomeTopsix></HomeTopsix>
    </div>
    <streamers-area></streamers-area>

    <HomeGameArea></HomeGameArea>
    <HomeGamenew></HomeGamenew>

    <nft-item-area></nft-item-area>
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
