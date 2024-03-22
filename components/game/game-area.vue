<template>
    <section class="blog-area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="blog-post-wrapper">
                    <game-list :gameData="games" />
                    <div class="pagination__wrap">
                        <!-- pagination start -->
                        <ui-pagination></ui-pagination>
                        <!-- pagination end -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

let games = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get("https://localhost:7048/api/Games");
        games.value = response.data;
    } catch (error) {
        console.log(error);
    }
});
</script>
