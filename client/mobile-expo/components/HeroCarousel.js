import React, { useRef, useEffect, useState } from "react";
import { FlatList, Image, Dimensions, View, StyleSheet } from "react-native";

import heroDummy from "../assets/images/HiRes-17.jpg";
import dummy1 from "../assets/images/HiRes-17.jpg";
import dummy2 from "../assets/images/HiRes-17.jpg";
import dummy3 from "../assets/images/HiRes-17.jpg";

const screenWidth = Dimensions.get("window").width;

export default function HeroCarouselFlatList() {
  const carouselItems = [
    { text: "Ini Nama Project 1", image: heroDummy },
    { text: "Ini Nama Project 2", image: dummy1 },
    { text: "Ini Nama Project 3", image: dummy2 },
    { text: "Ini Nama Project 4", image: dummy3 },
  ];

  const flatListRef = useRef(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prev) => (prev + 1) % carouselItems.length);
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentItemIndex,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentItemIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        pagingEnabled
        onScrollEndDrag={(ev) => {
          const newIndex = Math.round(
            ev.nativeEvent.contentOffset.x / (screenWidth - 50)
          );
          setCurrentItemIndex(newIndex);
        }}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image key={index} style={styles.image} source={item.image} />
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth - 60,
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
  },
});
