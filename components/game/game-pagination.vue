<template>
  <ul class="list-wrap d-flex flex-wrap justify-content-center">
    <li>
      <nuxt-link to="game?page=1" class="page-numbers" @mouseover="addCurrentClass($event.target)"
        @mouseout="removeCurrentClass($event.target)"> 01 </nuxt-link>
      <!-- @mouseover="addCurrentClass(this)"
        @mouseout="removeCurrentClass(this)" -->
      <!-- <span class="page-numbers current">01</span> -->
    </li>
    <li>
      <!-- <span class="page-numbers current">02</span> -->
      <nuxt-link to="game?page=2" class="page-numbers" @mouseover="addCurrentClass($event.target)"
        @mouseout="removeCurrentClass($event.target)"> 02 </nuxt-link>
    </li>
    <li>
      <nuxt-link to="game?page=3" class="page-numbers" @mouseover="addCurrentClass($event.target)"
        @mouseout="removeCurrentClass($event.target)"> 03 </nuxt-link>
    </li>
    <li>
      <nuxt-link to="game?page=4" class="page-numbers" @mouseover="addCurrentClass($event.target)"
        @mouseout="removeCurrentClass($event.target)"> 04 </nuxt-link>
    </li>

    <li>
      <nuxt-link to="#" class="next page-numbers">
        <i class="fas fa-angle-double-right"></i>
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


router.beforeEach((to, from) => {
  (to.query.page)
})

function addCurrentClass(element) {

  element.classList.add('current');
}

function removeCurrentClass(element) {
  element.classList.remove('current');
}
</script>
