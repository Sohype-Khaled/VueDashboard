<script setup lang="ts">
import { onMounted, ref } from "vue";
import WaveSurfer from "wavesurfer.js";
import UiButton from "@/shared/components/UI/UiButton.vue";
import KTIcon from "@/shared/components/UI/kt-icon/KTIcon.vue";

const props = defineProps(["src"]);
const waveContainer = ref(null);
const wavesurfer = ref(null)

onMounted(()=>{
  if (waveContainer.value) {
    wavesurfer.value =  WaveSurfer.create({
      container: waveContainer.value,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: 'https://app.otlohasah.org/media/records/82875c35-8178-4797-bc77-03757d089764/FilesGeneratedRecoed1724421912688.wav',
    })
  }
});
</script>

<template>
<div class="w-100 d-flex">
  <UiButton >
    <KTIcon icon-name=""/>
  </UiButton>
  <div ref="waveContainer" class="w-100"></div>
</div>
</template>

<style scoped lang="scss">

</style>