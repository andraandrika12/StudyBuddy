import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../store/actions/actionCreators";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const LikesSVG = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24">
    <Path
      d="M21.4,13c0.4-0.6,0.6-1.4,0.6-2.1c0-0.9-0.3-1.7-1-2.3c-0.7-0.7-1.4-1-2.4-1h-2.3c0.4-0.9,0.6-1.7,0.6-2.5
			c0-1-0.2-1.8-0.5-2.4c-0.3-0.6-0.7-1-1.3-1.3c-0.6-0.3-1.2-0.4-2-0.4c-0.4,0-0.8,0.2-1.2,0.5c-0.4,0.4-0.6,0.8-0.8,1.4
			c-0.2,0.6-0.3,1.1-0.4,1.7c-0.1,0.5-0.3,0.9-0.5,1.1C10,6,9.6,6.5,9,7.2C8.2,8.3,7.6,9,7.3,9.2H3.7c-0.5,0-0.9,0.2-1.2,0.5
			C2.2,10,2,10.4,2,10.9v8.4c0,0.5,0.2,0.9,0.5,1.2c0.3,0.3,0.7,0.5,1.2,0.5h3.8c0.2,0,0.8,0.2,1.8,0.5c1.1,0.4,2,0.7,2.8,0.9
			c0.8,0.2,1.6,0.3,2.5,0.3h1.2h0.5c1.2,0,2.2-0.4,3-1.1c0.7-0.7,1.1-1.7,1.1-2.9c0.5-0.7,0.8-1.4,0.8-2.3c0-0.2,0-0.4,0-0.6
			c0.3-0.6,0.5-1.2,0.5-1.9C21.5,13.6,21.5,13.3,21.4,13z M5.1,19c-0.2,0.2-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2
			c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.2,0.1-0.4,0.2-0.6c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.4,0.2,0.6
			C5.4,18.6,5.3,18.8,5.1,19z M20.1,11.9c-0.2,0.4-0.4,0.6-0.7,0.6c0.1,0.1,0.2,0.4,0.3,0.6c0.1,0.3,0.1,0.5,0.1,0.7
			c0,0.6-0.2,1.1-0.7,1.6c0.2,0.3,0.2,0.6,0.2,0.9c0,0.3-0.1,0.6-0.2,1c-0.2,0.3-0.4,0.5-0.6,0.7c0,0.3,0.1,0.5,0.1,0.7
			c0,1.5-0.8,2.2-2.5,2.2h-1.6c-1.1,0-2.6-0.3-4.5-1c0,0-0.2-0.1-0.4-0.1c-0.2-0.1-0.4-0.1-0.5-0.2c-0.1,0-0.3-0.1-0.5-0.2
			c-0.2-0.1-0.4-0.1-0.5-0.1c-0.1,0-0.3-0.1-0.4-0.1c-0.2,0-0.3,0-0.4,0H7v-8.4h0.4c0.1,0,0.3,0,0.5-0.1c0.2-0.1,0.3-0.2,0.5-0.4
			c0.2-0.2,0.3-0.3,0.5-0.5c0.2-0.2,0.3-0.3,0.5-0.6C9.6,9.1,9.8,9,9.9,8.8c0.1-0.1,0.2-0.3,0.4-0.5c0.2-0.2,0.3-0.3,0.3-0.4
			c0.5-0.6,0.8-1,1-1.2c0.4-0.4,0.6-0.9,0.8-1.4c0.2-0.6,0.3-1.1,0.4-1.6c0.1-0.5,0.3-0.9,0.5-1.1c0.8,0,1.4,0.2,1.7,0.6
			c0.3,0.4,0.4,1,0.4,1.9c0,0.5-0.2,1.2-0.6,2.1c-0.4,0.9-0.6,1.6-0.6,2.1h4.6c0.4,0,0.8,0.2,1.2,0.5c0.3,0.3,0.5,0.7,0.5,1.2
			C20.4,11.2,20.3,11.5,20.1,11.9z"
      fill="#F659E7"
    />
  </Svg>
);

const LocationSVG = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24">
    <Path
      d="M12.5,0A9.24,9.24,0,0,0,3,9.41c0,7.88,8.8,15.17,9.17,15.47a.5.5,0,0,0,.65,0C13.21,24.53,22,16.51,22,9.41A9.24,9.24,0,0,0,12.5,0Zm0,14A4.5,4.5,0,1,1,17,9.5,4.5,4.5,0,0,1,12.5,14Z"
      fill="#1191ab"
    />
  </Svg>
);

export default function VerticalSlider({ name, location }) {
  const dispatch = useDispatch();
  const projectReducer = useSelector(function (state) {
    return state.projectReducer.projects;
  });
  const image = require("../assets/images/HiRes-17.jpg");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const filteredProjects = projectReducer.filter((data) => {
    const projectName = data.name.toLowerCase();
    const projectLocation = data.Teacher.address.toLowerCase();

    return (
      projectName.includes(name.toLowerCase()) &&
      projectLocation.includes(location.toLowerCase())
    );
  });

  return (
    <View style={styles.verticalCardContainer}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {filteredProjects.map((data) => (
          <TouchableOpacity key={data._id}>
            <View style={styles.verticalCard}>
              <Image style={styles.verticalCardImage} source={image} />
              <View style={styles.textAndRatingContainer}>
                <Text style={styles.verticalCardText}>{data.name}</Text>
                <View style={styles.ratingContainer}>
                  <LikesSVG />
                  <Text style={styles.courseRating}>{data.Likes}</Text>
                </View>
              </View>
              <View style={styles.locationContainer}>
                <LocationSVG />
                <Text style={styles.courseLocation}>
                  {data.Teacher.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalCardContainer: {
    padding: 5,
    marginTop: 10,
  },
  verticalCard: {
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "flex-start",
    borderWidth: 0.5,
    borderColor: "#d6d6d6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: "#fff",
  },
  verticalCardImage: {
    width: screenWidth * 0.9,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    width: screenWidth * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  verticalCardText: {
    color: "#0e365c",
    fontSize: 16,
    fontFamily: "Lato-Bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Lato-Light",
    flex: 1,
    justifyContent: "flex-end",
  },
  textAndRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: screenWidth * 0.9,
    marginTop: 10,
  },
  verticalCardText: {
    color: "#0e365c",
    fontSize: 18,
    fontFamily: "Lato-Bold",
    marginLeft: 15,
  },
  courseRating: {
    color: "#0e365c",
    marginLeft: 5,
    marginRight: 25,
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    width: screenWidth * 0.9,
    marginBottom: 15,
  },
  courseLocation: {
    color: "#6b9ebf",
    marginLeft: 5,
    fontFamily: "Lato-Light",
    fontSize: 15,
  },
});
