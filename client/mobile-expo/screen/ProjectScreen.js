import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import CustomHeader from "../components/CustomHeader";
import VerticalSlider from "../components/VerticalSlider";
import { useSelector } from "react-redux";

export default function ProjectScreen({ route }) {
  const { category } = route.params;
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const projectReducer = useSelector(function (state) {
    return state.projectReducer.projects;
  });

  const filterDataByCategory = (category) => {
    const filteredData = projectReducer.filter(
      (item) => item.Category.groupBy === category
    );
    return filteredData;
  };

  const filteredProjects = filterDataByCategory(category);

  const filteredNames = projectReducer
    .filter((project) =>
      project.name.toLowerCase().includes(name.toLowerCase())
    )
    .map((project) => project.name);

  const filteredLocations = projectReducer
    .filter((project) =>
      project.location?.toLowerCase().includes(location.toLowerCase())
    )
    .map((project) => project.location);

  const handleSumbit = () => {

  };
  return (
    <>
      <CustomHeader title='Project' />
      <ScrollView style={styles.contentContainerStyle}>
        <Text style={styles.label}>Search by Result</Text>

        <View style={styles.filterLocationContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder='Name'
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            style={styles.locationInput}
            placeholder='Location'
            value={location}
            onChangeText={(text) => {
              setLocation(text);
            }}
          />
        </View>
        <VerticalSlider name={name} location={location} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 13,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Lato-Bold",
    color: "#333",
  },
  filterLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 9999,
    elevation: 5,
  },
  filterInput: {
    width: "48%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
  },
  locationInput: {
    width: "48%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "white",
  },
});
