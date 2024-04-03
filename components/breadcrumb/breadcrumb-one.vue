<template>
  <section class="breadcrumb-area" :style="`background-image:url(${bg})`">
    <div class="container">
      <div class="breadcrumb__wrapper">
        <div class="row">
          <div class="col-xl-6 col-lg-7">
            <div class="breadcrumb__content">
              <h2 class="title">關於我們</h2>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <h3 class="text-clgreen">全端班第二組</h3>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    <h5>姚欽堂,張淳毓,徐宏勝,陳冠廷,彭湫雯</h5>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div class="col-xl-6 col-lg-5 position-relative d-none d-lg-block">
            <div class="breadcrumb__img">
              <img :src="brd_img" alt="img" />
            </div>
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
    title: string;
    subtitle: string;
  }>(),
  {
    bg: "/images/bg/breadcrumb_bg01.jpg",
    brd_img: "/images/others/breadcrumb_img03.png",
  }
);
</script>
<style scoped>
.text-clgreen {
  color: springgreen;
}
</style>
