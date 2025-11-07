import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface ExpenseItemProps {
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  title,
  amount,
  createdAt,
  type,
}) => {
  const isIncome = type === "Thu";

  return (
    <View style={[styles.container, isIncome ? styles.income : styles.expense]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{createdAt}</Text>
      </View>
      <Text style={styles.amount}>
        {isIncome ? "+" : "-"}{amount.toLocaleString()}đ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  income: {
    backgroundColor: "#c5f6c7",
  },
  expense: {
    backgroundColor: "#f8c5c5",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ExpenseItem;