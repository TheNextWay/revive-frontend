import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, Slot, Tabs } from "expo-router";
import { getAuth } from "firebase/auth";
import TabBar from "@components/TabBar";
import { useColorScheme } from "@/components/useColorScheme";
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  getAuth().onAuthStateChanged((user) => {
    setIsLoading(false);
    if (!user) {
      router.replace("/landing");
    }
  });

  if (isLoading) return <Text style={{ paddingTop: 30 }}>Loading...</Text>;

  return (
    <Tabs
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#1BAE80',
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarStyle: {
        height: route.name === 'qr' ? 0 : 80,
        paddingBottom: route.name === 'qr' ? 0 : 25,
        paddingTop: route.name === 'qr' ? 0 : 10,
        display: route.name === 'qr' ? 'none' : 'flex',
        
      },
    })}
  >
    <Tabs.Screen
      name="index"
      options={{
      headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="shop"
      options={{
        headerShown: false,
        tabBarLabel: 'Shop',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="store" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="qr"
      options={{
        headerShown: false,
        tabBarLabel: 'Scan',
        tabBarLabelStyle: {
          bottom: 5,
          color: '#1BAE80',
          
        },
        tabBarIcon: ({ focused }) => (
          <View style={{
            width: 60,
            height: 60,
            backgroundColor: '#1BAE80',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            bottom: 30,
          }}>
            <MaterialIcons name="qr-code-scanner" color="white" size={32} />
          </View>
        ),
      }}
    />
    <Tabs.Screen
      name="achievement"
      options={{
        headerShown: false,
        tabBarLabel: 'Achievement',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="star-border" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
        ),
      }}
    />
</Tabs>

  );
}
