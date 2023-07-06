import { IAddress } from 'models/Address';
import API from './Instance';
export const BASE_URL = "http://localhost:5001/api/";
export const API_SignIn = async (username: string, password: string) => {
  return (API.POST(BASE_URL + "Account/login", { username: username, password: password }));
}
export const API_Register = async (params: { username: string, password: string, email: string }) => {
  return (API.POST(BASE_URL + "Account/register", params));
}

export const API_GetProducts = async () => {
  return (API.GET(BASE_URL + "Products?PageSize=50"));
}
export const API_Basket = async () => {
  return (API.GET(BASE_URL + "Basket"));
}
export const API_AddBasket = async (params: { productId: number, quantity: number }) => {
  return (API.POST(BASE_URL + "Basket?productId=" + params.productId + "&quantity=" + params.quantity));
}

export const API_DeleteBasket = async (params: { productId: number, quantity: number }) => {
  return (API.DELETE(BASE_URL + "Basket?productId=" + params.productId + "&quantity=" + params.quantity));
}
export const API_CurrentUser = async () => {
  return (API.GET(BASE_URL + "Account/currentUser"));
}
export const API_CurrentAdress = async () => {
  return (API.GET<IAddress>(BASE_URL + "Account/saveAddress"));
}
export const API_CreateOrder = async (params: IAddress) => {
  const body = {
    saveAddress: true,
    shippingAddress: params,
  }
  return (API.POST(BASE_URL + "Orders", body));
}

export const API_GetOrders = async () => {
  return (API.GET(BASE_URL + "Orders"));
}
// export const API_SignUp = async (params: ISignUpData) => {
//   return (API.POST<ISignResponse>("SignUp.php", params));
// }

// export const API_DeviceAdd = async (params: { seri_no: string }) => {
//   return (API.POST<IResponse>("AddDeviceUser.php", params));
// }

// export const API_GetDevices = async () => {
//   return (API.GET<IGetDevices>("GetDevicesUser.php", undefined, true, 5000));
// }

// export const API_GetProfileInfo = async () => {
//   return (API.GET<IGetProfileInfo>("GetProfileInfo.php"));
// }

// export const API_UpdateProfilInfo = async (params: { name: string, surname: string }) => {
//   return (API.POST<IResponse>("UpdateProfilInfo.php", params));
// }

// export const API_UpdateProfilePassword = async (params: { old_password: string, password: string }) => {
//   return (API.POST<IResponse>("UpdateProfilePassword.php", params));
// }

// export const API_RemoveUser = async () => {
//   return (API.POST<IResponse>("RemoveUser.php"));
// }

// export const API_UpdateDeviceName = async (params: { seri_no: string, name: string }) => {
//   return (API.POST<IResponse>("UpdateDeviceName.php", params));
// }

// export const API_GetDeviceInfo = (device_seri_no: string) => {
//   return (API.POST<IGetDeviceInfo>("GetDeviceInfo.php", { device_seri_no }, undefined, true));
// }

// export const API_RemoveDeviceUser = async (seri_no: string) => {
//   return (API.POST<IResponse>("RemoveDeviceUser.php", { seri_no }));
// }

// export const API_UpdateDeviceTemp = async (params: { seri_no: string, temp: number }) => {
//   return (API.POST<IResponse>("UpdateDeviceTemp.php", params, undefined, true));
// }

// export const API_UpdateDeviceStatus = async (params: { seri_no: string, status: boolean }) => {
//   return (API.POST<IResponse>("UpdateDeviceStatus.php", params, undefined, true));
// }

// export const API_UpdateDevicePowerLevel = async (params: { seri_no: string, power_level: number }) => {
//   return (API.POST<IResponse>("UpdateDevicePowerLevel.php", params, undefined, true));
// }

// export const API_UpdateDeviceShotDownTimeCancel = async (seri_no: string) => {
//   return (API.POST<IResponse>("UpdateDeviceShotDownTimeCancel.php", { seri_no }, undefined, true));
// }

// export const API_UpdateDeviceShotDownTime = async (params: { date_type: IShotdownType, date: string, hour: string, seri_no: string }) => {
//   return (API.POST<IResponse>("UpdateDeviceShotDownTime.php", params, undefined, true));
// }



// //------------------------------------------------------------------------------------------------------------

// export const API_ActiviteDevice = async (SSID: string, PASSWORD: string) => {
//   return axios.get("http://192.168.4.1/setWiFi?SET_SSID=" + SSID + "&SET_PASSWORD=" + PASSWORD, { timeout: 2000 });
//   // return (API.GET<IGetMacAdressResponse>("http://192.168.4.1/setWiFi?SET_SSID=" + SSID + "&SET_PASSWORD=" + PASSWORD, undefined, undefined, 2000));
// }

// export const API_GetMacAdress = async () => {
//   return axios.get("http://192.168.4.1/getMacAdress", { timeout: 2000 });
//   // return (API.GET<IGetMacAdressResponse>("http://192.168.4.1/getMacAdress", undefined, undefined, 2000));
// }