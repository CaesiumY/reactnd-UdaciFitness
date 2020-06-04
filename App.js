import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import reducers from "./reducer";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { purple, gray } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      ></StatusBar>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          ></UdaciStatusBar>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case "AddEntry":
                    iconName = "plus";
                    break;
                  case "History":
                    iconName = "history";
                    break;
                  default:
                    iconName = "home";
                    break;
                }
                return (
                  <FontAwesome name={iconName} size={size} color={color} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: purple,
              inactiveTintColor: gray,
            }}
          >
            <Tab.Screen name="AddEntry" component={AddEntry}></Tab.Screen>
            <Tab.Screen name="History" component={History}></Tab.Screen>
          </Tab.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
