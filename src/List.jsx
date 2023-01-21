import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import lista from "./data";
import Item from "./Logic/Item";
export default function List({ todos }) {
  return (
    <SafeAreaView style={wrap.wrapper}>
      <FlatList
        data={todos}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Text> </Text>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
    </SafeAreaView>
  );
}
const wrap = StyleSheet.create({
  wrapper: {
    height: 420,
  },
});
