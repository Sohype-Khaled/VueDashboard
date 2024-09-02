// src/composables/useItems.ts
import { ref } from 'vue';
import APIService from '@/core/services/APIService';

export function useItems(url: string) {
  const results = ref<any[]>([]);
  const count = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getItems() {
    loading.value = true;
    error.value = null;
    try {
      APIService.setHeader();
      const { data } = await APIService.get(url);
      results.value = data.results;
      count.value = data.count;
    } catch (err) {
      error.value = 'Failed to fetch items.';
    } finally {
      loading.value = false;
    }
  }

  return {
    results,
    count,
    loading,
    error,
    getItems,
  };
}
