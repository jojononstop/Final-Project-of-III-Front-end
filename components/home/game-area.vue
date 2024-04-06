<template>
    <section class="trendingNft-area section-pt-120 section-pb-90">
        <div class="container">
            <div class="trendingNft__title-wrap">
                <div class="row">
                    <div class="col-md-7">
                        <div class="trendingNft__title">
                            <h2 class="title">近期熱賣 <img src="/images/icons/fire.png" width="35" alt="icon" />
                            </h2>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="trendingNft__nav">
                            <button class="slider-button-prev"><i class="fas fa-angle-left"></i></button>
                            <button class="slider-button-next"><i class="fas fa-angle-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <Swiper v-bind="slider_setting" :modules="[Navigation]" class="swiper-container trendingNft-active">

                <SwiperSlide v-for="item in  nft_data.filter(n => n.trending) " :key="item.id">
                    <div class="trendingNft__item">
                        <div class="trendingNft__item-top">
                            <h3>遊戲名稱</h3>
                            <div class="trendingNft__item-wish">
                                <nuxt-link to="/"><i class="far fa-heart"></i></nuxt-link>
                            </div>
                        </div>
                        <div class="trendingNft__item-image">
                            <img :src="item.img" alt="img" @mouseover="showInfo(item.id)" @mouseleave="hideInfo()" />
                            <div v-if="activeIndex === item.id" class="info text-white">
                                點擊查看詳細資訊
                            </div>
                        </div>
                        <div class="trendingNft__item-bottom">
                            <div class="trendingNft__item-price">
                                <span class="bid">原價</span>
                                <h6 class="eth"><span>$</span>
                                    <i></i>{{ item.eth }}
                                </h6>
                            </div>
                            <nuxt-link to="/" class="bid-btn">直接購買 <i
                                    class="fas fa-long-arrow-alt-right"></i></nuxt-link>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import axios from "axios";

let gameinfo = ref([]);

gameinfo = axios.get("").then((res) => {
    gameinfo.value = res.data;
});


const activeIndex = ref(null);

const showInfo = (index) => {
    activeIndex.value = index;
    zoomIn(event);
};

const hideInfo = () => {
    activeIndex.value = null;
    zoomOut(event);
};

const zoomIn = (event) => {
    event.target.style.transform = 'scale(1.1)'; // 放大 1.1 倍
};

const zoomOut = (event) => {
    event.target.style.transform = 'scale(1)'; // 恢復原始大小
};


// slider setting 
const slider_setting = {
    observer: true,
    observeParents: true,
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        '1500': {
            slidesPerView: 3,
        },
        '1200': {
            slidesPerView: 3,
        },
        '992': {
            slidesPerView: 2,
        },
        '768': {
            slidesPerView: 2,
        },
        '576': {
            slidesPerView: 1,
        },
        '0': {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
    }
}


const nft_data = [
    {
        id: 1,
        img: '/images/nft/nft_img01.jpg',
        title: 'wolf gaming art',
        creator: '/images/nft/nft_avatar.png',
        creator_name: 'Alax Max',
        eth: 1.002
    },
    {
        id: 2,
        img: '/images/nft/nft_img02.jpg',
        title: 'FOREST PRINCESS',
        creator: '/images/nft/nft_avatar.png',
        creator_name: 'Alax Max',
        eth: 1.053
    },
    {
        id: 3,
        img: '/images/nft/nft_img03.jpg',
        title: 'GIRL FIREFLY ART',
        creator: '/images/nft/nft_avatar.png',
        creator_name: 'Alax Max',
        eth: 1.024
    },
    // trending
    {
        id: 4,
        img: '/images/nft/nft_img04.jpg',
        title: 'Crypto Max',
        creator: '/images/nft/nft_avatar01.png',
        creator_name: 'Jon Max',
        eth: 1.002,
        trending: true,
    },
    {
        id: 5,
        img: '/images/nft/nft_img05.jpg',
        title: 'Golden Crypto',
        creator: '/images/nft/nft_avatar02.png',
        creator_name: 'Jon Max',
        eth: 1.004,
        trending: true,
    },
    {
        id: 6,
        img: '/images/nft/nft_img06.jpg',
        title: 'Black Crypto',
        creator: '/images/nft/nft_avatar03.png',
        creator_name: 'Jon Max',
        eth: 1.005,
        trending: true,
    },
    {
        id: 7,
        img: '/images/nft/nft_img07.jpg',
        title: 'Luck Crypto',
        creator: '/images/nft/nft_avatar01.png',
        creator_name: 'Jon Max',
        eth: 1.006,
        trending: true,
    },
]
</script>

<style scoped>
/* 可以添加一些過渡效果，使放大和縮小更加平滑 */
img {
    transition: transform 0.3s ease;
}

.trendingNft__item-image {
    position: relative;
    /* 將父元素設置為相對定位 */
}

.info {
    position: absolute;
    bottom: 100%;
    /* 設置在圖片上方 */
    left: 50%;
    /* 水平置中 */
    transform: translateX(-50%);
    background-color: springgreen;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: opacity 0.3s;
    opacity: 0;
    z-index: 9999;
    /* 設置 z-index 為最大值以確保在最上層 */
    white-space: nowrap;
    /* 避免文本换行 */
    max-width: 200px;
    /* 最大宽度，根据需要调整 */
    overflow: hidden;
    /* 超出部分隐藏 */
}

.trendingNft__item-image:hover .info {
    opacity: 1;
    /* 滑鼠移入時顯示 */
}
</style>