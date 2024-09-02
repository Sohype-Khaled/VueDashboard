<script setup lang="ts">
import AdminPage from "@/shared/components/AdminPage/AdminPage.vue";
import {usePageStore} from "@/core/stores/page";
import DynamicListing from "@/shared/components/DynamicListing/DynamicListing.vue";
import ApplicationFormModal from "@/modules/applications/component/ApplicationFormModal.vue";
import {ref} from "vue";
import ApplicationCard from "@/modules/applications/component/ApplicationCard/AppCard.vue";

const pageStore = usePageStore()

pageStore.setData({
  title: "Applications",
  breadcrumbs: [
    {label: "Home", to: {path: "/"}},
    {label: "Applications"}
  ]
})
const editableSubject = ref()

const formModalVisible = ref(false)

const toggleEdit = (item) => {
  editableSubject.value = item
  formModalVisible.value = true
}

</script>

<template>
  <AdminPage>
    <ApplicationFormModal v-model="formModalVisible" :item="editableSubject"/>

    <DynamicListing url="console/applications/" listing-type="grid">
      <template #item="{ item }">
        <ApplicationCard :item="item" @edit-modal-toggled="toggleEdit(item)"/>
      </template>
      <template #add-new>
        <div class="fs-6 mb-6">Start creating new applications!</div>
        <button class="btn btn-primary"
                @click="formModalVisible = !formModalVisible">
          Create New Application
        </button>
      </template>
    </DynamicListing>
  </AdminPage>
</template>

