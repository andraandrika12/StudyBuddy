import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import heroDummy from "../assets/dummy/hero-dummy.jpg";
import dummy1 from "../assets/dummy/dummy1.png";
import dummy2 from "../assets/dummy/dummy2.png";
import dummy3 from "../assets/dummy/dummy3.png";

export default function ReviewScreen() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const carouselItems = [
    { text: "Dummy 1", image: heroDummy },
    { text: "Dummy 2", image: dummy1 },
    { text: "Dummy 3", image: dummy2 },
    { text: "Dummy 4", image: dummy3 },
  ];

  return (
    <ScrollView style={styles.contentContainerStyle}>
      <Text style={styles.title}>Project Review</Text>

      <Text style={styles.title}>Project Name</Text>
      <View style={styles.container}>
        <Text>Project Name...</Text>
      </View>

      <Text style={styles.title}>Project Description</Text>
      <View style={styles.containerBig}>
        <Text>Project Description...</Text>
      </View>

      <Text style={styles.title}>Category</Text>
      <View style={styles.container}>
        <Text>Category...</Text>
      </View>

      <Text style={styles.title}>Documentation</Text>
      <View style={styles.horizontalCardContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalCardCarousel}
        >
          {carouselItems.map((item, idx) => (
            <View key={idx} style={styles.horizontalCard}>
              <Image style={styles.horizontalCardImage} source={item.image} />
              <Text style={styles.horizontalCardText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.title}>Feedback</Text>
      <View style={styles.containerBig}>
        <Text>Feedback...</Text>
      </View>

      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <Text style={styles.likeText}>👍 {likes}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 30 }}></View>
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 13,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Lato-Bold",
    color: "#333",
  },
  container: {
    width: "100%",
    height: 40,
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
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
  },
  containerBig: {
    width: "100%",
    height: 100,
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
  },
  horizontalCardContainer: {
    padding: 10,
  },
  horizontalCardCarousel: {
    flexDirection: "row",
  },
  horizontalCard: {
    width: screenWidth * 0.6,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  horizontalCardImage: {
    width: screenWidth * 0.6,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  horizontalCardText: {
    marginTop: 5,
    color: "#0e365c",
    textAlign: "center",
    fontFamily: "Lato-Regular",
  },
  likeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  likeButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  likeText: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
});
