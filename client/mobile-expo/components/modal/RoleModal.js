import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addSpecialization,
  updateStatusRole,
} from "../../store/actions/actionCreators";
import ErrorModal from "./ErrorModal";
import { useFocusEffect } from "@react-navigation/core";

const RoleModal = ({ isVisible, onClose, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [specialization, setSpecialization] = useState([]);
  const dispatch = useDispatch();
  let { categories } = useSelector((state) => {
    return state.category;
  });
  let dummySpecializations;
  dummySpecializations = categories.map((e) => ({
    id: e._id,
    name: e.name,
  }));

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (role === "student") {
      dispatch(updateStatusRole("student"))
        .then((response) => {
          if (response.success) {
            onSave(role, []);
          }
        })
        .catch((error) => {
          console.log(error, "erorr ini bukan ?");
        });
      onClose();
    }
  };

  const toggleSpecialist = (specName) => {
    if (specialization.includes(specName)) {
      setSpecialization((prev) => prev.filter((item) => item !== specName));
    } else {
      setSpecialization((prev) => [...prev, specName]);
    }
  };

  const handleDone = () => {
    if (selectedRole === "buddy") {
      dispatch(updateStatusRole("buddy"))
        .then((response) => {
          if (response.success) {
            dispatch(addSpecialization(specialization))
              .then((response) => {
                if (response.success) {
                  onSave(selectedRole, specialization);
                  onClose();
                } else {
                  setModalMessage(
                    "An error occurred during specialization addition: " +
                    response.error.message
                  );
                  setShowModal(true);
                }
              })

              .catch((error) => {
                console.log(error);
              });
          } else {
            setModalMessage(
              "An error occurred during login: " + response.error.message
            );
            setShowModal(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            {selectedRole === "buddy"
              ? "Select Specialization"
              : "Select your role"}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={true}
            indicatorStyle="default"
          >
            {selectedRole === null && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSelectRole("student")}
                >
                  <Text>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSelectRole("buddy")}
                >
                  <Text>Buddy</Text>
                </TouchableOpacity>
              </>
            )}

            {selectedRole === "buddy" &&
              dummySpecializations.map((spec) => (
                <TouchableOpacity
                  key={spec.id}
                  style={[
                    styles.button,
                    specialization.includes(spec.name) && styles.selectedButton,
                  ]}
                  onPress={() => toggleSpecialist(spec.id)}
                >
                  <Text>{spec.name}</Text>
                </TouchableOpacity>
              ))}

            {selectedRole === "buddy" && specialization.length > 0 && (
              <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={{ color: "white" }}>Done</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
      <ErrorModal
        visible={showModal}
        title="You need to pick a role."
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    maxHeight: "80%",
    width: "85%",
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 25,
    color: "#396987",
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
  },
  selectedButton: {
    backgroundColor: "#bddded",
  },
  doneButton: {
    backgroundColor: "#0e365c",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
  },
});

export default RoleModal;
