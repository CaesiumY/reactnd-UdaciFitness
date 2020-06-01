import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { purple } from "../utils/colors";

function TextButton({ onPress, children, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: purple,
    fontSize: 18,
  },
});

export default TextButton;
