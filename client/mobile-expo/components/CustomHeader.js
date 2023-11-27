import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="chevron-back" size={30} color="#4781a5" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  backButton: {
    marginRight: 20,
    alignSelf: "flex-end",
    marginBottom: 17,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4781a5",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
});

export default CustomHeader;
