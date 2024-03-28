<template>
    <section class="blog-area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="blog-post-wrapper">
                    <game-list :gameData="games" />
                    <div class="pagination__wrap">
                        <!-- pagination start -->
                        <!-- <ui-pagination></ui-pagination> -->
                        <!-- pagination end -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from "axios";

const route = useRoute();

let games = ref(null);


onBeforeMount(async () => {

    if (route.query.search != null) {
        const queryString = route.query.search.split('_');

        if (queryString[0] == "tag") {
            const tags = [Number(queryString[1])];
            const response = await axios.post("https://localhost:7048/api/Games/FilterByTags", tags);
            games.value = response.data;
            console.log(tags)
            console.log(games.value)
        }

    } else {
        const response = await axios.get("https://localhost:7048/api/Games");
        games.value = response.data;
    }

});
</script>
