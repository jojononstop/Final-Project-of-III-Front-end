<template>
    <div>
        <div v-for="game in gameData" :key="game.id">
            <nuxt-link :to="`/game-details/${game.id}`">
                <div class="row mb-2">
                    <div class="col-3">
                        <img :src="'images/games/cover/' +
            game.developerId +
            '/' +
            game.id +
            '/' +
            game.cover
            " />
                    </div>
                    <div class="col-7 d-flex align-items-center">
                        <h3 class="">{{ game.name }}</h3>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                        <p class="text-decoration-line-through text-start">
                            $ {{ game.price }}
                        </p>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <p class="fw-bold">$ {{ game.discountPrice }}</p>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
    <button class="btn btn-second">test</button>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    gameData: Object,
});

(async () => {
    try {
        console.log(route.query);
    } catch (error) {
        console.log(error);
    }
});
</script>
