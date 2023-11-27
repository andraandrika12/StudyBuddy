import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function FinishScreen({ route }) {
  const projectData = route.params.project;
  const image = require("../assets/dummy/hero-dummy.jpg");

  return (
    <>
      <CustomHeader title="Project Finish" />

      <ScrollView style={styles.contentContainerStyle}>
        <Image source={image} style={styles.projectImage} />

        <Text style={styles.label}>Project Name</Text>
        <View style={styles.container}>
          <Text>{projectData?.name}</Text>
        </View>

        <Text style={styles.label}>Project Description</Text>
        <View style={styles.containerBig}>
          <Text>{projectData?.description}</Text>
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.container}>
          <Text>{projectData?.Category.name}</Text>
        </View>

        <Text style={styles.label}>Goals</Text>
        <View style={styles.containerBig}>
          <Text>{projectData?.goals}</Text>
        </View>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => console.log("Liked!")}
        >
          <Text style={styles.buttonText}>Like this Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const commonContainerStyles = {
  width: "100%",
  borderColor: "#e0e0e0",
  borderWidth: 1,
  borderRadius: 8,
  marginTop: 5,
  marginBottom: 15,
  padding: 8,
  backgroundColor: "#FFFFFF",
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 13,
    backgroundColor: "#FFFFFF",
  },
  projectImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Lato-Bold",
    color: "#333",
  },
  container: {
    ...commonContainerStyles,
    paddingVertical: 10,
  },
  containerBig: {
    ...commonContainerStyles,
    paddingVertical: 10,
  },
  customButton: {
    backgroundColor: "#6B9EBF",
    marginTop: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
});
