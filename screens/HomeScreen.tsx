import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InitDB } from "../database/database";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("tasks.db");

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await InitDB();
      const rows = await db.getAllAsync("SELECT * FROM tasks ORDER BY id DESC");
      setTasks(rows);
    };
    loadData();
  }, []);

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
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemAmount}>{item.amount} đ</Text>
          </View>
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
