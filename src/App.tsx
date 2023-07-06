import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { default as theme } from "../custom-theme.json";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Loading from 'components/Loading';
import Navigation from 'navigation/navigation';
import { Provider } from 'mobx-react';
import Store from 'Store/Store';
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <Provider Store={Store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
          <Navigation />
          <Loading />
          <Toast />
        </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  );
};
export default App;

