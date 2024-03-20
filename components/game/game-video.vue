<template>
  <section class="video__area video-bg tg-jarallax" :style="{
    backgroundImage: `url('/images/games/cover/${gameData.dlCs[0].developerId}/${gameData.dlCs[0].id}/${gameData.dlCs[0].cover}')`,
    backgroundSize: '460px 215px',
    backgroundPosition: 'center'
  }">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8 col-md-11">
          <div class="video__content text-center">
            <a class="popup-video cursor-pointer" @click="playVideo('ssrNcwxALS4')">
              <i class="flaticon-play"></i>
            </a>
            <h2 class="title">JOIN THE <span>COMMUNITY</span></h2>
            <p>Join our Discord community and choosec onsteur</p>
            <a href="https://discord.com/" target="_blank" class="video__btn tg-btn-1">
              <span>join discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- video popup start -->
  <popup-video></popup-video>
  <!-- video popup end -->
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  gameData: Object,
});
const { playVideo } = useVideoPopup();
</script>
