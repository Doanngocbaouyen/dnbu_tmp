import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetDeletedTasks, RestoreTask, HardDeleteTask } from "../database/database";
import { useFocusEffect } from "@react-navigation/native";

export default function TrashScreen({ navigation }: any) {
  const [deletedTasks, setDeletedTasks] = useState<any[]>([]);

  const loadDeletedTasks = async () => {
    const rows = await GetDeletedTasks();
    setDeletedTasks(rows);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDeletedTasks();
    }, [])
  );

  const confirmRestore = (id: number) => {
    Alert.alert(
      "Phục hồi khoản chi",
      "Bạn có chắc chắn muốn phục hồi khoản này?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Phục hồi",
          style: "default",
          onPress: async () => {
            await RestoreTask(id);
            loadDeletedTasks();
          },
        },
      ]
    );
  };

  const confirmHardDelete = (id: number) => {
    Alert.alert(
      "Xoá hẳn khoản chi",
      "Bạn có chắc chắn muốn xoá hẳn khoản này? Không thể phục hồi.",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            await HardDeleteTask(id);
            loadDeletedTasks();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trash</Text>

      <FlatList
        data={deletedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title} - {item.amount} đ</Text>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.restoreBtn} onPress={() => confirmRestore(item.id)}>
                <Text style={styles.btnText}>Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmHardDelete(item.id)}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, marginBottom: 8 },
  btnGroup: { flexDirection: "row", justifyContent: "flex-end" },
  restoreBtn: {
    backgroundColor: "#34C759",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
