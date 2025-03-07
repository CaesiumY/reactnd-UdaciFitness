import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import reducers from "./reducer";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import EntryDetail from "./components/EntryDetail";
import { purple, gray, white } from "./utils/colors";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helpers";

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
          headerTitleAlign: "center",
        })}
      />
    </HistoryStack.Navigator>
  );
}

export class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
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
                  switch (route.name) {
                    case "AddEntry":
                      return (
                        <Ionicons
                          name="ios-bookmarks"
                          size={size}
                          color={color}
                        />
                      );
                    case "History":
                      return (
                        <FontAwesome name="history" size={size} color={color} />
                      );
                    case "Live":
                      return (
                        <Ionicons
                          name="ios-speedometer"
                          size={size}
                          color={color}
                        />
                      );
                    default:
                      return (
                        <FontAwesome name="history" size={size} color={color} />
                      );
                  }
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
              <Tab.Screen name="Live" component={Live}></Tab.Screen>
            </Tab.Navigator>
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
