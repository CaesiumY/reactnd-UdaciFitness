import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";

export class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: null,
  };
  render() {
    return (
      <View>
        <Text> Live </Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

export default Live;
