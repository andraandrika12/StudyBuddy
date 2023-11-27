import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

export default function ButtonGrid({ items }) {
  return (
    <View style={styles.buttonGrid}>
      {items.map((item, idx) => (
        <View style={styles.buttonContainer} key={idx}>
          <TouchableOpacity onPress={() => item.onPress(item.label)}>
            <Image
              style={{ width: item.size, height: item.size }}
              source={item.icon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  buttonContainer: {
    width: "30%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 12,
    color: "#0e365c",
    marginTop: 5,
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
  },
});
