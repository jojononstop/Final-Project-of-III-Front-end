<template>
<aside class="shop-sidebar">
    <!-- 關鍵字查詢 -->
    <div class="shop__widget">
        <h4 class="shop__widget-title">search</h4>
        <div class="shop__widget-inner">
            <div class="shop__search">
                <input type="text" placeholder="Search here"/>
                <button class="p-0 border-0"><i class="flaticon-search"></i></button>
            </div>
        </div>
    </div>

    <!-- 價格bar -->
    <div class="shop__widget">
        <h4 class="shop__widget-title">filter by price</h4>
        <div class="shop__widget-inner">
            <div class="shop__price-filter">
                <div id="slider-range">
                  <!-- <Slider
                    :value="priceStore"
                    :tooltips="false"
                    @change="handlePriceChange"
                    :max="getMaxPrice"
                  /> -->
                  <Slider
                    v-model="priceStore"
                    :tooltips="false"
                    @change="handlePriceChange"
                  />
                </div>
                <div class="shop__price-slider-amount">
                    <input type="submit" class="p-0 border-0" value="Filter"/>
                    <span class=''>${{priceStore[0]}} - ${{priceStore[1]}}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 側邊導覽列 -->
    <div class="shop__widget">
        <h4 class="shop__widget-title">Related products</h4>
        <div class="shop__widget-inner">
            <div v-for="item in related__products" :key="item.id" class="related__products-item">
                <div class="related__products-thumb">
                    <nuxt-link :to="`/shop-details/${item.id}`">
                        <img :src="item.img" alt="img"/>
                    </nuxt-link>
                </div>
                <div class="related__products-content">
                    <h4 class="product-name">
                        <nuxt-link :to="`/shop-details/${item.id}`">{{item.title}}</nuxt-link>
                    </h4>
                    <span class="amount">${{item.price}}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Type查詢 -->
    <div class="shop__widget">
        <h4 class="shop__widget-title">Categories</h4>
        <div class="shop__widget-inner">
            <ul class="product-categories list-wrap">
                <li><nuxt-link to="/shop">controller</nuxt-link><span class="float-right">12</span></li>
                <li><nuxt-link to="/shop">Headphone</nuxt-link><span class="float-right">03</span></li>
                <li><nuxt-link to="/shop">TOURNAMENTS</nuxt-link><span class="float-right">18</span></li>
                <li><nuxt-link to="/shop">E-SPORTS</nuxt-link><span class="float-right">05</span></li>
            </ul>
        </div>
    </div>

    <!--test -->
    <div class="shop__widget">
      <div>
        <h4 class="shop__widget-title">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            更多篩選1-1
          </button>
        </h4>
        <div class="shop__widget-inner">
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">內容test</div>
        </div>
        </div>
      </div>
      
      <!--
      <div class="shop__widget-inner">
        NUXT內容
      </div>
      -->

      <h4 class="shop__widget-title">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          更多篩選1-2
        </button>
      </h4>

      <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">內容test</div>
      </div>
    </div>

    <div class="accordion accordion" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            標題1
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">內容1</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            標體2
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">內容2</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            標題3
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">內容3</div>
        </div>
      </div>
    </div>

    
</aside>
</template>

<script setup lang="ts">
import product_data from "@/data/product-data";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import { getMaxPrice } from "../../utils/utils";
const priceStore = useProductPrice();
const related__products = [...product_data].slice(0,3);
console.log(priceStore.value)
function handlePriceChange (value: number[]) {
  priceStore.value = value;
}
</script>
