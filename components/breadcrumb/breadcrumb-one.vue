<template>
  <section class="breadcrumb-area" :style="`background-image:url(${bg})`">
    <div class="container">
      <div class="breadcrumb__wrapper">
        <div class="row">
          <div class="col-xl-6 col-lg-7">
            <div class="breadcrumb__content">
              <h2 class="title">{{ title }}</h2>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb" style="list-style-type: none;">
                  <!-- <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                  </li> -->
                  <!--  -->
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ subtitle }}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div
            class="col-xl-6 col-lg-5 position-relative d-none d-lg-block"
          >
          <!-- breadcrumb__img -->
            <div class="breadcrumb__myimg;" style="background-color: red; width:100%">
              <div class="my-outer-container;" >
            
                <img :src="brd_img" alt="img" class="my-image" style="width: 279px;height:279px"/>
                <img :src="Frame_img" alt="img" class="my-Frameimage" style="width: 300px;height:300px"/>

              </div>
            </div>

            <!-- <div class="my-outer-container">
                　<img
                  src="/public/images/Bonus/2/CatImage.gif"
                  alt="Image 1"
                  class="my-image"
                />
                　<img
                  src="/public/images/Bonus/4/ApexFrame.png"
                  alt="Image 2"
                  class="my-Frameimage"
                />
              </div> -->

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    bg?: string;
    brd_img?: string;
    Frame_img?: string;
    title: string;
    subtitle: string;
  }>(),
  {
    bg: "/images/bg/breadcrumb_bg01.jpg",
    brd_img: "/images/Bonus/2/CatImage.gif",
    Frame_img:"/images/Bonus/4/ApexFrame.png"
  }
  
);

onMounted(() => {
  
});
</script>


<style lang="scss">
@import "@/assets/css/my-style.css";
.my-outer-container {
  position: relative;
  width: 50px;
  height: 50px;
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
