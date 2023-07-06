import { create } from 'apisauce';
import Loading from 'components/Loading';
import { API_URL } from 'constants/AppSetting';
const baseUrl = API_URL
const baseInstance = create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  },
});

const urlEncodedInstance = create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Language': 'tr',
  },
});

const multipartInstance = create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept-Language': 'tr',
  },
});

function setAuthorizationHeader(token: string) {
  baseInstance.setHeader('Authorization', `Bearer ${token}`);
  urlEncodedInstance.setHeader('Authorization', `Bearer ${token}`);
  multipartInstance.setHeader('Authorization', `Bearer ${token}`);
}

async function setBaseURL(baseURL: string) {
  baseInstance.setBaseURL(baseURL);
  urlEncodedInstance.setBaseURL(baseURL);
  multipartInstance.setBaseURL(baseURL);
}

async function GET<T>(endpoint: string, params?: any, hideIndicator?: boolean, timeout?: number): Promise<T> {
  return new Promise((resolve, reject) => {
    !hideIndicator && Loading.show(true);
    if (params) {
      let data = new URLSearchParams();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      urlEncodedInstance
        .get(endpoint, data, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          !hideIndicator && Loading.show(false);
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          !hideIndicator && Loading.show(false);
          reject(error.data);
        });
    } else {
      baseInstance
        .get(endpoint, undefined, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          !hideIndicator && Loading.show(false);
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          !hideIndicator && Loading.show(false);
          reject(error.data);
        });
    }
  });
}



async function POST<T>(
  endpoint: string,
  params?: any,
  multipart?: boolean,
  hideIndicator?: boolean,
  timeout?: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    Loading.show(hideIndicator ? false : true);
    if (multipart) {
      multipartInstance
        .post(endpoint, params, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          Loading.show(false);
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          Loading.show(false);
          reject(error.data);
        });
    } else {
      baseInstance
        .post(endpoint, params, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          Loading.show(false);
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          Loading.show(false);
          reject(error.data);
        });
    }
  });
}


async function PUT<T>(endpoint: string, params?: any, hideIndicator?: boolean): Promise<T> {
  return new Promise((resolve, reject) => {
    Loading.show(hideIndicator ? false : true);
    baseInstance
      .put(endpoint, params)
      .then(response => {
        Loading.show(false);
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        Loading.show(false);
        reject(error.data);
      });
  });
}
async function DELETE<T>(endpoint: string, params?: any, hideIndicator?: boolean): Promise<T> {
  return new Promise((resolve, reject) => {
    Loading.show(hideIndicator ? false : true);
    baseInstance
      .delete(endpoint, {}, { data: params })
      .then(response => {
        Loading.show(false);
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        Loading.show(false);
        reject(error.data);
      });
  });
}

const API = {
  setAuthorizationHeader,
  setBaseURL,
  GET,
  PUT,
  POST,
  DELETE,
};

export default API;
