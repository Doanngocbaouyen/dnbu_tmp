import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { InitDB } from "../database";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    InitDB(); 
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("AddTask" as never)}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
