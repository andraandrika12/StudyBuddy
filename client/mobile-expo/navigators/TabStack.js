import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LandingPageStack from "./MainStack";
import AccountStack from "./AccountStack";
import DashboardStack from "./DashboardStack";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

export default function TabStacks() {
  const { access_token } = useSelector((state) => state.auth); // Assuming "auth" is the slice that holds access_token
  const navigation = useNavigation();

  const navigateToDashboardOrAccount = () => {
    if (!access_token) {
      navigation.navigate("Account"); // Redirect to the "Account" page to log in
    } else {
      navigation.navigate("Dashboard");
    }
  };

  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#4781a5'
      inactiveColor='#bddded'
      barStyle={{
        backgroundColor: "white",
        borderTopColor: "#ccc",
      }}>
      <Tab.Screen
        name='Home'
        component={LandingPageStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Dashboard'
        component={DashboardStack}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent the default behavior of changing the tab
            navigateToDashboardOrAccount(); // Check access_token and navigate accordingly
          },
        }}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
