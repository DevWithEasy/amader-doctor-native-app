import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigations/AppNavigator";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
            <AppNavigator/>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
