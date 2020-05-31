import React from "react";
import AddEntry from "./components/AddEntry";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducer";

export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <View>
        <AddEntry></AddEntry>
      </View>
    </Provider>
  );
}
