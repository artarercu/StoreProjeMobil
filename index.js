/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'mobx-persist';
import Store from "./src/Store/Store"
// Create a store hydration function.
async function hydrateStores() {
    const hydrate = create({ storage: AsyncStorage, jsonify: true });
    await hydrate('Store', Store);
}
hydrateStores().then(res => { }).catch(err => { });
AppRegistry.registerComponent(appName, () => App);

