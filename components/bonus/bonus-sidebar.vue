<template>
  <aside class="shop-sidebar">
    <!-- 關鍵字查詢 -->
    <div class="shop__widget">
      <h4 class="shop__widget-title">search</h4>
      <div class="shop__widget-inner">
        <div class="shop__search">
          <input type="text" placeholder="Search" v-model="keyword" />
          <button class="p-0 border-0" @click="handleSearch">
            <i class="flaticon-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 類型篩選 -->
    <div class="shop__widget">
      <h4 class="shop__widget-title">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush_collapse_Type"
          aria-expanded="false"
          aria-controls="flush_collapse_Type"
        >
          依類型搜尋
        </button>
      </h4>
      <div class="shop__widget-myinner">
        <div
          id="flush_collapse_Type"
          class="accordion-collapse collapse show"
          aria-labelledby="flush_collapse_Type"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <h4>類別篩選</h4>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Static_Avatar" />
              <label class="form-check-label" for=""> 靜態頭像 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Dynamic_Avatar" />
              <label class="form-check-label" for=""> 動態頭像 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Static_Frame" />
              <label class="form-check-label" for=""> 靜態外框 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Dynamic_Frame" />
              <label class="form-check-label" for=""> 動態外框 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Static_Sticker" />
              <label class="form-check-label" for=""> 靜態貼圖 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Dynamic_Sticker" />
              <label class="form-check-label" for=""> 動態貼圖 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Static_Themes" />
              <label class="form-check-label" for=""> 靜態主題 </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="Dynamic_Themes" />
              <label class="form-check-label" for=""> 動態主題 </label>
            </div>
          </div>
        </div>
      </div>
      <h4 class="shop__widget-title">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapse_price"
          aria-expanded="false"
          aria-controls="flush-collapse_price"
        >
          依價格搜尋
        </button>
      </h4>
      <div class="shop__widget-myinner">
        <div 
          id="flush-collapse_price"
          class="accordion-collapse collapse"
          aria-labelledby="flush-collapse_price"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <h4>價格搜尋內容</h4>
          </div>
      </div>

      </div>
    </div>

    <!-- 驅動測試單元 -->
    <div class="shop__widget">
      <h4 class="shop__widget-title">驅動測試單元</h4>
      <div class="shop__widget-inner">
        <div class="shop__search"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import "@vueform/slider/themes/default.css";
import { defineEmits } from "vue";

const emits = defineEmits(["search"]);
let keyword = "";

function handleSearch() {
  //toLower
  const lowercaseKeyword = keyword.toLowerCase();
  emits("search", lowercaseKeyword);
}
</script>
