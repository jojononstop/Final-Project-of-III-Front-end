<template>
<aside class="shop-sidebar">
    <!-- 關鍵字查詢 -->
    <div class="shop__widget">
        <h4 class="shop__widget-title">search</h4>
        <div class="shop__widget-inner">
        <form>
        
        </form>
            <div class="shop__search">
                <input type="text" placeholder="Search" v-model="keyword"/>
                <button class="p-0 border-0" @click="handleSearch"><i class="flaticon-search"></i></button>
            </div>
        </div>
    </div>
</aside>
</template>

<script setup>
import "@vueform/slider/themes/default.css";
import { defineEmits } from 'vue';

const emits = defineEmits(['search']);
let keyword = '';

function handleSearch() {
    //toLower
    const lowercaseKeyword = keyword.toLowerCase();
    emits('search',lowercaseKeyword);
}
</script>
