<script setup lang="ts">
import {
  pageTitleBreadcrumbDisplay,
  pageTitleDirection,
  pageTitleDisplay
} from "@/core/layouts/default-layout/config/helper";

import {usePageStore} from "@/core/stores/page";
import {computed} from "vue";


const pageStore = usePageStore()

const pageTitle = computed(() => pageStore.getData('title'))
const breadcrumbs = computed(() => pageStore.getData('breadcrumbs'))
</script>

<template>
  <div
      v-if="pageTitleDisplay"
      :class="`page-title d-flex flex-${pageTitleDirection} justify-content-center flex-wrap me-3`"
  >
    <template v-if="pageTitle">
      <h1
          class="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0"
      >
        {{ pageTitle }}
      </h1>

      <span
          v-if="pageTitleDirection === 'row' && pageTitleBreadcrumbDisplay"
          class="h-20px border-gray-200 border-start mx-3"
      ></span>

      <ul
          v-if="breadcrumbs && pageTitleBreadcrumbDisplay"
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
      >
        <li class="breadcrumb-item text-muted">

        </li>
        <template v-for="(item, i) in breadcrumbs" :key="i">
          <template v-if="item.to">
            <router-link
                :to="item.to"
                v-text="item.label"
                class="text-muted text-hover-primary"/>
          </template>
          <template v-else>
            <li class="breadcrumb-item">
              <span class="bullet bg-gray-500 w-5px h-2px"></span>
            </li>
            <li class="breadcrumb-item text-gray-700">{{ item.label }}</li>
          </template>

        </template>
      </ul>
    </template>
  </div>
  <div v-else class="align-items-stretch"></div>
</template>
