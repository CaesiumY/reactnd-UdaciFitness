import React from "react";
import { View, Text, Slider } from "react-native";

export default function UdaciSlider({ value, max, onChange, unit, step }) {
  return (
    <View>
      <Slider
        value={value}
        maximumValue={max}
        minimumValue={0}
        step={step}
        onValueChange={onChange}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
}
