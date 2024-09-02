const ID_TOKEN_KEYS = {
  "access": "id_access_token" as string,
  "refresh": "id_refresh_token" as string,
};

/**
 * @description get token form localStorage
 * @param token
 */
export const getToken = (token: string): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEYS[token]);
};

/**
 * @description save token into localStorage
 * @param key
 * @param token
 */
export const saveToken = (key: string, token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEYS[key], token);
};

/**
 * @description remove token form localStorage
 * @param token
 */
export const destroyToken = (token: string): void => {
  window.localStorage.removeItem(ID_TOKEN_KEYS[token]);
};
export const destroyTokens = (): void => {
  for (const key in ID_TOKEN_KEYS) {
    if (ID_TOKEN_KEYS.hasOwnProperty(key))
      window.localStorage.removeItem(ID_TOKEN_KEYS[key]);
  }
  console.log('here');
};


export default {getToken, saveToken, destroyToken, destroyTokens};
