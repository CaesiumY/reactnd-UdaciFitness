import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";

export class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: "",
  };
  render() {
    const { coords, status, direction } = this.state;
    if (status === null) {
      return <ActivityIndicator style={{ marginTop: 30 }}></ActivityIndicator>;
    }

    if (status === "denied") {
      return (
        <View>
          <Text>denied</Text>
        </View>
      );
    }

    if (status === "undetermined") {
      return (
        <View>
          <Text>undetermined</Text>
        </View>
      );
    }

    return (
      <View>
        <Text> Live </Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

export default Live;
