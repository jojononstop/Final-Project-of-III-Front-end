<template>
    <div>
        <div v-for="game in gameData" :key="game.id">
            <h2>{{ game.name }}</h2>
            <p>{{ game.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    gameData: Array, // 这里假设 gameData 是一个数组，你可以根据实际情况修改类型
});
</script>
