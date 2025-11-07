import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { UpdateTask, DeleteTask } from "../database/database";

export default function EditTaskScreen({ route, navigation }: any) {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [amount, setAmount] = useState(task.amount.toString());

  // Cập nhật task
  const saveUpdate = async () => {
    if (!title || !amount) {
      alert("Nhập đầy đủ thông tin!");
      return;
    }
    await UpdateTask(task.id, title, Number(amount));
    alert("✅ Cập nhật thành công!");
    navigation.goBack();
  };

  // Xoá task
  const deleteTask = () => {
    Alert.alert(
      "Xoá khoản chi",
      "Bạn có chắc chắn muốn xoá khoản này?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            await DeleteTask(task.id); // soft delete
            alert("✅ Xoá thành công!");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khoản chi</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Số tiền</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* Nút Save */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveUpdate}>
        <Text style={styles.btnText}>Saved</Text>
      </TouchableOpacity>

      {/* Nút Delete */}
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteTask}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 10, borderRadius: 6 },
  saveBtn: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
