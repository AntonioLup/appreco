import { View, StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddReco from "./AddReco";
import { useGetTodos } from "./hook/useGetTodos";
import Info from "./Info";
import List from "./List";

export default function Main() {
  useGetTodos();
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={wrapper.all}>
      <Info />
      <List todos={todos} />
      <AddReco />
    </SafeAreaView>
  );
}
const wrapper = StyleSheet.create({
  all: {
    position: "relative",
    height: "100%",
  },
});
