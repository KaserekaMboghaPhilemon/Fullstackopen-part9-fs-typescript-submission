import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import theme from "../theme";

const tabs = ["Repositories", "Sign in"];

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
  },
  tabs: {
    paddingHorizontal: 16,
    gap: 24,
  },
  tab: {
    minHeight: 28,
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
  },
  tabText: {
    color: "#ffffff",
    fontFamily: theme.fontFamilies.medium,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabs}
    >
      {tabs.map((tab, index) => (
        <Pressable
          key={tab}
          style={[styles.tab, index === 0 && styles.activeTab]}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

export default AppBar;
