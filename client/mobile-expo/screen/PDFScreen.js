import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const PDFScreen = ({ route }) => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: route.params.pdfURI }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PDFScreen;
