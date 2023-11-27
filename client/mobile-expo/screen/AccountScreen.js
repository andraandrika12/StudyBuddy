import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import profileImage from "../assets/dummy/hero-dummy.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
  editProfile,
} from "../store/actions/actionCreators";
import axios from "axios";
import ErrorModal from "../components/modal/ErrorModal";

const baseUrl =
  "https://d539-2001-448a-11b0-13d6-61fe-51f7-6192-2016.ngrok-free.app/";

export default function AccountScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [userProfile, setUserProfile] = useState({
    email: "",
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    address: "",
  });
  const { access_token, role } = useSelector((state) => {
    return state.auth;
  });

  console.log(access_token)

  const { profileUser } = useSelector((state) => state.user);

  useEffect(() => {
    (access_token);
    setUserProfile(profileUser);
  }, [profileUser]);

  useEffect(() => {
    dispatch(fetchUserProfile(access_token, role));
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Home");
  };
  const handleChange = (field, value) => {
    setUserProfile({
      ...userProfile,
      [field]: value,
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    dispatch(editProfile(access_token, userProfile))
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        setIsEditing(true);
        setModalMessage(err.response.data.message);
        setShowModal(true);
      });
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView
        style={styles.contentContainerStyle}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{userProfile.name}</Text>
        </View>

        <Text style={styles.fieldTitle}>Username:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userProfile.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        ) : (
          <View style={styles.container}>
            <Text>{userProfile.username}</Text>
          </View>
        )}

        <Text style={styles.fieldTitle}>Email:</Text>
        {isEditing ? (
          <View style={styles.container}>
            <Text>{userProfile.email}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>{userProfile.email}</Text>
          </View>
        )}

        <Text style={styles.fieldTitle}>Role:</Text>
        {isEditing ? (
          <View style={styles.container}>
            <Text>{userProfile.role}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>{userProfile.role}</Text>
          </View>
        )}

        <Text style={styles.fieldTitle}>Phone:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userProfile.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />
        ) : (
          <View style={styles.container}>
            <Text>{userProfile.phoneNumber}</Text>
          </View>
        )}

        <Text style={styles.fieldTitle}>Address:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userProfile.address}
            onChangeText={(text) => handleChange("address", text)}
          />
        ) : (
          <View style={styles.container}>
            <Text>{userProfile.address}</Text>
          </View>
        )}
        {!isEditing ? (
          <Button
            text={"Edit Profile"}
            onPress={handleEditProfile}
            style={styles.editButton}
          />
        ) : (
          <Button
            text={"Save"}
            onPress={handleSaveProfile}
            style={styles.saveButton}
          />
        )}
        {!isEditing && (
          <Button
            text="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        )}
        <ErrorModal
          visible={showModal}
          title="Error"
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainerStyle: {
    padding: 30,
    backgroundColor: "white",
    paddingBottom: 40,
    borderRadius: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Lato-Regular",
    color: "#333",
  },
  fieldTitle: {
    fontWeight: "bold",
    marginTop: 15,
    fontFamily: "Lato-Bold",
    color: "#6b9ebf",
  },
  input: {
    height: 40,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    padding: 8,
    backgroundColor: "#F5F5F5",
  },
  container: {
    width: "100%",
    height: 40,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: "#E0E0E0",
  },
  documentInputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  documentInputContainer: {
    flex: 1,
  },
  documentInput: {
    marginVertical: 5,
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  documentIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 140,
    height: 140,
    marginTop: 30,
    resizeMode: "cover",
    borderRadius: 70,
  },
  editButton: {
    backgroundColor: "#6b9ebf",
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
  },
  documentInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  documentInput: {
    flex: 1,
    marginEnd: 5,
    marginStart: 5,
  },
  roundRemoveButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#0e365c",
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
  },

  saveButton: {
    backgroundColor: "#6b9ebf",
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
  },
  logoutButton: {
    backgroundColor: "#8B0000",
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
  },
});
