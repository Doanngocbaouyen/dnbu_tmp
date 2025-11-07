import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AddTask, InitDB } from "../database/database";

const getCurrentDate = () => {
  return new Date().toLocaleDateString("vi-VN");
};

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const inputTitleRef = useRef<TextInput>(null);
  const inputAmountRef = useRef<TextInput>(null);

  useEffect(() => {
    InitDB(); // ✅ Khởi tạo DB khi mở screen
  }, []);

  const saveTask = async () => {
    if (!title || !amount) {
      alert("Nhập đủ dữ liệu!");
      return;
    }

    await AddTask(title, Number(amount), "Chi", getCurrentDate());

    setTitle("");
    setAmount("");
    inputTitleRef.current?.clear();
    inputAmountRef.current?.clear();

    alert("Thêm thành công ✅");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khoản chi</Text>
      <TextInput
        ref={inputTitleRef}
        style={styles.input}
        onChangeText={setTitle}
        placeholder="Nhập nội dung..."
      />

      <Text style={styles.label}>Số tiền</Text>
      <TextInput
        ref={inputAmountRef}
        style={styles.input}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Nhập số tiền..."
      />

      <TouchableOpacity style={styles.btn} onPress={saveTask}>
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
    backgroundColor: "#0084ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
