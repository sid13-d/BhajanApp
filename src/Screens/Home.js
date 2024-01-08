
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import Card from '../../components/Card';

import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card title="Kalika Ashtakam" navigation={navigation}/>
      <StatusBar />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})