import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

import reducers from "./reducer";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import EntryDetail from "./components/EntryDetail";
import { purple, gray, white } from "./utils/colors";

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

const HistoryStack = createStackNavigator();

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator initialRouteName="History" headerMode="screen">
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <HistoryStack.Screen
        name="Details"
        component={EntryDetail}
        options={({ route }) => ({
          title: route.params.entryId.split("-").join("/"),
          // headerShown: Platform.OS === "ios" ? true : false,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        })}
      />
    </HistoryStack.Navigator>
  );
}

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
              style: {
                height: 56,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
              },
            }}
          >
            <Tab.Screen
              name="History"
              component={HistoryStackScreen}
            ></Tab.Screen>
            <Tab.Screen name="AddEntry" component={AddEntry}></Tab.Screen>
          </Tab.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
