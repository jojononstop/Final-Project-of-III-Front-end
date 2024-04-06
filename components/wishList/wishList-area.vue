<template>
    <section class="blog-area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="blog-post-wrapper">
                    <wishList-list :gameData="games"/>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import axios from "axios";
    import { VueCookieNext as $cookie } from 'vue-cookie-next'
    axios.get()
</script>