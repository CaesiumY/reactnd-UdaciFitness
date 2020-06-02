import React from "react";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducer";

export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
        {/* <AddEntry></AddEntry> */}
        <View style={{ height: 20 }}></View>
        <History></History>
      </View>
    </Provider>
  );
}
