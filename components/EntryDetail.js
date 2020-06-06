import React, { Component } from "react";
import { Text, View } from "react-native";

export class EntryDetail extends Component {
  render() {
    const { entryId } = this.props.route.params;
    return (
      <View>
        <Text> EntryDetails - {entryId} </Text>
      </View>
    );
  }
}

export default EntryDetail;
