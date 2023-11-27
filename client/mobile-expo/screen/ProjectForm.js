import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "../components/modal/ErrorModal";
import {
  Logout,
  addProject,
  logoutUser,
  searchBuddy,
} from "../store/actions/actionCreators";

export default function ProjectForm() {
  const DataCategory = useSelector((state) => state.category.categories);
  const locations = useSelector((state) => state.location.locations);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [category, setCategory] = useState("");
  const [buddy, setBuddy] = useState("");
  const [goals, setGoals] = useState("");
  const [todos, setTodos] = useState("");
  const [location, setLocation] = useState("");
  const [displaySlider, setDisplaySlider] = useState(false);
  const [dataBuddy, setDataBuddy] = useState([]);

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // TODO:
    console.log(projectName, buddy, projectDescription, categoryId, goals);
    setIsLoading(true);

    dispatch(
      addProject(projectName, buddy, projectDescription, categoryId, goals)
    )
      .then((result) => {
        console.log("loading");
        if (result.success) {
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Dashboard");
          }, 15000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowModal(true);
        setModalMessage(
          "There was an error creating your project. Please try again."
        );
      });
    // navigation.push("Dashboard");
  };

  const handleSearchBuddy = () => {
    if (category && location) {
      console.log(category, location);
      dispatch(searchBuddy(category, location))
        .then((result) => {
          if (result.Teacher === undefined) {
            dispatch(logoutUser());
            navigation.navigate("Home");
          } else {
            setDisplaySlider(true);
            setDataBuddy(result.Teacher);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill in both category and location!");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (DataCategory.length > 0) {
        const temp = DataCategory.map((e) => e.name);
        setCategories(temp);
      }
    }, [DataCategory])
  );

  const handleItemClick = (id, categoryId) => {
    if (id) {
      setBuddy(id);
      setCategoryId(categoryId);
    }
  };

  return (
    <>
      <CustomHeader title='Add New Project' />

      <ScrollView style={styles.contentContainerStyle}>
        <Text style={styles.label}>Choose Your Mentor</Text>

        <View style={{ marginBottom: 10 }}>
          <SelectList
            setSelected={(val) => {
              setCategory(val);
            }}
            data={categories}
            save='name'
            search={false}
            placeholder='Select Project Category'
            style={styles.container}
          />
        </View>

        <View>
          <SelectList
            setSelected={(val) => setLocation(val)}
            data={locations}
            save='name'
            search={false}
            placeholder='Select Location'
            style={styles.container}
          />
        </View>

        <Button
          text='Search For Buddy'
          onPress={handleSearchBuddy}
          style={styles.searchButton}
        />

        {/* {displaySlider && <HorizontalSlider />} */}
        {displaySlider && (
          <View style={{ marginBottom: 10 }}>
            <SelectList
              setSelected={(val) => {
                const selectedBuddy = dataBuddy.find(
                  (buddy) => buddy.username === val
                );
                handleItemClick(selectedBuddy.id, selectedBuddy.categoryId);
              }}
              data={dataBuddy.map((e) => e.username)}
              save='name'
              search={false}
              placeholder='Select Buddy'
              style={styles.container}
            />
          </View>
        )}

        <Text style={styles.label}>Project Name</Text>
        <View style={styles.containerBig}>
          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder='Example: Cara Belajar Pemrograman Javascript Dengan Cepat'
            multiline={true}
          />
        </View>

        <Text style={styles.label}>Project Description</Text>
        <View style={styles.containerBig}>
          <TextInput
            value={projectDescription}
            onChangeText={setProjectDescription}
            placeholder='Example: Project ini dibuat untuk mempelajari dasar-dasar ilmu pemrograman Javascript dalam waktu singkat'
            multiline={true}
            numberOfLines={4}
            textAlignVertical='top'
          />
        </View>

        <Text style={styles.label}>Goals</Text>
        <View style={styles.containerBig}>
          <TextInput
            value={goals}
            onChangeText={setGoals}
            placeholder='Example: Saya ingin bisa membuat website pribadi sederhana'
            multiline={true}
            numberOfLines={4}
            textAlignVertical='top'
          />
        </View>

        <View>
          <Button text='Submit' onPress={handleSubmit} />
        </View>
        <View style={{ marginBottom: 30 }}></View>
      </ScrollView>

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text style={{ marginTop: 15, color: "white", fontSize: 16 }}>
            Generating your project...
          </Text>
        </View>
      )}

      <ErrorModal
        visible={showModal}
        title='Error'
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 13,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "left",
    fontFamily: "Lato-Bold",
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Lato-Bold",
    color: "#333",
  },
  container: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 0.5,
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
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  containerBig: {
    width: "100%",
    height: 100,
    borderColor: "black",
    borderWidth: 0.5,
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
  },
  searchButton: {
    backgroundColor: "#6b9ebf",
    marginBottom: 15,
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
  dropdownContainer: {
    position: "absolute",
    top: 40,
    width: "48%",
    maxHeight: 250,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 9999,
    elevation: 5,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
});
