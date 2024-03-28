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

        <div v-if="releaseDate < currentDate" class="blog-widget">
            <div class="price"">
                <p class=" price-text normal-container text-decoration-line-through">NT $ {{ gameData.price }}</p>
            </div>
            <div v-if="gameData.discountPrice" class="normal-container">
                <p class="discount-text">
                    <span>NT $ {{ gameData.discountPrice }}</span>
                    <!-- <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{{ gameData.discountPercent }}</span> -->
                </p>
            </div>
        </div>


        <div class="blog-widget">
            <nuxt-link to="#" class="tg-btn-2 -secondary mb-2 d-flex">
                加入願望清單
            </nuxt-link>
            <nuxt-link v-if="releaseDate < currentDate" to="#" class="tg-btn-2 d-flex">
                加入購物車
            </nuxt-link>
        </div>

    </aside>
</template>

<script setup>
import { defineProps } from "vue";

const currentDate = new Date()


const props = defineProps({
    gameData: Object,
});

const releaseDate = new Date(props.gameData.releaseDate);

</script>

<style scoped>
.price {
    background-color: #8bfad9e0;
    box-shadow: 7px 7px 20px rgba(73, 255, 225, 0.7),
        -7px -7px 30px rgba(73, 255, 225, 0.7),
        inset 0px 0px 4px rgba(73, 255, 225, 0.7),
        inset 7px 7px 15px rgba(73, 255, 225, 0.7);
    border-radius: 10px;
    direction: rtl !important;
    margin-left: auto;
    font-size: 24px;
}

.discount-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(73, 255, 225, 0.7), 0 0 10px rgba(73, 255, 225, 0.7), 0 0 10px rgba(73, 255, 225, 0.7), 0 0 10px rgba(73, 255, 225, 0.7);
    font-size: 16px;
}

.price-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(182, 255, 140, 0.7), 0 0 20px rgba(182, 255, 140, 0.7), 0 0 30px rgba(182, 255, 140, 0.7), 0 0 40px rgba(182, 255, 140, 0.7);
    font-size: 20px;
}

.free-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(250, 102, 102, 0.7), 0 0 20px rgba(250, 102, 102, 0.7), 0 0 30px rgba(250, 102, 102, 0.7), 0 0 40px rgba(250, 102, 102, 0.7);
    font-size: 20px;
}

.future-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(236, 88, 255, 0.7), 0 0 20px rgba(236, 88, 255, 0.7), 0 0 30px rgba(236, 88, 255, 0.7), 0 0 40px rgba(236, 88, 255, 0.7);
    font-size: 20px;
}

.container {
    display: flex;
    flex-direction: column;
}

.normal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;


}
</style>