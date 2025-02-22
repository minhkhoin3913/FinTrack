import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import Screens
import MainScreen from "../screens/MainScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import AddScreen from "../screens/AddScreen";
import BudgetScreen from "../screens/BudgetScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

// Custom Floating Action Button
const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      left: 20, // Center the add button
      width: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 2,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#1ed760",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { height: 110 },
        tabBarLabelStyle: {
          fontSize: 16,
          marginTop: 8 // Adds space between icon and label
        },
        tabBarItemStyle: {
          paddingTop: 1, // Moves the icon up slightly for better spacing
        }
      }}
    >
      <Tab.Screen
        name="Tổng quan"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Sổ giao dịch"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="wallet" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: () => <Icon name="plus" color="white" size={30} />,
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Ngân sách"
        component={BudgetScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="clipboard-list" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
