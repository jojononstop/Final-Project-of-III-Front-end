<template>
    <aside class="blog-sidebar">
        <div class="blog-widget">
            <div class="sidebar__author">
                <div class="sidebar__author-thumb">
                    <img :src="`/images/games/cover/${gameData.developerId}/${gameData.id}/${gameData.cover}.jpg`"
                        alt="img" />
                </div>
                <div class="sidebar__author-content">
                    <h4 class="name">{{ gameData.name }}</h4>
                    <p>{{ gameData.introduction }}</p>
                </div>
            </div>
        </div>
        <div class="blog-widget">
            <h4 class="fw-title">Tags</h4>
            <div class="tagcloud">
                <nuxt-link v-for="(tag, index) in gameData.tags" :key="index" :to="`/game?search=tag_${tag.id}`">{{
                        tag.name
                    }}</nuxt-link>
            </div>
        </div>

        <div class="blog-widget">
            <div class="priceContainer">
                <p class="price">$ {{ gameData.price }}</p>
            </div>
            <div class="priceContainer">
                <p class="price">
                    <span>$ {{ gameData.discountPrice }}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{{ gameData.discountPercent }}</span>
                </p>
            </div>
        </div>


        <div class="blog-widget">
            <nuxt-link to="#" class="tg-btn-2 -secondary mb-2 d-flex">
                加入願望清單
            </nuxt-link>
            <nuxt-link to="#" class="tg-btn-2 d-flex">
                加入購物車
            </nuxt-link>
        </div>

    </aside>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    gameData: Object,
});

</script>

<style scoped>
.priceContainer {
    height: 10vh;
}

.price {
    background-color: #edf0f9e0;
    align-self: center;
    box-shadow: 7px 7px 20px rgba(198, 206, 237, .7),
        -7px -7px 30px rgba(255, 255, 255, .7),
        inset 0px 0px 4px rgba(255, 255, 255, .9),
        inset 7px 7px 15px rgba(198, 206, 237, .8);
    border-radius: 10px;
    display: inline-flex;
    direction: rtl !important;
    padding: 1px 10px;
    margin-left: auto;
    font-size: 24px;
}
</style>