import { observable, action, makeObservable } from "mobx";
import { persist } from "mobx-persist";
class Store {
  constructor() {
    makeObservable(this);
  }
  @persist @observable user: boolean = false;
  @persist @observable token: string = "";
  @action.bound SignIn(token: string) {
    this.user = true;
    this.token = token;
  }
  @action.bound Logout() {
    this.user = false;
    this.token = "";

  }




  // @action.bound AddedDevice(device: IStoreSaveDevice) {
  //   this.isDevice = true;
  //   this.deviceSeriNo = device.deviceSeriNo;
  //   this.devicePassword = device.devicePassword;
  // }
  // @action.bound RemovedDevice() {
  //   this.isDevice = false;
  //   this.deviceSeriNo = "";
  //   this.devicePassword = "";
  // }
}

export default new Store();
