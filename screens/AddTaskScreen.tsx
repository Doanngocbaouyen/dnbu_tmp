import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { AddTask } from "../database";
import { useNavigation } from "@react-navigation/native";

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleSave = async () => {
    if (!text.trim()) return;

    await AddTask(text);

    setText("");
    inputRef.current?.clear(); // ✅ clear bằng useRef
    alert("Đã thêm!");

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        ref={inputRef}
        placeholder="Nhập công việc..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onChangeText={setText}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#28A745",
          padding: 12,
          borderRadius: 8,
        }}
        onPress={handleSave}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
