<script setup lang="ts">
import KTIcon from "@/shared/components/UI/kt-icon/KTIcon.vue";
import AppInfoLabel from "@/modules/applications/component/ApplicationCard/AppInfoLabel.vue";
import AppServiceLabel from "@/modules/applications/component/ApplicationCard/AppServiceLabel.vue";
import UiButton from "@/shared/components/UI/UiButton.vue";
import {nextTick, onMounted} from "vue";
import {MenuComponent} from "@/assets/ts/components";

const props = defineProps(['item'])
const emit = defineEmits(['editModalToggled'])
onMounted(() => {
  nextTick(() => {
    MenuComponent.createInstances('[data-kt-menu="true"]');
  });
});

</script>

<template>
  <div class="card card-flush rounded-2 cursor-pointer">


    <div class="card-body">
      <div class="d-flex align-items-start justify-content-between">
        <div class="d-flex align-items-center">
          <KTIcon icon-name="abstract-42" icon-class="fs-1 text-white me-3"/>
          <h3 class=" mb-0 text-white fs-1" v-text="item.name"/>
        </div>
        <div>
          <UiButton icon circle size="sm"
                    text severity="light"
                    data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end">
            <KTIcon icon-name="dots-horizontal" icon-class="fs-2qx"/>
          </UiButton>
          <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
              data-kt-menu="true"
          >
            <div class="menu-item px-3">
              <a href="javascript:void(0)"
                 class="menu-link px-5"
                 @click.prevent="emit('editModalToggled', item)">
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>


      <div class="d-flex gap-3">
        <AppInfoLabel label="Owner"/>
        <AppInfoLabel label="3 Members"/>
      </div>
    </div>
    <div class="card-footer">
      <AppServiceLabel
          icon-name="abstract-24"
          :count="2"
          label="testing and production environments"/>
      <AppServiceLabel
          icon-name="abstract-45"
          :count="1"
          label="chat service enabled"/>
    </div>
  </div>
</template>


<style scoped lang="scss">
.card {
  &-body {
    display: flex;
    flex-flow: column;
    gap: 0.4rem;
    padding: 2rem 1.68rem;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background: linear-gradient(180deg, var(--bs-gray-700) 15%, var(--bs-gray-900) 100%);
  }

  &-footer {
    display: flex;
    padding: 1.3rem 1.68rem 1rem;
    gap: 1rem;
  }
}
</style>