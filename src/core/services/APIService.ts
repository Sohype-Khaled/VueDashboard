import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";

/**
 * @description service to call HTTP request via Axios
 */
class APIService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    APIService.vueInstance = app;
    APIService.vueInstance.use(VueAxios, axios);
    APIService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    APIService.vueInstance.axios.defaults.headers.common[
      "Authorization"
      ] = `Bearer ${JwtService.getToken("access")}`;
    APIService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    APIService.vueInstance.axios.defaults.headers.common["Content-type"] = "application/json";
  }


  /**
   * @description send the GET HTTP request
   * @returns Promise<AxiosResponse>
   * @param url
   */
  public static get(url: string): Promise<AxiosResponse> {
    return APIService.vueInstance.axios.get(url);
  }

  /**
   * @description set the POST HTTP request
   * @returns Promise<AxiosResponse>
   * @param url
   * @param params
   */
  public static post(url: string, params: any): Promise<AxiosResponse> {
    return APIService.vueInstance.axios.post(url, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @returns Promise<AxiosResponse>
   * @param url
   * @param params
   */
  public static update(url: string, params: any): Promise<AxiosResponse> {
    return APIService.vueInstance.axios.put(url, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @returns Promise<AxiosResponse>
   * @param url
   * @param params
   */
  public static put(url: string, params: any): Promise<AxiosResponse> {
    return APIService.vueInstance.axios.put(url, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @returns Promise<AxiosResponse>
   * @param url
   */
  public static delete(url: string): Promise<AxiosResponse> {
    return APIService.vueInstance.axios.delete(url);
  }
}


export default APIService;
