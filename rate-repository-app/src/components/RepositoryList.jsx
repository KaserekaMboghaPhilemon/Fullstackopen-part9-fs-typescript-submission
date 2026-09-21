import { FlatList, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem";

const repositories = [
  {
    id: "1",
    fullName: "facebook/react",
    description: "The library for web and native user interfaces.",
    language: "JavaScript",
    stargazersCount: 218000,
    forksCount: 46000,
    reviewCount: 312,
    ratingAverage: 4.8,
  },
  {
    id: "2",
    fullName: "callstack/react-native-paper",
    description: "Material Design for React Native.",
    language: "TypeScript",
    stargazersCount: 12600,
    forksCount: 2100,
    reviewCount: 182,
    ratingAverage: 4.6,
  },
  {
    id: "3",
    fullName: "expo/expo",
    description: "An open-source platform for making universal native apps.",
    language: "TypeScript",
    stargazersCount: 25800,
    forksCount: 4800,
    reviewCount: 96,
    ratingAverage: 4.5,
  },
];

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
});

const RepositoryList = () => (
  <FlatList
    data={repositories}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <RepositoryItem item={item} />}
    contentContainerStyle={styles.list}
  />
);

export default RepositoryList;
