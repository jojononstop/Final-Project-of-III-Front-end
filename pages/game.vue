<template>
    <div>
        <!-- breadcrumb area start -->
        <breadcrumb-three title="GAME" subtitle="GAME LIST"></breadcrumb-three>
        <!-- breadcrumb area end -->

        <!-- blog area start -->
        <game-area></game-area>
        <!-- blog area end -->
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
useSeoMeta({ title: "Game - MYKD" });

const route = useRoute();
const router = useRouter();
if(route.query.page == undefined){
    router.push({ query: { ...route.query, page: 1 }});
}
  


</script>
