<template>
    <div>
        <div v-for="game in gameData" :key="game.id">
            <nuxt-link :to="`/game-details/${game.id}`">
                <div class="row mb-2">
                    <div class="col-3">
                        <img
                            :src="'images/games/cover/' + game.developerId + '/' + game.id + '/' + game.cover + '.jpg'" />
                    </div>
                    <div class="col-7 d-flex align-items-center">
                        <h3 class="">{{ game.name }}</h3>
                    </div>
                    <div v-if="game.discountPrice" class="col-2 d-flex align-items-center container">
                        <p class="text-decoration-line-through text-start">
                            NT $ {{ game.price }}
                        </p>
                        <!-- <span>&nbsp;&nbsp;&nbsp;</span> -->
                        <p class="fw-bold discount-text">特價 NT $ {{ game.discountPrice }}</p>
                    </div>
                    <div v-else class="col-2 d-flex align-items-center normal-container">
                        <p v-if="game.price > 0" class="text-start price-text">
                            NT $ {{ game.price }}
                        </p>
                        <p v-else-if="game.price === 0" class="text-start free-text">
                            免費
                        </p>
                        <p v-else class="text-start future-text">
                            即將發行
                        </p>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    gameData: Object,
});


</script>
<style scoped>
.discount-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(73, 255, 225, 0.7), 0 0 20px rgba(73, 255, 225, 0.7), 0 0 30px rgba(73, 255, 225, 0.7), 0 0 40px rgba(73, 255, 225, 0.7);
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
}
</style>
