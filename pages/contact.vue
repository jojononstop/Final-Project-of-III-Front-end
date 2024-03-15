<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-three title="Contact us" subtitle="Contact"></breadcrumb-three>
    <!-- breadcrumb area end -->

    <!-- contact area start -->
    <contact-area></contact-area>
    <!-- contact area end -->

    <!-- contact-map -->
    <div class="contact-map">
      <iframe
        src="https://geo-devrel-javascript-samples.web.app/samples/style-array/app/dist/"
        loading="lazy"
      ></iframe>
    </div>
    <!-- contact-map-end -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "Contact - MYKD" });
</script>
