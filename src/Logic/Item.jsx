import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteTodoReducer } from "./todoItems";
import { useDispatch, useSelector } from "react-redux";

export default function Item({ id, title, date }) {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [localhoure, setLocalhoure] = useState(new Date(date));
  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        "Todos",
        JSON.stringify(todos.filter((todo) => todo.id !== id))
      );
      console.log("Todo deleted correctly");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={list.container} key={id}>
      <View style={list.point}></View>
      <View style={list.texts}>
        <Text style={list.title}>{title}</Text>
        <Text>{moment(localhoure).format("MMMM Do YYYY, h:mm")}</Text>
      </View>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <Ionicons name="trash" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}
const list = StyleSheet.create({
  point: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    borderRadius: 5,
  },
  container: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    height: 75,
    borderWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  texts: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
  },
});
