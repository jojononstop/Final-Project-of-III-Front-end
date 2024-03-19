<template>
    <!-- <button @click="show(gameData)"></button> -->
    <section class="blog-area blog-details-area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="blog-post-wrapper">
                    <div class="blog-post-item">
                        <div class="blog-post-thumb">
                            <game-gallery :gameData="gameData"></game-gallery>
                        </div>
                        <div class="blog-post-content blog-details-content">
                            <div class="blog-post-meta">
                                <ul class="list-wrap">
                                    <li>By<nuxt-link to="#">{{ gameData.developerId }}</nuxt-link></li>
                                    <li><i class="far fa-calendar-alt"></i> {{ gameData.releaseDate }}</li>
                                    <li>{{ gameData.rating }}</li>
                                </ul>
                            </div>
                            <h1 class="title text-capitalize">{{ gameData.name }}</h1>
                            <h2>Description</h2>
                            <p>{{ gameData.description }}</p>
                        </div>
                    </div>
                    <div class="comments-wrap">
                        <h4 class="comments-wrap-title">3 Comments</h4>
                        <!-- blog comments start -->
                        <!-- <blog-details-comments /> -->
                        <!-- blog comments end -->
                    </div>
                    <div class="comment-respond">
                        <h3 class="comment-reply-title">Leave a Reply</h3>
                        <!-- form start -->
                        <!-- <form-blog-details-reply /> -->
                        <!-- form end -->
                    </div>
                </div>
                <div class="blog-post-sidebar">
                    <!-- blog sidebar start -->
                    <game-sidebar />
                    <!-- blog sidebar end -->
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    gameData: Object, // 这里假设 gameData 是一个数组，你可以根据实际情况修改类型
});
// function show(gameData) { console.log(gameData.displayImages) };
</script>
