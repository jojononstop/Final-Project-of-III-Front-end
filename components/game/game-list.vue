<template>
    <div>
        <div v-for="game in gameData" :key="game.id">
            <nuxt-link :to="`/game-detail/${game.id}`">
                <div class="row mb-2">
                    <div class="col-3">
                        <img
                            :src="
                                'images/games/cover/' +
                                game.developerId +
                                '/' +
                                game.id +
                                '/' +
                                game.cover
                            "
                            width="200"
                            class=""
                        />
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
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    gameData: Array, // 这里假设 gameData 是一个数组，你可以根据实际情况修改类型
});
</script>
