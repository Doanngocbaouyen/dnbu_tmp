import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import ExpenseItem from "./components/ExpenseItem";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.title}>EXPENSE TRACKER</Text>

        {/* Danh sách test hiển thị Item */}
        <View style={styles.list}>
          <ExpenseItem
            title="Đi chợ"
            amount={150000}
            createdAt="08/11/2025"
            type="Chi"
          />
          <ExpenseItem
            title="Lương tháng"
            amount={10000000}
            createdAt="01/11/2025"
            type="Thu"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
