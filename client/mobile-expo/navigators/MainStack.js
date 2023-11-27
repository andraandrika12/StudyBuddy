import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPageScreen from "../screen/LandingPageScreen";
import ProjectScreen from "../screen/ProjectScreen";
import FinishScreen from "../screen/FinishScreen";


const Stack = createNativeStackNavigator();

export default function LandingPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Finish"
        component={FinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Project"
        component={ProjectScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}