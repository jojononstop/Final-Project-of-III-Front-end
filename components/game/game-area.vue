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
import { useRoute } from 'vue-router';
import axios from "axios";
import { array } from "yup";

const route = useRoute();

let games = ref(null);

onMounted(async () => {

    if (route.query.search != null) {
        const queryString = route.query.search.split('_');

        if (queryString[0] == "tag") {
            const tags = Array.from(String(queryString[1]), Number);
            const response = await axios.post("https://localhost:7048/api/Games/FilterByTags", tags);
            games.value = response.data;
            console.log(games.value)
        } else {


        }


    } else {
        const response = await axios.get("https://localhost:7048/api/Games");
        games.value = response.data;
    }



});
</script>
