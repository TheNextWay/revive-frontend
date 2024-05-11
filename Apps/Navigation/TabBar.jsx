import { View, Text , TouchableOpacity} from 'react-native'
import { FontAwesome6 , MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator, BottomTabBarHeightContext  } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ShopScreen from '../Screens/ShopScreen';
import QRScreen from '../Screens/QRScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CustomScreen from '../Screens/CustomScreen';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#1BAE80',
        headerShown:false,
        tabBarLabelStyle:{fontWeight:'bold'},
        tabBarStyle :{
          height:80,
          paddingBottom:25,
          paddingTop:10,
        }
      }}
      
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarLabelStyle: {
            bottom:5,
            color:'#1BAE80',
          },

          tabBarIcon: ({ focused }) => (
              <View style={{
                width:60,
                height:60,
                backgroundColor:'#1BAE80',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:50,
                bottom:30

              }}>
                <MaterialIcons name="qr-code-scanner" color='white' size={32} />
              </View>
          ),
        }}
      />
      <Tab.Screen
        name="Custom"
        component={CustomScreen}
        options={{
          tabBarLabel: 'Custom',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}