import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  amount: number;
  type: string;
  createdAt: string;
}

const ExpenseItem = ({ title, amount, type, createdAt }: Props) => {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{createdAt}</Text>
      </View>

      <Text
        style={[
          styles.amount,
          type === "Thu" ? styles.income : styles.expense,
        ]}
      >
        {type === "Thu" ? "+" : "-"}
        {amount.toLocaleString("vi-VN")}đ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  date: { fontSize: 12, color: "#555" },
  amount: { fontSize: 16, fontWeight: "bold" },
  income: { color: "green" },
  expense: { color: "red" },
});

export default ExpenseItem;
