import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { useSelector, useDispatch } from "react-redux";
import { payment } from "../store/actions/actionCreators";

export default function PaymentScreen({ route }) {
  const [redirectUrl, setRedirectUrl] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  console.log(route.params)

  const { urlRedirect } = useSelector((state) => state.midtrans)

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleContinuePayment = async () => {
    dispatch(payment(route.params))
      .then(() => {
        setRedirectUrl(urlRedirect)
      })
  };

  useEffect(() => {
    if (redirectUrl) {
      navigation.push("Midtrans", { paymentGatewayURL: redirectUrl, projectId: route.params });
    }
  }, [redirectUrl, navigation]);

  const orderDetails = [
    { label: "Lesson - Ternak Padi", price: 100000 },
    { label: "Study - Bisnis Peternakan", price: 150000 },
    { label: "Intimidate - Publication Ternak", price: 250000 },
  ];

  const totalAmount = orderDetails.reduce(
    (total, item) => total + item.price,
    0
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.header}>Order Details</Text>
        <View style={styles.summaryContainer}>
          {orderDetails.map((item, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text>{item.label}</Text>
              <Text>{formatter.format(item.price)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.header}>Summary</Text>
        <View style={styles.cardDetails}>
          <View style={styles.totalItem}>
            <Text style={styles.totalText}>TOTAL</Text>
            <Text style={styles.totalAmount}>
              {formatter.format(totalAmount)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handleContinuePayment}
        >
          <Text style={styles.buttonText}>Continue Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Lato-Bold",
  },
  cardDetails: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  payButton: {
    backgroundColor: "#0e365c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#A9A9A9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lato-Regular",
  },
  summaryContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalItem: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Lato-Bold",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Lato-Regular",
  },
});
