import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { UpdateTask } from "../database/database";

export default function EditTaskScreen({ route, navigation }: any) {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [amount, setAmount] = useState(task.amount.toString());

  const saveUpdate = async () => {
    if (!title || !amount) {
      alert("Nhập đầy đủ thông tin!");
      return;
    }
    await UpdateTask(task.id, title, Number(amount));
    alert("✅ Cập nhật thành công!");
    navigation.goBack(); // Quay lại HomeScreen
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

      <TouchableOpacity style={styles.btn} onPress={saveUpdate}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 10, borderRadius: 6 },
  btn: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
