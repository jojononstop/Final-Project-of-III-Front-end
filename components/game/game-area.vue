<template>
    <section class="blog-area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="blog-post-wrapper">
                    <game-list :gameData="games" :tagName="tagName" />
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
let tagName = ref(null)


onBeforeMount(async () => {

    if (route.query.search != null) {
        const queryString = route.query.search.split('_');

        if (queryString[0] == "tag") {
            const tags = [Number(queryString[1])];
            const response = await axios.post("https://localhost:7048/api/Games/FilterByTags", tags);
            games.value = response.data;
            const response1 = await axios.get(`https://localhost:7048/api/Games/tag/${tags}`);
            tagName.value = response1.data
        }

    } else {
        const response = await axios.get("https://localhost:7048/api/Games");
        games.value = response.data;
    }

});
</script>
