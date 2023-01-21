import { Button, View, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export default function AddReco() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={addreco.container}>
      <Button onPress={() => navigation.navigate("Modal")} title="Add" />
    </SafeAreaView>
  );
}
const addreco = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,

    width: "100%",
    padding: 20,
    zIndex: 1,
    backgroundColor: "#fff",
  },
});
