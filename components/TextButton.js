import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function TextButton({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;
