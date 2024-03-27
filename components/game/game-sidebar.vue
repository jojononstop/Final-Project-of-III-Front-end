<template>
    <aside class="blog-sidebar">
        <div class="blog-widget">
            <div class="sidebar__author">
                <div class="sidebar__author-thumb">
                    <img :src="`/images/games/cover/${gameData.developerId}/${gameData.id}/${gameData.cover}`"
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
            <nuxt-link to="#" class="tg-btn-2 -secondary mb-2">
                加入願望清單
            </nuxt-link>
            <nuxt-link to="#" class="tg-btn-2">
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