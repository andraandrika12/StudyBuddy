import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeroCarousel from "../components/HeroCarousel";
import ButtonGrid from "../components/ButtonGrid";
import HorizontalSlider from "../components/HorizontalSlider";
import { Platform } from "react-native";
import allProject from "../assets/public.png";
import highschool from "../assets/highschool.png";
import university from "../assets/university.png";
import browseLocation from "../assets/location.png";
import topProject from "../assets/top-projects.png";
import topBuddy from "../assets/top-teacher.png";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, getProjects } from "../store/actions/actionCreators";

export default function LandingPageScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(false);
  const { profileUser } = useSelector((state) => state.user);
  const { access_token, role } = useSelector((state) => state.auth);
  const paddingTop = Platform.OS === "ios" ? insets.top + 120 : 220;
  const buttonItems = [
    {
      icon: allProject,
      label: "All Projects",
      size: 60,
      onPress: (category) => {
        const filteredProjects =
          category === "All Projects"
            ? projectReducer
            : filterDataByCategory(category);

        navigation.navigate("Project", { filteredProjects });
      },
    },
    {
      icon: highschool,
      label: "School Projects",
      size: 60,
      onPress: (category) => {
        const filteredProjects =
          category === "School Projects"
            ? projectReducer
            : filterDataByCategory(category);

        navigation.navigate("Project", { filteredProjects });
      },
    },
    {
      icon: university,
      label: "University Projects",
      size: 60,
      onPress: (category) => {
        const filteredProjects =
          category === "University Projects"
            ? projectReducer
            : filterDataByCategory(category);

        navigation.navigate("Project", { filteredProjects });
      },
    },
    {
      icon: browseLocation,
      label: "Projects Near Me",
      size: 60,
      onPress: () => navigation.push("Project"),
    },
    {
      icon: topProject,
      label: "Top Projects",
      size: 60,
      onPress: () => navigation.navigate("Project"),
    },
    {
      icon: topBuddy,
      label: "Top Buddy",
      size: 60,
      onPress: () => navigation.navigate("Project"),
    },
  ];

  const filterDataByCategory = (category) => {
    switch (category) {
      case "All Projects":
        return projectReducer;
      case "highschool":
        return projectReducer.filter(
          (item) => item.Category.groupBy === "HighSchool Projects"
        );
      case "university":
        return projectReducer.filter(
          (item) => item.Category.groupBy === "University Projects"
        );
      case "public":
        return projectReducer.filter(
          (item) => item.Category.groupBy === "Public Projects"
        );
      default:
        return [];
    }
  };

  useEffect(() => {
    if (access_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [access_token]);

  // useEffect(() => {
  //   dispatch(fetchUserProfile(access_token, role))
  // }, [])

  const projectReducer = useSelector((state) => state.projectReducer.projects);
  // (state, "<<<<<<< ini di landing page");
  const getCategoryTitle = (category) => {
    switch (category) {
      case "highschool":
        return "HighSchool Projects";
      case "university":
        return "University Projects";
      case "public":
        return "Public Projects";
      default:
        return category;
    }
  };
  const orderedCategories = ["highschool", "university", "public"];

  const handleCategorySelect = (category) => {
    setSearchQuery("");
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(getProjects());
    // console.log(">>>", projectReducer);
  }, [dispatch, selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {isLogin ? (
          <Text style={styles.headerText}>Hi, {profileUser.username} 👋</Text>
        ) : (
          <Text style={styles.headerText}>Hi, Fellas👋</Text>
        )}

        <Text style={styles.headerSubText}>Welcome to StudyBuddy!</Text>
        <TextInput
          style={styles.searchBar}
          placeholder='Looking for your next project?'
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView
        style={[styles.scrollContainer, { paddingTop: paddingTop }]}
        contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={styles.carouselContainer}>
          <HeroCarousel />
        </View>
        <ButtonGrid
          items={buttonItems}
          onSelectCategory={handleCategorySelect}
        />
        {orderedCategories.map((category) => {
          console.log(category)
          const filteredData = filterDataByCategory(category);
          return (
            <HorizontalSlider
              key={category}
              title={getCategoryTitle(category)}
              dataFilter={filteredData}
              searchQuery={searchQuery}
              groupBy={category}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  carouselContainer: {
    marginTop: 10,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#bddded",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 30,
    zIndex: 1000,
  },
  headerText: {
    fontSize: 24,
    color: "#0e365c",
    fontWeight: "bold",
    marginTop: 50,
    fontFamily: "Lato-Bold",
  },
  headerSubText: {
    fontSize: 17,
    color: "#4781a5",
    fontFamily: "Lato-Regular",
  },
  searchBar: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 40,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
