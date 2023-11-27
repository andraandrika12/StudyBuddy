import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export const DashboardWidget = ({ data, isLike, isReview }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        {isLike && (
          <View style={styles.cardIcon}>
            <Svg
              width={24}
              height={24}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='red'
              fill='red'>
              <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
              />
            </Svg>
            <Text style={styles.cardAction}>Likes</Text>
          </View>
        )}
        {isReview && (
          <View style={styles.cardIcon}>
            <Svg
              width={24}
              height={24}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='gold'
              fill='gold'>
              <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
              />
            </Svg>
            <Text style={styles.cardAction}>Rating</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardTitle}>
        {isLike ? `${data} Likes` : `${data} Rating`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    borderColor: "#ccc",
    padding: 16,
    backgroundColor: "white",
    margin: 8,
    flex: 1,
    height: 100,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  projectOverviewTitle: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  cardAction: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: "Lato-Regular",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    marginTop: 8,
  },
});
