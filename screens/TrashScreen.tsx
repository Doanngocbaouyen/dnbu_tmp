import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InitDB, DeleteTask } from "../database/database";
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";

const db = SQLite.openDatabaseSync("tasks.db");

export default function TrashScreen({ navigation }: any) {
  const [deletedTasks, setDeletedTasks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

  // Load danh sách task đã xóa
  const loadDeletedTasks = async () => {
    await InitDB();
    const rows = await db.getAllAsync(
      "SELECT * FROM tasks WHERE deletedAt IS NOT NULL ORDER BY deletedAt DESC"
    );
    setDeletedTasks(rows);
    filterTasks(rows, searchText);
  };

  // Filter theo từ khóa
  const filterTasks = (tasksList: any[], keyword: string) => {
    if (!keyword) {
      setFilteredTasks(tasksList);
    } else {
      const filtered = tasksList.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  // Reload khi quay lại screen
  useFocusEffect(
    React.useCallback(() => {
      loadDeletedTasks();
    }, [])
  );

  // Xoá hoàn toàn task
  const deleteForever = (id: number) => {
    Alert.alert(
      "Xoá vĩnh viễn",
      "Bạn có chắc chắn muốn xoá khoản này vĩnh viễn?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
            loadDeletedTasks();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trash</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm trong thùng rác..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          filterTasks(deletedTasks, text);
        }}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => deleteForever(item.id)}
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
  searchInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
  },
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
