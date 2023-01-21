import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Keyboard,
  Button,
  TouchableOpacity,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "./todoItems";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function Modal() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const listTodos = useSelector((state) => state.todos.todos);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const navigation = useNavigation();
  const AddDate = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      title: name,
      date: date,
    };
    try {
      await AsyncStorage.setItem(
        "Todos",
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodoReducer(newTodo));
      console.log("Todo saved correctly");
      await scheduleTodoNotification(newTodo);
      navigation.goBack();
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log("cancell");
      }
      throw e;
    }
  };
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      return;
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };
  const scheduleTodoNotification = async (todo) => {
    // set trigger time to todo.hour if todo.isToday === true else set trigger time to todo.hour + 24 hours
    // const trigger = todo.isToday ? todo.hour : new Date(todo.hour).getTime() + 24 * 60 * 60 * 1000;
    const trigger = new Date(todo.date);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alert! You have a task to do!",
          body: todo.text,
        },
        trigger,
      });
      console.log("Notification scheduled");
    } catch (e) {
      alert("The notification failed to schedule, make sure the hour is valid");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={modal.container}>
        <Text style={modal.title}>Add SomeThing</Text>
        <View>
          <Text>Issue:</Text>
          <TextInput
            placeholder="Write here..."
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={modal.date}>
          <Text>Date:</Text>
          <Button
            style={modal.button}
            onPress={() => setOpen(true)}
            title="Select Date"
          />
          <Text>{date && date.toDateString()}</Text>
          {open && (
            <DateTimePicker
              value={date}
              dateFormat="YYYY-MM-DD HH:mm"
              mode={"datetime"}
              onChange={(event, selectedDate) => {
                setOpen(false);
                setDate(selectedDate);
              }}
            />
          )}
        </View>
        <Button onPress={AddDate} title="Submit" />
      </View>
    </TouchableWithoutFeedback>
  );
}
const modal = StyleSheet.create({
  button: {
    backgroundColor: "#38871C",
  },
  date: {
    marginVertical: 15,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 25,
  },
});
