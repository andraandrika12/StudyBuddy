import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import AccountScreen from "../screen/AccountScreen";
import PDFScreen from "../screen/PDFScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const { access_token } = useSelector((state) => state.auth); // Assuming "auth" is the slice that holds access_token

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {access_token ? (
        <>
          <Stack.Screen
            name="Profile"
            component={AccountScreen}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}