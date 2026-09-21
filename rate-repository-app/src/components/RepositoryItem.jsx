import { StyleSheet, Text, View } from "react-native";

import theme from "../theme";

const formatCount = (count) => count.toLocaleString("en-US");

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    padding: 16,
    flexDirection: "row",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  fullName: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamilies.medium,
    fontSize: theme.fontSizes.heading,
    marginBottom: 6,
  },
  description: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamilies.regular,
    fontSize: theme.fontSizes.body,
    lineHeight: 20,
    marginBottom: 10,
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.languageTag,
    borderRadius: 4,
    color: "#ffffff",
    fontFamily: theme.fontFamilies.medium,
    fontSize: 12,
    marginBottom: 14,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 360,
  },
  statistic: {
    alignItems: "center",
    minWidth: 54,
  },
  statisticValue: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamilies.medium,
    fontSize: theme.fontSizes.subheading,
  },
  statisticLabel: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamilies.regular,
    fontSize: 12,
    marginTop: 3,
  },
});

const Statistic = ({ value, label }) => (
  <View style={styles.statistic}>
    <Text style={styles.statisticValue}>{value}</Text>
    <Text style={styles.statisticLabel}>{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.details}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>
      <View style={styles.statistics}>
        <Statistic value={formatCount(item.stargazersCount)} label="Stars" />
        <Statistic value={formatCount(item.forksCount)} label="Forks" />
        <Statistic value={formatCount(item.reviewCount)} label="Reviews" />
        <Statistic value={item.ratingAverage.toFixed(1)} label="Rating" />
      </View>
    </View>
  </View>
);

export default RepositoryItem;
