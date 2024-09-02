import {defineStore} from "pinia";
import APIService from "@/core/services/APIService";

export const useApplicationStore = defineStore('console-applications', () => {


  const createApplication = (data) => {
    APIService.setHeader()
    return APIService.post('console/applications/', data)
  }

  const updateApplication = (item, data) => {
    APIService.setHeader()
    return APIService.put(`console/applications/${item.id}/`, data)
  }

  return {
    createApplication,
    updateApplication
  }
})