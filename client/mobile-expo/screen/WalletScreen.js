import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Cash from "../assets/cash.png";
import { useNavigation } from "@react-navigation/native";
import ButtonGrid from "../components/ButtonGrid";

export default function WalletScreen() {
  const navigation = useNavigation();

  const buttonItems = [
    {
      icon: Cash,
      label: "Withdraw",
      size: 60,
      onPress: () => navigation.push(""),
    },
  ];

  const transactions = [
    { date: "2023-10-23", description: "Withdraw", amount: "-Rp. 7.000.000" },
    { date: "2023-10-22", description: "Paid", amount: "+Rp. 7.000.000" },
    { date: "2023-10-22", description: "On Progress", amount: "Rp. 7.000.000" },
  ];

  return (
    <>
      <CustomHeader title="Wallet" />
      <ScrollView style={styles.contentContainerStyle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Balance</Text>
          <Text style={styles.headerSubText}>Rp. 7.000.000</Text>
        </View>
        <ButtonGrid items={buttonItems} />
        {/* Transaction Records */}
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionHeader}>Transaction History</Text>
          {transactions.map((transaction, index) => {
            let textColor = "#000";
            if (transaction.description === "Withdraw") {
              textColor = "red";
            } else if (transaction.description === "On Progress") {
              textColor = "orange";
            } else if (transaction.description === "Paid") {
              textColor = "green";
            }

            return (
              <View key={index} style={styles.transactionItem}>
                <Text style={[styles.transactionDate, { color: textColor }]}>
                  {transaction.date}
                </Text>
                <Text
                  style={[styles.transactionDescription, { color: textColor }]}
                >
                  {transaction.description}
                </Text>
                <Text style={[styles.transactionAmount, { color: textColor }]}>
                  {transaction.amount}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 150,
    backgroundColor: "#bddded",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  headerText: {
    bottom: 15,
    fontSize: 24,
    color: "#0e365c",
    fontWeight: "bold",
    fontFamily: "Lato-Bold",
  },
  headerSubText: {
    fontSize: 30,
    color: "#4781a5",
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  transactionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transactionHeader: {
    fontSize: 25,
    color: "#4781a5",
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
    marginBottom: 10,
    textAlign: "center",
  },
  transactionItem: {
    alignItems: "center",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  transactionDate: {
    flex: 1,
    fontSize: 16,
  },
  transactionDescription: {
    flex: 2,
    fontSize: 16,
    textAlign: "center",
  },
  transactionAmount: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
});
