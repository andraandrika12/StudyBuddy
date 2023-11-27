import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../navigators/Authcontext";

const ProjectCard = ({
  id,
  title,
  progress,
  status,
  description,
  category,
  goals,
  feedback,
  learningMaterials,
  teacher,
  student,
}) => {
  const navigation = useNavigation();
  // const { accessToken } = useAuth();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigation.navigate("Login");
  //   }
  // }, [accessToken, navigation]);

  let progressBarColor;
  if (progress <= 25) progressBarColor = "red";
  else if (progress <= 50) progressBarColor = "orange";
  else if (progress <= 75) progressBarColor = "yellow";
  else progressBarColor = "green";

  let displayText;
  if (status === "Submitted") displayText = "Waiting For Buddy Approval";
  else if (status === "Accepted") displayText = "Waiting For Payment";
  else if (status === "Paid") displayText = "0% Complete";
  else if (
    status === "On Progress" ||
    status === "Finished" ||
    status === "To Review"
  )
    displayText = `${progress}% Complete`;

  let cardContent = (
    <View>
      <Text style={styles.projectTitle}>{title}</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={{
            ...styles.progressBarFill,
            width: `${progress}%`,
            backgroundColor: progressBarColor,
          }}></View>
      </View>
      <Text style={styles.progressLabel}>{displayText}</Text>
    </View>
  );

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.push("Detail", {
          project: {
            id,
            title,
            progress,
            status,
            description,
            category,
            goals,
            feedback,
            learningMaterials,
            teacher,
            student,
          },
        })
      }
      underlayColor='#f0f0f0'
      style={styles.projectCard}>
      {cardContent}
    </TouchableHighlight>
  );
};

const DashboardProject = ({ projectData }) => {
  const [activeFilter, setActiveFilter] = useState("On Progress");
  const [loading, setLoading] = useState(false);

  let filteredData = [];
  if (activeFilter === "Proposed") {
    filteredData = projectData.filter(
      (project) =>
        project.status === "Submitted" || project.status === "Accepted"
    );
  } else if (activeFilter === "On Progress") {
    filteredData = projectData.filter(
      (project) => project.status === "Paid" || project.status === "On Progress"
    );
  } else if (activeFilter === "Finished") {
    filteredData = projectData.filter(
      (project) => project.status === "To Review"
    );
  }

  return (
    <View>
      <Text style={styles.yourProjectTitle}>My Course</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setActiveFilter("Proposed");
            setTimeout(() => setLoading(false), 500);
          }}
          style={[
            styles.filterButton,
            activeFilter === "Proposed" && styles.activeFilter,
          ]}>
          <Text style={styles.filterText}>Proposed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setActiveFilter("On Progress");
            setTimeout(() => setLoading(false), 500);
          }}
          style={[
            styles.filterButton,
            activeFilter === "On Progress" && styles.activeFilter,
          ]}>
          <Text style={styles.filterText}>On Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setActiveFilter("Finished");
            setTimeout(() => setLoading(false), 500);
          }}
          style={[
            styles.filterButton,
            activeFilter === "Finished" && styles.activeFilter,
          ]}>
          <Text style={styles.filterText}>Finished</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size='large'
          color='#4781a5'
          style={{ marginTop: 20 }}
        />
      ) : filteredData.length ? (
        filteredData.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))
      ) : (
        <Text style={styles.noProjectText}>No Project Yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  yourProjectTitle: {
    fontSize: 24,
    marginTop: 15,
    marginLeft: 4,
    marginBottom: 10,
    fontFamily: "Lato-Bold",
  },
  projectCard: {
    borderRadius: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 20,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Lato-Bold",
  },
  progressLabel: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: "Lato-Regular",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    padding: 5,
  },
  filterText: {
    fontSize: 11,
    color: "#000",
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#bddded",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  noProjectText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
});

export default DashboardProject;
