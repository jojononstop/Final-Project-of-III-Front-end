<template>
    <section class="blog-area">
        <div class="container">
            <div class="row justify-content-center">



                <div class="blog-post-wrapper">
                    <game-list :gameData="injectGames" :tagName="tagName" />
                    <div class="pagination__wrap">
                        <!-- pagination start -->
                        <game-pagination :gamePage="gamePage"></game-pagination>
                        <!-- pagination end -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import axios from "axios";

    const router = useRouter();
    const route = useRoute();

    let games = ref(null);
    let chuckGames = ref([]);
    let injectGames = ref(null);
    let tagName = ref(null);
    let gamePage = ref(null);

    router.beforeEach((to, from) => {
        // chuckGame()
        injectGames.value = chuckGames.value[(to.query.page) - 1]
        // console.log((to.query.page) - 1)
        // if ((to.query.page) - 1 == 0) {
        //     console.log(chuckGames.value[0])
        // } else if ((to.query.page) - 1 == 1) {
        //     console.log(chuckGames.value[1])

        // } else {
        //     console.log(chuckGames.value[2])
        // }
        // console.log(injectGames.value)
    })




    onBeforeMount(async () => {

        if (route.query.search != null) {
            const queryString = route.query.search.split('_');

            if (queryString[0] == "tag") {
                const tags = [Number(queryString[1])];
                const response = await axios.post("https://localhost:7048/api/Games/FilterByTags", tags);
                games.value = response.data;
                countPages(games.value.length, 4)
                const response1 = await axios.get(`https://localhost:7048/api/Games/tag/${tags}`);
                tagName.value = response1.data
            }

        } else {
            const response = await axios.get("https://localhost:7048/api/Games");
            games.value = response.data;
            countPages(games.value.length, 4)
        }
    });

    async function chuckGame() {
        const chunkSize = 4;
        for (let i = 0; i < games.value.length; i += chunkSize) {
            chuckGames.value.push(games.value.slice(i, i + chunkSize));
        }
        // chuckGames.value.reverse();
        injectGames.value = chuckGames.value[(route.query.page) - 1]
    }

    async function countPages(allCounts, pageCounts) {
        if (allCounts % pageCounts == 0) {
            gamePage.value = allCounts / pageCounts;
        } else {
            gamePage.value = parseInt(allCounts / pageCounts) + 1;
        }
        chuckGame()
    }
</script>