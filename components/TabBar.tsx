import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'



const TabBar = () => {
  return (
    <Tabs
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#1BAE80',
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarStyle: {
        height: route.name === 'QR' ? 0 : 80,
        paddingBottom: route.name === 'QR' ? 0 : 25,
        paddingTop: route.name === 'QR' ? 0 : 10,
        display: route.name === 'QR' ? 'none' : 'none',
        
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
      name="achivement"
      options={{
        headerShown: false,
        tabBarLabel: 'Achivement',
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
  )
}

export default TabBar