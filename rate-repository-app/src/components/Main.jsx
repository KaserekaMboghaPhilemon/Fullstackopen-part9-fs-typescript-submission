import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";

import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  content: {
    flex: 1,
  },
});

const Main = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="light" />
    <AppBar />
    <View style={styles.content}>
      <RepositoryList />
    </View>
  </SafeAreaView>
);

export default Main;
