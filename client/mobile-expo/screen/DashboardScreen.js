import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, RefreshControl } from "react-native";
import ButtonGrid from "../components/ButtonGrid";
import allProject from "../assets/public.png";
import addProject from "../assets/tap.png";
import History from "../assets/certificate.png";
import Wallet from "../assets/money.png";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DashboardWidget } from "../components/DashboardWidget";
import DashboardProject from "../components/DashboardProject";
import CustomHeader from "../components/CustomHeader";
import { useSelector, useDispatch } from "react-redux";
import ErrorModal from "../components/modal/ErrorModal";
import RoleModal from "../components/modal/RoleModal";

export default function DashboardScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isLikes, setLike] = useState(0);
  const [isRatings, setReting] = useState(0);
  const { dataStudent, dataTeacher } = useSelector((state) => state.dashboard);
  const { role } = useSelector((state) => state.auth); // Retrieve 'role' from the 'auth' state
  const { projects } = useSelector((state) => state.projectReducer)
  const [projectData, setProjectData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(projectData)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  let temp = [];
  const buttonItems = [
    {
      icon: addProject,
      label: "Add Projects",
      size: 60,
      onPress: () => navigation.navigate("AddProject"),
    },
    {
      icon: History,
      label: "Project History",
      size: 60,
      onPress: () => navigation.navigate("Archive", { data: finishedProjects }),
    },
    {
      icon: Wallet,
      label: "Wallet",
      size: 60,
      onPress: () => navigation.navigate("Wallet"),
    },
  ];

  useEffect(() => {
    if (!role) {
      setModalMessage("What role do you prefer?");
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (role === "buddy" && dataTeacher._id) {
      setLike(dataTeacher.Likes);
      setReting(dataTeacher.Ratings);
      if (dataTeacher.hasOwnProperty("Projects") && dataTeacher.Projects) {
        let temp = [];
        dataTeacher.Projects.forEach((e) => {
          if (e.Category && e.Category[0] && e.Category[0].name) {
            temp.push({
              id: e._id,
              title: e.name,
              progress: e.totalFinished,
              status: e.status,
              description: e.description,
              category: e.Category[0].name,
              goals: e.goals,
              feedback: e.feedback,
              learningMaterials: e.todos,
              student: e.Student[0], // Change to e.Student[0] to get the student associated with this project
              teacher: e.Teacher[0], // Change to e.Teacher[0] to get the teacher associated with this project
            });
          }
        });
        setProjectData(temp);
      }
    } else if (role === "student" && dataStudent._id) {
      setLike(dataStudent.Likes);
      setReting(dataStudent.Ratings);
      if (dataStudent.hasOwnProperty("Projects") && dataStudent.Projects) {
        let temp = [];
        dataStudent.Projects.forEach((e) => {
          if (e.Category && e.Category[0] && e.Category[0].name) {
            temp.push({
              id: e._id,
              title: e.name,
              progress: e.totalFinished,
              status: e.status,
              description: e.description,
              category: e.Category[0].name,
              goals: e.goals,
              feedback: e.feedback,
              learningMaterials: e.todos,
              student: e.Student[0], // Change to e.Student[0] to get the student associated with this project
              teacher: e.Teacher[0], // Change to e.Teacher[0] to get the teacher associated with this project
            });
          }
        });
        setProjectData(temp);
      }
    }
  }, [dataTeacher, dataStudent, projects]);


  return (
    <>
      <CustomHeader title='Dashboard' />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <DashboardWidget data={isLikes} isLike={true} title='Overview' />
            <DashboardWidget data={isRatings} isReview={true} />
          </View>
          <ButtonGrid items={buttonItems} />
          <DashboardProject projectData={projectData} />
        </ScrollView>
      </View>
      <ErrorModal
        visible={showModal}
        title='Role Validation'
        message={modalMessage}
        onClose={() => {
          setShowModal(false), setShowRoleModal(true);
        }}
      />
      <RoleModal
        isVisible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSave={() => {
          setShowRoleModal(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFF",
  },
});
