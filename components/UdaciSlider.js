import React from "react";
import { View, Text, Slider, StyleSheet } from "react-native";
import { gray } from "../utils/colors";

export default function UdaciSlider({ value, max, onChange, unit, step }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        value={value}
        maximumValue={max}
        minimumValue={0}
        step={step}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>{value}</Text>
        <Text style={{ color: gray, fontSize: 18 }}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  metricCounter: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
  },
});
