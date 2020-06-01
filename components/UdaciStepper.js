import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { white, purple, gray } from "../utils/colors";

export default function UdaciStepper({
  max,
  unit,
  value,
  onIncrement,
  onDecrement,
}) {
  return (
    <View style={[style.row, { justifyContent: "space-between" }]}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              style.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
          >
            <Entypo name="minus" size={30} color={purple} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[
              style.iosBtn,
              { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
            ]}
          >
            <Entypo name="plus" size={30} color={purple} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onDecrement} style={[style.androidBtn]}>
            <FontAwesome name="minus" size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement} style={[style.androidBtn]}>
            <FontAwesome name="plus" size={30} color={white} />
          </TouchableOpacity>
        </View>
      )}
      <View style={style.metricCounter}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>{value}</Text>
        <Text style={{ color: gray, fontSize: 18 }}>{unit}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    backgroundColor: purple,
    margin: 5,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
  },
});
