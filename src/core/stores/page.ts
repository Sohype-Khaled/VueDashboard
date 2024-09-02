import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const usePageStore = defineStore('page', () => {
  const data = ref<Record<string, any>>({
    title: "",
    breadcrumbs: []
  });
  const setTitle = (value) => {
    data.value = {...data.value, title: value}
  }
  const setData = (pageData) => data.value = pageData

  const getData = (key) => data.value[key]

  return {
    data,
    setTitle,
    setData,
    getData
  }
})