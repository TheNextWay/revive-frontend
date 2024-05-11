import * as React from 'react';
import { Text, Touchable, TouchableOpacity, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from './Apps/Navigation/TabBar';
import Header from './Apps/Navigation/Header';
 
const style = StyleSheet.create({
  Text:{
    fontFamily: 'Plus Jakarta Sans'
  }
})








export default function App() {
  return (
    <>
    <Header />
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
    </>
    
  );
}
