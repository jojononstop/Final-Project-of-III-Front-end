<template>
  <section class="slider__area slider__bg" style="background-image: url(/images/slider/slider_bg.jpg);height:750px" data-background="/images/slider/slider_bg.jpg" >
    <div style="display: flex;justify-content: center;align-items: center;height: 50vh; ">
        <div style="display: grip; justify-content: center;align-items: center;height: 30vh;width:50vh;background-color:white ">
            <div style="margin-left:12vh;margin-top:3vh;">
                <p style="display: inline-block; ">帳號: </p>
                <input  style="display: inline-block; margin-left: 10px;">
            </div>
            <div style="margin-left:12vh;margin-top:2vh;">
                <p style="display: inline-block; ">密碼: </p>
                <input type="password"  style="display: inline-block; margin-left: 10px;">
            </div>
            <button class="" id="" style="display: flex; justify-content: center; align-items: center; margin-left: 20vh; margin-top: 2vh; width: 10vh; text-align: center;">登入</button>

        </div>
    </div>
  </section>
</template>
  
  <script setup lang="ts">
useSeoMeta({ title: "Login" });
  </script>