/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './components/Card';
import Home  from './src/Screens/Home';
import Details from './components/Details';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%',
    borderWidth: 1, // Border width
    borderColor: 'gray', // Border color
    borderRadius: 4, // Border radius
    padding: 8, // Padding
    paddingTop: 20, // Top padding
  },
});



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
