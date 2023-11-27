import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default Button = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#0e365c",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "Lato-Bold",
    color: "white",
    fontSize: 16,
  },
  buttonSize: {
    width: 330,
    height: 40,
  },
});
