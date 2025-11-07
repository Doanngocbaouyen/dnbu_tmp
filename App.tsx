import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import AddExpenseScreen from "./screens/AddTaskScreen";
import { InitDB } from "./database/database";
import EditTaskScreen from "./screens/EditTaskScreen";
import TrashScreen from "./screens/TrashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    InitDB();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="EditExpense" component={EditTaskScreen} />
          <Stack.Screen name="Trash" component={TrashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
