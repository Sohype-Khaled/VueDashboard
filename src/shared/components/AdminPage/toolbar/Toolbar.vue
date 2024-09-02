<script setup lang="ts">
import {toolbarWidthFluid} from "@/core/layouts/default-layout/config/helper";
import KTPageTitle from "@/shared/components/AdminPage/toolbar/PageTitle.vue";
</script>

<template>
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <div
        id="kt_app_toolbar_container"
        class="app-container d-flex flex-stack"
        :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle/>
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <slot/>
      </div>
    </div>
  </div>
</template>
