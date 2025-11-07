import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InitDB, DeleteTask } from "../database/database";
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";

const db = SQLite.openDatabaseSync("tasks.db");

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  // Load danh sách task chưa xoá
  const loadData = async () => {
    await InitDB();
    const rows = await db.getAllAsync(
      "SELECT * FROM tasks WHERE deletedAt IS NULL ORDER BY id DESC"
    );
    setTasks(rows);
  };

  // Tự reload khi quay lại screen
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  // Xác nhận xoá
  const confirmDelete = (id: number) => {
    Alert.alert(
      "Xoá khoản chi",
      "Bạn có chắc chắn muốn xoá khoản này?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            await DeleteTask(id); // soft delete
            loadData(); // reload danh sách
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("AddExpense")}
        style={styles.addBtn}
      >
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("EditExpense", { task: item })} // nhấn vào mở edit
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemAmount}>{item.amount} đ</Text>
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  addBtn: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "90%",
    marginTop: 20,
  },
  addText: { color: "#fff", textAlign: "center", fontSize: 18 },
  item: {
    width: "90%",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: { fontSize: 16 },
  itemAmount: { fontSize: 16, fontWeight: "bold" },
});
