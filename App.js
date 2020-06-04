import React from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import reducers from "./reducer";
import AddEntry from "./components/AddEntry";
import History from "./components/History";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }}></View>
          <Tab.Navigator>
            <Tab.Screen name="AddEntry" component={AddEntry}></Tab.Screen>
            <Tab.Screen name="History" component={History}></Tab.Screen>
          </Tab.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
