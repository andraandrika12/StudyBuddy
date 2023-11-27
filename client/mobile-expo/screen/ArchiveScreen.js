import VerticalSlider from "../components/VerticalSlider";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

export default function ArchiveScreen({ route }) {
  const navigation = useNavigation();
  const { data: finishedProjects } = route.params;

  const transformedData = finishedProjects.map((project) => ({
    text: project.title,
    image: project.image || require("../assets/dummy/hero-dummy.jpg"),
  }));

  const handleProjectClick = (project) => {
    navigation.navigate("Detail", { project });
  };

  return (
    <>
      <CustomHeader title="Archive" />
      <View style={styles.container}>
        <VerticalSlider
          title="Finished Projects"
          data={transformedData}
          onItemClick={handleProjectClick}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
  },
});
