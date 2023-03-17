import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/AppNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
        <AppNavigator/>
    </NativeBaseProvider>
  );
}
