import { View, Text, StyleSheet } from "react-native";

export default function Info() {
  return (
    <View style={info.container}>
      <Text style={info.text}>Hello, User</Text>
      <Text style={info.info}>Remember your dates with this App!</Text>
    </View>
  );
}
const info = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 100,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 25,
  },
  info: {
    fontSize: 20,
  },
});
