import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/StudyBuddy.png";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, registerUser } from "../store/actions/actionCreators";
import ErrorModal from "../components/modal/ErrorModal";
import { SelectList } from 'react-native-dropdown-select-list'

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  // const [usernameError, setUsernameError] = useState(null);
  // const [emailError, setEmailError] = useState(null);
  // const [passwordError, setPasswordError] = useState(null);
  // const [phoneError, setPhoneError] = useState(null);
  // const [addressError, setAddressError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.location)

  useEffect(() => {
    dispatch(fetchLocations())
  }, [])

  // const isValidEmail = (email) => {
  //   return /\S+@\S+\.\S+/.test(email);
  // };

  // const isEmailAlreadyTaken = (email) => {
  //   // return false;
  // };

  const navigation = useNavigation();

  const handleRegister = () => {
    // setUsernameError(null);
    // setEmailError(null);
    // setPasswordError(null);
    // setPhoneError(null);
    // setAddressError(null);

    // let hasError = false;

    // if (!username) {
    //   setUsernameError("Username must be filled");
    //   hasError = true;
    // }

    // if (!email) {
    //   setEmailError("Email must be filled");
    //   hasError = true;
    // } else if (!isValidEmail(email)) {
    //   setEmailError("Format Email is not valid");
    //   hasError = true;
    // }

    // if (!password) {
    //   setPasswordError("Password must be filled");
    //   hasError = true;
    // }

    // if (!phoneNumber) {
    //   setPhoneError("Phone Number must be filled");
    //   hasError = true;
    // }

    // if (!address) {
    //   setAddressError("Address must be filled");
    //   hasError = true;
    // }

    // if (hasError) {
    //   return;
    // }

    dispatch(registerUser({ username, email, password, phoneNumber, address }))
      .then((response) => {
        if (response.success) {
          navigation.navigate("Login");
        } else {
          setModalMessage(
            "An error occurred during register: " + response.error.message
          );
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // TODO:
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {/* {usernameError && <Text style={styles.errorText}>{usernameError}</Text>} */}
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {/* {emailError && <Text style={styles.errorText}>{emailError}</Text>} */}
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* {passwordError && <Text style={styles.errorText}>{passwordError}</Text>} */}
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        keyboardType='phone-pad'
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      {/* {phoneError && <Text style={styles.errorText}>{phoneError}</Text>} */}
      {/* <TextInput
        style={styles.input}
        placeholder='Location'
        value={address}
        onChangeText={(text) => setAddress(text)}
      /> */}

      <SelectList
        setSelected={(val) => setAddress(val)}
        data={locations}
        save="name"
        search={false}
        placeholder="Location"
        boxStyles={{ width: 330, marginTop: 5, backgroundColor: 'white' }}
      />

      {/* {addressError && <Text style={styles.errorText}>{addressError}</Text>} */}
      <View>
        <TouchableOpacity onPress={handleRegister}>
          <Button
            onPress={handleRegister}
            text='Register'
            style={styles.buttonSize}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButton}>Login here</Text>
        </TouchableOpacity>
      </View>
      <ErrorModal
        visible={showModal}
        title='Error'
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    marginTop: 30,
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6b9ebf",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#396987",
    fontFamily: "Lato-Bold",
    minHeight: 30,
  },
  input: {
    width: 330,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 15,
    padding: 8,
    fontFamily: "Lato-Regular",
    backgroundColor: "white",
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    marginRight: 5,
    fontFamily: "Lato-Regular",
  },
  loginButton: {
    color: "#396987",
  },
  buttonSize: {
    width: 330,
    height: 40,
  },
  errorText: {
    backgroundColor: "#FFCACA",
    color: "red",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});